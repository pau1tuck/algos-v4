# /server/gameplay/serializers.py

from rest_framework import serializers
from .models import UserProgress, Track
from django.contrib.auth.models import User


class UserProgressSerializer(serializers.ModelSerializer):
    # Accept userId and trackId as input fields
    userId = serializers.IntegerField(write_only=True)
    trackId = serializers.IntegerField(write_only=True)

    class Meta:
        model = UserProgress
        fields = [
            "userId",  # Include the user ID for input
            "trackId",  # Include the track ID for input
            "user",  # For output, this returns the actual user object
            "track",  # For output, this returns the actual track object
            "points",
            "health",
            "questions_completed",
            "pages_completed",
            "challenges_completed",
            "current_page",
            "last_completed",
        ]

    def update(self, instance, validated_data):
        # Get user and track from validated_data
        user_id = validated_data.pop("userId", None)
        track_id = validated_data.pop("trackId", None)

        if user_id:
            instance.user = User.objects.get(id=user_id)
        if track_id:
            instance.track = Track.objects.get(id=track_id)

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
