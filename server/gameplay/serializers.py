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

    # Make points (received from frontend) read-only, but allow score manipulation
    points = serializers.IntegerField(
        write_only=True, required=False
    )  # Accept points from frontend
    score = serializers.IntegerField(
        read_only=True
    )  # Backend calculates and stores the final score
    health = serializers.IntegerField(read_only=True)

    class Meta:
        model = UserProgress
        fields = [
            "userId",  # Read-only, obtained from the authenticated user
            "trackId",  # Writable on create but locked after creation
            "points",  # Write-only: Incoming points from the frontend
            "score",  # Read-only: Final score stored in the backend
            "health",  # Read-only, calculated by the backend
            "questionsCompleted",  # Serialized to camelCase
            "pagesCompleted",  # Serialized as a dictionary
            "challengesCompleted",  # Serialized to camelCase
            "last_completed",
        ]
        read_only_fields = (
            "userId",
            "score",  # The score is read-only on the frontend, calculated by the backend
            "health",
        )

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

        # If points are provided, add them to the current score
        points = validated_data.get("points", 0)
        if points:
            user_progress.score += points  # Add incoming points to the current score
            user_progress.save()

        return user_progress

    def update(self, instance, validated_data):
        # Prevent changing the user and any frontend manipulation of health and trackId
        validated_data.pop("user", None)
        validated_data.pop("health", None)
        validated_data.pop("track", None)

        # Handle points by adding the incoming points to the existing score
        points = validated_data.pop("points", 0)
        if points:
            instance.score += points  # Add incoming points to the existing score

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

        # Save the updated instance with the new score
        instance.save()
        return instance
