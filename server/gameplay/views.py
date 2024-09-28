# /server/gameplay/views.py
from rest_framework import viewsets
from .models import UserProgress
from .serializers import UserProgressSerializer
from rest_framework.permissions import IsAuthenticated


class UserProgressViewSet(viewsets.ModelViewSet):
    queryset = UserProgress.objects.all()
    serializer_class = UserProgressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Return progress for the authenticated user
        return UserProgress.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Save user progress for the authenticated user
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        # Ensure user is set to the authenticated user on update as well
        serializer.save(user=self.request.user)
