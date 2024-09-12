from dj_rest_auth.serializers import LoginSerializer as DefaultLoginSerializer
from dj_rest_auth.registration.serializers import (
    RegisterSerializer as DefaultRegisterSerializer,
)
from rest_framework import serializers
from django.contrib.auth import authenticate


class CustomLoginSerializer(DefaultLoginSerializer):
    username = None  # Remove the username field
    email = serializers.EmailField(required=True)  # Ensure email is required

    def get_auth_user(self, username, email, password):
        # Override to use email for authentication
        user = authenticate(email=email, password=password)
        return user


class CustomRegisterSerializer(DefaultRegisterSerializer):
    username = None  # Remove the username field
    email = serializers.EmailField(required=True)  # Ensure email is required

    def save(self, request):
        user = super().save(request)
        user.username = user.email.split("@")[
            0
        ]  # Set username to part before @ in email
        user.save()
        return user
