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
            user=self.user,
            track=self.track,
            points=10,
            health=100,
            questions_completed=[1, 2],
            pages_completed=[1],
            challenges_completed=[3],
        )

    def test_get_user_progress(self):
        # Make a GET request to fetch the user progress
        url = reverse("user-progress-list")
        response = self.client.get(url)

        # Check if the response is successful and contains the correct data
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]["points"], 10)
        self.assertEqual(response.data[0]["questions_completed"], [1, 2])

    def test_put_user_progress(self):
        # Make a PUT request to update the user progress
        url = reverse("user-progress-detail", args=[self.user_progress.pk])

        data = {
            "trackId": self.track.id,  # Must match the serializer's field name
            "pages_completed": [1, 2, 3],
            "questions_completed": [1, 2, 4],
            "challenges_completed": [3, 5],
            # "current_page": 3,  # Include if you want to update current_page
        }
        response = self.client.put(url, data, format="json")

        # Check if the response is successful
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Refresh the instance from the database
        self.user_progress.refresh_from_db()

        # Verify that the fields have been updated correctly
        self.assertEqual(set(self.user_progress.pages_completed), {1, 2, 3})
        self.assertEqual(set(self.user_progress.questions_completed), {1, 2, 4})
        self.assertEqual(set(self.user_progress.challenges_completed), {3, 5})
        # If current_page was updated, you can check it here
        # self.assertEqual(self.user_progress.current_page, 3)

    def test_post_user_progress(self):
        # Attempt to create a new UserProgress for the same user and track
        url = reverse("user-progress-list")
        data = {
            "trackId": self.track.id,
            "pages_completed": [4],
            "questions_completed": [5],
            "challenges_completed": [6],
        }
        response = self.client.post(url, data, format="json")

        # Depending on your application logic, you might expect this to fail
        # because a UserProgress for this user and track already exists.
        # If so, you can adjust the test accordingly.

        # For this example, let's assume it creates a new entry
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIsNotNone(response.data.get("id"))
        self.assertEqual(response.data["pages_completed"], [4])
        self.assertEqual(response.data["questions_completed"], [5])
        self.assertEqual(response.data["challenges_completed"], [6])

        # Verify that a new UserProgress instance was created
        new_progress_id = response.data["id"]
        new_progress = UserProgress.objects.get(pk=new_progress_id)
        self.assertEqual(new_progress.user, self.user)
        self.assertEqual(new_progress.track, self.track)
        self.assertEqual(set(new_progress.pages_completed), {4})
        self.assertEqual(set(new_progress.questions_completed), {5})
        self.assertEqual(set(new_progress.challenges_completed), {6})
