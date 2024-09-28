# /server/gameplay/tests.py
from django.test import TestCase
from django.contrib.auth.models import User
from .models import UserProgress, Track
from .serializers import UserProgressSerializer


class UserProgressTest(TestCase):
    def setUp(self):
        # Create a user and track
        self.user = User.objects.create_user(username="testuser", password="password")
        self.track = Track.objects.create(title="JavaScript Track")

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

    def test_user_progress_serializer(self):
        # Serialize the user progress
        serializer = UserProgressSerializer(instance=self.user_progress)

        # Check if serializer data is correct
        self.assertEqual(serializer.data["points"], 10)
        self.assertEqual(serializer.data["questions_completed"], [1, 2])

    def test_updating_user_progress(self):
        # Updating progress with new data
        new_data = {
            "points": 50,
            "health": 90,
            "pages_completed": [1, 2, 3],
        }
        serializer = UserProgressSerializer(
            instance=self.user_progress, data=new_data, partial=True
        )

        # Validate and save
        self.assertTrue(serializer.is_valid())
        serializer.save()

        # Assert new values
        self.assertEqual(self.user_progress.points, 50)
        self.assertEqual(self.user_progress.health, 90)
        self.assertEqual(self.user_progress.pages_completed, [1, 2, 3])
