import logging
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
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


logger = logging.getLogger("users")  # Use the logger for 'users'


class CustomRegisterSerializer(RegisterSerializer):
    username = None  # Explicitly remove the username field
    password2 = None  # Remove password2 from the serializer
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    country = serializers.CharField(required=True)
    password1 = serializers.CharField(write_only=True)

    def validate(self, data):
        print(
            "CustomRegisterSerializer is in use"
        )  # Print statement for console output
        logger.info("CustomRegisterSerializer is in use.")  # Log to console

        # Copy password1 to password2 internally for validation purposes
        data["password2"] = data["password1"]

        return super().validate(data)

    def custom_signup(self, request, user):
        print("Custom user signup started.")  # Print statement for console output
        logger.info("Custom user signup started.")

        user.first_name = self.validated_data.get("first_name", "")
        user.last_name = self.validated_data.get("last_name", "")
        user.country = self.validated_data.get("country", "")
        user.save()

        logger.info(f"User {user.email} successfully registered.")
        return user
