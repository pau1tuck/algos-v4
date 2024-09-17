from rest_framework import serializers
from .models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    roles = serializers.StringRelatedField(
        many=True
    )  # Use StringRelatedField to get the role names

    class Meta:
        model = CustomUser
        fields = [
            "pk",
            "email",
            "first_name",
            "last_name",
            "country",
            "last_visit",
            "username",
            "roles",
        ]
