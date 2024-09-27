import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from dj_rest_auth.registration.views import RegisterView
from django.core.cache import cache
from .serializers import CustomUserSerializer
from .serializers import CustomRegisterSerializer

logger = logging.getLogger("users")


class CustomUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_id = request.user.id
        cache_key = f"user_profile_{user_id}"
        cached_user_data = cache.get(cache_key)

        # Log whether we hit the cache or not
        if cached_user_data:
            logger.info(f"Cache hit: Returning cached profile for user {user_id}")
        else:
            logger.info(
                f"Cache miss: Fetching profile from database for user {user_id}"
            )
            serializer = CustomUserSerializer(request.user)
            cached_user_data = serializer.data
            cache.set(cache_key, cached_user_data, timeout=600)  # Cache for 10 minutes
            logger.info(f"Cached profile data for user {user_id}")

        return Response(cached_user_data)


class UpdateProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        serializer = CustomUserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()

            # Invalidate the cached profile
            cache_key = f"user_profile_{user.id}"
            cache.delete(cache_key)
            logger.info(f"Cache invalidated for user {user.id} after profile update")

            return Response(serializer.data)
        return Response(serializer.errors, status=400)


class CustomRegisterView(RegisterView):
    serializer_class = CustomRegisterSerializer
