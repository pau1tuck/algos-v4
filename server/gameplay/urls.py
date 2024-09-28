# /server/gameplay/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserProgressViewSet

router = DefaultRouter()
router.register(r"user-progress", UserProgressViewSet, basename="user-progress")

urlpatterns = [
    path("", include(router.urls)),
]
