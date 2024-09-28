# /server/gameplay/serializers.py

from rest_framework import serializers
from .models import UserProgress
from content.models import Track  # Ensure correct import for Track model


class UserProgressSerializer(serializers.ModelSerializer):
    # Include userId as read-only, sourced from user.id
    userId = serializers.IntegerField(source="user.id", read_only=True)

    # Accept trackId as a writable field and map it to the track field
    trackId = serializers.PrimaryKeyRelatedField(
        queryset=Track.objects.all(), source="track"
    )

    class Meta:
        model = UserProgress
        fields = [
            "userId",  # Read-only, obtained from the authenticated user
            "trackId",  # Writable, accepts numerical ID from frontend
            "points",
            "health",
            "questions_completed",
            "pages_completed",
            "challenges_completed",
            "current_page",
            "last_completed",
        ]
        read_only_fields = ("userId",)

    def create(self, validated_data):
        # Set the user to the authenticated user
        user = self.context["request"].user
        validated_data["user"] = user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Prevent changing the user
        validated_data.pop("user", None)

        # Update other fields as before
        instance.points = validated_data.get("points", instance.points)
        instance.health = validated_data.get("health", instance.health)
        instance.questions_completed = validated_data.get(
            "questions_completed", instance.questions_completed
        )
        instance.pages_completed = validated_data.get(
            "pages_completed", instance.pages_completed
        )
        instance.challenges_completed = validated_data.get(
            "challenges_completed", instance.challenges_completed
        )
        instance.current_page = validated_data.get(
            "current_page", instance.current_page
        )

        instance.save()
        return instance
