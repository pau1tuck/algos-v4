# /server/gameplay/serializers.py

from rest_framework import serializers
from .models import UserProgress
from content.models import Track  # Ensure correct import for Track model


class UserProgressSerializer(serializers.ModelSerializer):
    # Include userId as read-only, sourced from user.id
    userId = serializers.IntegerField(source="user.id", read_only=True)

    # Conditionally make trackId read-only after creation
    trackId = serializers.PrimaryKeyRelatedField(
        queryset=Track.objects.all(),
        source="track",
        read_only=False,  # Allow it to be writable during creation
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
            "questions_completed",
            "pages_completed",
            "challenges_completed",
            "current_page",
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
        return super().create(validated_data)

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

        # Merge and remove duplicates for completed fields
        instance.questions_completed = list(
            set(
                instance.questions_completed
                + validated_data.get("questions_completed", [])
            )
        )
        instance.pages_completed = list(
            set(instance.pages_completed + validated_data.get("pages_completed", []))
        )
        instance.challenges_completed = list(
            set(
                instance.challenges_completed
                + validated_data.get("challenges_completed", [])
            )
        )

        # Only update current_page from validated_data if provided
        instance.current_page = validated_data.get(
            "current_page", instance.current_page
        )

        # Save instance and let the model handle points and health calculation
        instance.save()
        return instance
