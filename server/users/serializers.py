# server/users/serializers.py

from rest_framework import serializers
from dj_rest_auth.serializers import LoginSerializer as DefaultLoginSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class CustomLoginSerializer(DefaultLoginSerializer):
    def validate(self, attrs):
        print("CustomLoginSerializer validate method called")  # Add this line
        data = super().validate(attrs)
        user = self.user
        data.update(
            {
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    # Add other fields as needed
                }
            }
        )
        return data
