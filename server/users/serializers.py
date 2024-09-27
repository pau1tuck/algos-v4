# /server/users/serializers.py
import logging
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from .models import CustomUser

# Set up a logger for the 'users' app
logger = logging.getLogger("users")


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


class CustomRegisterSerializer(RegisterSerializer):
    username = None  # Explicitly remove the username field
    password2 = None  # Remove password2 from the serializer
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    country = serializers.CharField(required=True)
    password1 = serializers.CharField(write_only=True)

    def validate(self, data):
        # Log that the validation process has started
        logger.info("CustomRegisterSerializer validate method is in use.")

        # Log the incoming data before any modifications or validation
        logger.debug(f"Incoming registration data: {data}")

        # Copy password1 to password2 internally for validation purposes
        data["password2"] = data["password1"]

        # Perform validation using the base class's validate method
        validated_data = super().validate(data)

        # Log the data after validation
        logger.debug(f"Post-validation data: {validated_data}")

        return validated_data

    def custom_signup(self, request, user):
        # Log that the custom signup process is in progress
        logger.info("Custom user registration in progress.")

        # Log the validated data used for user creation
        logger.debug(f"Validated data in custom_signup: {self.validated_data}")

        # Assign the validated data to the user object
        user.first_name = self.validated_data.get("first_name", "")
        user.last_name = self.validated_data.get("last_name", "")
        user.country = self.validated_data.get("country", "")
        user.save()

        # Log the successful registration of the user
        logger.info(
            f"User {user.first_name} {user.last_name} <{user.email}> successfully registered."
        )

        return user
