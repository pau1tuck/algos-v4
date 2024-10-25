# server/gameplay/models.py
import json
from django.conf import settings
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from content.models import Track  # Import Track model


# * MAX ATTAINABLE VALUES
class MaxAttainable(models.Model):
    track = models.ForeignKey(Track, on_delete=models.CASCADE)  # Reference Track model
    total_questions = models.IntegerField(default=0)
    total_pages = models.IntegerField(default=0)
    total_challenges = models.IntegerField(default=0)

    @property
    def max_xp(self):
        return (
            (self.total_pages * 5) + self.total_questions + (self.total_challenges * 10)
        )

    def __str__(self):
        return f"Max attainable scores for {self.track.title}"

    class Meta:
        verbose_name = "Max Attainable Value"
        verbose_name_plural = "Max Attainable Values"


class PagesCompleted(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE
    )  # Reference the user who completed the page
    track = models.ForeignKey(
        Track, on_delete=models.CASCADE
    )  # Reference the track this page belongs to
    page_id = models.PositiveIntegerField()  # Store the page ID
    completed_at = models.DateTimeField(
        default=timezone.now
    )  # Store when the page was completed

    class Meta:
        unique_together = (
            "user",
            "track",
            "page_id",
        )  # Ensure uniqueness per user, track, and page

    def __str__(self):
        return f"Page {self.page_id} completed by {self.user.username} on {self.track.title} at {self.completed_at}"


# * GRADE
class Grade(models.Model):
    id = models.PositiveIntegerField(primary_key=True)  # Manual ID input
    title = models.CharField(max_length=100)  # e.g., "Purple Belt"
    slug = models.SlugField(unique=True)  # e.g. "purple-belt"
    description = models.TextField(null=True, blank=True)
    order = models.PositiveIntegerField()  # Order of progression
    image = models.ImageField(upload_to="images/grades/", null=True, blank=True)
    thumbnail = models.ImageField(upload_to="images/grades/", null=True, blank=True)
    icon = models.CharField(max_length=2, null=True, blank=True)  # Icon
    xp_threshold = models.FloatField()

    def __str__(self):
        return self.title


# * RANK
class Rank(models.Model):
    id = models.PositiveIntegerField(primary_key=True)  # Manual ID input
    title = models.CharField(max_length=100)  # e.g., 'Apprentice'
    slug = models.SlugField(unique=True)  # e.g., "apprentice"
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to="images/ranks/", null=True, blank=True)
    thumbnail = models.ImageField(upload_to="images/ranks/", null=True, blank=True)
    icon = models.CharField(max_length=2, null=True, blank=True)  # Icon
    order = models.PositiveIntegerField()  # Progression order
    challenge_threshold = models.FloatField()  # Challenges required to achieve rank

    def __str__(self):
        return self.title


# * LEVEL
class Level(models.Model):
    id = models.PositiveIntegerField(primary_key=True)  # Manual ID input
    track = models.ForeignKey(Track, on_delete=models.CASCADE)  # Reference Track model
    title = models.CharField(max_length=100)  # e.g., 'Senior Developer'
    slug = models.SlugField(unique=True)  # e.g., "senior-developer"
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to="images/levels/", null=True, blank=True)
    thumbnail = models.ImageField(upload_to="images/levels/", null=True, blank=True)
    icon = models.CharField(max_length=2, null=True, blank=True)  # Icon
    order = models.PositiveIntegerField()  # Progression order
    pages_required = models.TextField(default="[]")  # Store as JSON string

    def __str__(self):
        return f"{self.title} - {self.track.title}"


# * USER PROGRESS
class UserProgress(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE
    )  # Use custom user model
    track = models.ForeignKey(Track, on_delete=models.CASCADE)

    points = models.IntegerField(default=0)
    health = models.IntegerField(default=100)

    # Related field for PagesCompleted
    pages_completed = models.ManyToManyField(
        "PagesCompleted", blank=True
    )  # Use ManyToManyField for related pages

    # Allow blanks for questions_completed and challenges_completed
    questions_completed = models.TextField(
        default="[]", blank=True  # Allow blank fields
    )  # Store as JSON for SQLite compatibility
    challenges_completed = models.TextField(
        default="[]", blank=True  # Allow blank fields
    )  # Store as JSON for SQLite compatibility

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True, blank=True)  # Timestamp

    def save(self, *args, **kwargs):
        # Automatically set updated_at when saving the instance
        self.updated_at = timezone.now()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Progress for {self.user.username} in {self.track.title}"

    @property
    def xp(self):
        # Get the count of completed pages using Django ORM
        completed_pages_count = self.pages_completed.count()

        # Calculate xp based on pages, questions, and challenges
        return (
            completed_pages_count * 5
            + len(self.get_questions_completed())
            + len(self.get_challenges_completed()) * 10
        )

    @property
    def grade(self):
        return (
            Grade.objects.filter(xp_threshold__lte=self.xp)
            .order_by("-xp_threshold")
            .first()
        )

    @property
    def rank(self):
        return (
            Rank.objects.filter(
                challenge_threshold__lte=len(self.get_challenges_completed())
            )
            .order_by("-challenge_threshold")
            .first()
        )

    @property
    def level(self):
        # If the user has no completed pages, return the default level
        if not self.pages_completed.exists():
            return Level.objects.get(title="Aspiring Developer")

        # Fetch all levels for the user's track, ordered by progression order
        levels = Level.objects.filter(track=self.track).order_by("order")

        # Get the set of completed page IDs using ORM
        completed_page_ids = set(self.pages_completed.values_list("page_id", flat=True))

        # Loop through the levels and check if all required pages are completed
        for level in levels:
            required_page_ids = set(json.loads(level.pages_required))
            if required_page_ids.issubset(completed_page_ids):
                return level

        return None  # Return None if no level is satisfied

    def get_questions_completed(self):
        return json.loads(self.questions_completed)

    def get_pages_completed(self):
        # Retrieve completed page IDs using Django ORM
        return list(self.pages_completed.values_list("page_id", flat=True))

    def get_challenges_completed(self):
        return json.loads(self.challenges_completed)

    def set_questions_completed(self, data):
        self.questions_completed = json.dumps(data)

    def set_pages_completed(self, page_ids):
        # Set completed pages by clearing the current ones and adding new ones
        self.pages_completed.clear()  # Clear current completed pages
        for page_id in page_ids:
            self.pages_completed.create(
                page_id=page_id, user=self.user, track=self.track
            )

    def set_challenges_completed(self, data):
        self.challenges_completed = json.dumps(data)
