import json
from django.conf import settings
from django.db import models
from django.contrib.auth.models import User
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


# * GRADE
class Grade(models.Model):
    id = models.PositiveIntegerField(primary_key=True)  # Manual ID input
    title = models.CharField(max_length=100)  # e.g., 'White Belt'
    slug = models.SlugField(unique=True)  # e.g. "white-belt"
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

    # Store list as JSON string for SQLite compatibility
    questions_completed = models.TextField(default="[]")
    pages_completed = models.TextField(default="[]")
    challenges_completed = models.TextField(default="[]")

    current_page = models.PositiveIntegerField(null=True, blank=True)
    last_completed = models.DateTimeField(auto_now=True)

    @property
    def xp(self):
        return (
            len(self.get_pages_completed()) * 5
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
        if not self.get_pages_completed():
            return Level.objects.get(title="Aspiring Developer")

        levels = Level.objects.filter(track=self.track).order_by("order")
        completed_pages = set(self.get_pages_completed())
        for level in levels:
            if set(json.loads(level.pages_required)).issubset(completed_pages):
                return level
        return None

    def get_questions_completed(self):
        return json.loads(self.questions_completed)

    def get_pages_completed(self):
        return json.loads(self.pages_completed)

    def get_challenges_completed(self):
        return json.loads(self.challenges_completed)

    def set_questions_completed(self, data):
        self.questions_completed = json.dumps(data)

    def set_pages_completed(self, data):
        self.pages_completed = json.dumps(data)

    def set_challenges_completed(self, data):
        self.challenges_completed = json.dumps(data)

    # Overriding save to handle array logic and calculate points and health
    def save(self, *args, **kwargs):
        if self.get_pages_completed():
            self.current_page = self.get_pages_completed()[
                -1
            ]  # Most recent completed page

        # Calculate points based on completed pages, questions, and challenges
        self.points = (
            len(self.get_pages_completed()) * 5
            + len(self.get_questions_completed())
            + len(self.get_challenges_completed()) * 10
        )

        # Calculate health
        self.health = 100 - (
            len(self.get_questions_completed()) * 2
        )  # Deduct 2 points per question completed

        super().save(*args, **kwargs)

    def __str__(self):
        return f"Progress for {self.user.username} in {self.track.title}"

    class Meta:
        verbose_name = "User Progress Record"
        verbose_name_plural = "User Progress Records"
