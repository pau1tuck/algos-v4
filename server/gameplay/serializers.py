# /server/gameplay/serializers.py
from rest_framework import serializers
from .models import UserProgress


class UserProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProgress
        fields = [
            "user_id",
            "track_id",
            "points",
            "health",
            "questions_completed",
            "pages_completed",
            "challenges_completed",
            "current_page",
            "last_completed",
        ]

    # Optional: Custom logic for handling any specific data transformations if needed
    def update(self, instance, validated_data):
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
