# server/gameplay/serializers.py

from rest_framework import serializers
from .models import UserProgress, PagesCompleted
from content.models import Track


class PagesCompletedSerializer(serializers.ModelSerializer):
    """Serializer for the PagesCompleted model."""

    pageId = serializers.IntegerField(
        source="page_id"
    )  # Convert snake_case to camelCase
    completedAt = serializers.DateTimeField(
        source="completed_at"
    )  # Convert snake_case to camelCase

    class Meta:
        model = PagesCompleted
        fields = ["pageId", "completedAt"]  # Use camelCase for the frontend


class UserProgressSerializer(serializers.ModelSerializer):
    # Include userId as read-only, sourced from user.id
    userId = serializers.IntegerField(source="user.id", read_only=True)

    # Conditionally make trackId read-only after creation
    trackId = serializers.PrimaryKeyRelatedField(
        queryset=Track.objects.all(),
        source="track",
        read_only=False,  # Allow it to be writable during creation
    )

    # Serialize pages_completed using PagesCompletedSerializer
    pagesCompleted = PagesCompletedSerializer(
        many=True, source="pages_completed", required=False
    )

    # Convert questions_completed and challenges_completed to camelCase
    questionsCompleted = serializers.ListField(
        source="questions_completed", child=serializers.IntegerField(), required=False
    )
    challengesCompleted = serializers.ListField(
        source="challenges_completed", child=serializers.IntegerField(), required=False
    )

    # Make points and health read-only
    points = serializers.IntegerField(read_only=True)
    health = serializers.IntegerField(read_only=True)

    class Meta:
        model = UserProgress
        fields = [
            "userId",  # Read-only, obtained from the authenticated user
            "trackId",  # Writable on create but locked after creation
            "points",  # Read-only, calculated by the backend
            "health",  # Read-only, calculated by the backend
            "questionsCompleted",  # Now serialized to camelCase
            "pagesCompleted",  # Serialized with the PagesCompletedSerializer
            "challengesCompleted",  # Now serialized to camelCase
            "last_completed",
        ]
        read_only_fields = (
            "userId",
            "points",
            "health",
        )  # Prevent frontend modification

    def create(self, validated_data):
        # Set the user to the authenticated user
        user = self.context["request"].user
        validated_data["user"] = user

        # Extract and handle pages_completed if present
        pages_data = validated_data.pop("pages_completed", [])
        user_progress = super().create(validated_data)

        # Create PagesCompleted records
        for page_data in pages_data:
            PagesCompleted.objects.create(
                user=user, track=user_progress.track, **page_data
            )

        return user_progress

    def update(self, instance, validated_data):
        # Prevent changing the user and any frontend manipulation of points, health, and trackId
        validated_data.pop("user", None)
        validated_data.pop(
            "points", None
        )  # Ensure points can't be updated by the frontend
        validated_data.pop(
            "health", None
        )  # Ensure health can't be updated by the frontend

        # Prevent changing the track once it has been set
        if instance.pk:
            validated_data.pop(
                "track", None
            )  # Prevent track from being updated if it's an existing instance

        # Handle pages_completed updates
        pages_data = validated_data.pop("pages_completed", [])

        # Merge and remove duplicates for other completed fields
        instance.questions_completed = list(
            set(
                instance.questions_completed
                + validated_data.get("questions_completed", [])
            )
        )
        instance.challenges_completed = list(
            set(
                instance.challenges_completed
                + validated_data.get("challenges_completed", [])
            )
        )

        # Update PagesCompleted records
        for page_data in pages_data:
            page_id = page_data.get("page_id")
            page_completed, created = PagesCompleted.objects.get_or_create(
                user=instance.user, track=instance.track, page_id=page_id
            )
            if not created:
                page_completed.completed_at = page_data.get(
                    "completed_at", page_completed.completed_at
                )
                page_completed.save()

        # Save instance and let the model handle points and health calculation
        instance.save()
        return instance
