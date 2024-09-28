# /server/gameplay/tests.py
from django.test import TestCase
from django.contrib.auth.models import User
from .models import UserProgress, Track
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse


class UserProgressAPITest(TestCase):
    def setUp(self):
        # Set up a test client and a user
        self.client = APIClient()
        self.user = User.objects.create_user(username="testuser", password="password")
        self.track = Track.objects.create(title="JavaScript Track")

        # Authenticate the user
        self.client.force_authenticate(user=self.user)

        # Create initial user progress
        self.user_progress = UserProgress.objects.create(
            user_id=self.user,
            track_id=self.track,
            points=10,
            health=100,
            questions_completed=[1, 2],
            pages_completed=[1],
            challenges_completed=[3],
        )

    def test_get_user_progress(self):
        # Make a GET request to fetch the user progress
        url = reverse(
            "user-progress-list"
        )  # DRF router automatically names the endpoint
        response = self.client.get(url)

        # Check if the response is successful and contains the correct data
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]["points"], 10)
        self.assertEqual(response.data[0]["questions_completed"], [1, 2])

    def test_post_user_progress(self):
        # Make a POST request to update the user progress
        url = reverse("user-progress-list")
        data = {
            "track_id": self.track.id,
            "points": 50,
            "health": 90,
            "pages_completed": [1, 2, 3],
            "questions_completed": [1, 2],
            "challenges_completed": [3],
        }
        response = self.client.post(url, data, format="json")

        # Check if the response is successful and the data was saved correctly
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["points"], 50)
        self.assertEqual(response.data["pages_completed"], [1, 2, 3])
