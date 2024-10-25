# server/gameplay/serializers.py

from rest_framework import serializers
from .models import UserProgress, PagesCompleted
from content.models import Track


class UserProgressSerializer(serializers.ModelSerializer):
    # Include userId as read-only, sourced from user.id
    userId = serializers.IntegerField(source="user.id", read_only=True)

    # Conditionally make trackId read-only after creation
    trackId = serializers.PrimaryKeyRelatedField(
        queryset=Track.objects.all(),
        source="track",
        read_only=False,  # Allow it to be writable during creation
    )

    # Serialize pages_completed as a dictionary
    pagesCompleted = serializers.SerializerMethodField()

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
            "questionsCompleted",  # Serialized to camelCase
            "pagesCompleted",  # Serialized as a dictionary
            "challengesCompleted",  # Serialized to camelCase
            "last_completed",
        ]
        read_only_fields = (
            "userId",
            "points",
            "health",
        )  # Prevent frontend modification

    def get_pagesCompleted(self, obj):
        """Serialize pagesCompleted as a dictionary with pageId as key."""
        pages_completed = obj.pages_completed.all()
        pages_completed_dict = {}
        for page in pages_completed:
            pages_completed_dict[str(page.page_id)] = {
                "completedAt": page.completed_at.isoformat()
            }
        return pages_completed_dict

    def create(self, validated_data):
        # Set the user to the authenticated user
        user = self.context["request"].user
        validated_data["user"] = user

        # Extract and handle pagesCompleted if present
        pages_completed_data = validated_data.pop("pagesCompleted", {})
        pages_completed_list = []

        for page_id_str in pages_completed_data.keys():
            page_id = int(page_id_str)
            pages_completed_list.append(
                PagesCompleted(
                    user=user,
                    track=validated_data["track"],
                    page_id=page_id,
                    # completed_at will be set automatically
                )
            )

        # Create UserProgress instance
        user_progress = super().create(validated_data)

        # Bulk create PagesCompleted records
        PagesCompleted.objects.bulk_create(pages_completed_list)

        return user_progress

    def update(self, instance, validated_data):
        # Prevent changing the user and any frontend manipulation of points, health, and trackId
        validated_data.pop("user", None)
        validated_data.pop("points", None)
        validated_data.pop("health", None)

        # Prevent changing the track once it has been set
        validated_data.pop("track", None)

        # Handle pagesCompleted updates
        pages_completed_data = validated_data.pop("pagesCompleted", {})

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
        for page_id_str in pages_completed_data.keys():
            page_id = int(page_id_str)
            page_completed, created = PagesCompleted.objects.get_or_create(
                user=instance.user, track=instance.track, page_id=page_id
            )
            # No need to set completed_at; it's automatically set on creation
            page_completed.save()

        # Save instance and let the model handle points and health calculation
        instance.save()
        return instance
