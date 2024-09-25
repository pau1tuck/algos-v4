# /server/gameplay/models.py
from django.db import models
from django.contrib.auth.models import User
from content.models import QuestionData  # Assuming QuestionData is in content.models
from django.db import models
from django.contrib.postgres.fields import ArrayField
from content.models import Track  # Import Track model


# * MAX ATTAINABLE SCORES
class MaxAttainable(models.Model):
    track = models.ForeignKey(Track, on_delete=models.CASCADE)  # Reference Track model
    total_pages = models.IntegerField(default=0)
    total_challenges = models.IntegerField(default=0)
    total_questions = models.IntegerField(default=0)

    @property
    def max_xp(self):
        return (
            (self.total_pages * 5) + self.total_questions + (self.total_challenges * 10)
        )

    def __str__(self):
        return f"Max attainable scores for {self.track.title}"


# * GRADES
class Grade(models.Model):
    id = models.PositiveIntegerField(primary_key=True)  # Manual ID input
    title = models.CharField(
        max_length=100
    )  # e.g., 'White Belt (Yellow Stripe)', 'Yellow Belt'
    slug = models.SlugField(unique=True)  # e.g. "white-yellow"
    order = (
        models.PositiveIntegerField()
    )  # Integer field to specify the order of progression
    image = models.ImageField(
        upload_to="images/grades/", null=True, blank=True
    )  # Optional, stores grade image
    thumbnail = models.ImageField(
        upload_to="images/grades/", null=True, blank=True
    )  # Optional, stores grade thumbnail
    icon = models.CharField(
        max_length=100, null=True, blank=True
    )  # Icon for visual representation
    xp_threshold = models.FloatField()

    def __str__(self):
        return self.title


# * RANKS
class Rank(models.Model):
    id = models.PositiveIntegerField(primary_key=True)  # Manual ID input
    title = models.CharField(max_length=100)  # e.g., 'Apprentice', 'Professional'
    slug = models.SlugField(unique=True)  # e.g., "apprentice"
    image = models.ImageField(
        upload_to="images/ranks/", null=True, blank=True
    )  # Optional, stores rank image
    thumbnail = models.ImageField(
        upload_to="images/ranks/", null=True, blank=True
    )  # Optional, stores rank thumbnail
    icon = models.CharField(
        max_length=100, null=True, blank=True
    )  # Icon for visual representation
    order = models.PositiveIntegerField()  # Integer field to specify progression order
    challenge_threshold = (
        models.FloatField()
    )  # Challenges required to achieve this rank

    def __str__(self):
        return self.title


# * LEVELS
class Level(models.Model):
    id = models.PositiveIntegerField(primary_key=True)  # Manual ID input
    track = models.ForeignKey(Track, on_delete=models.CASCADE)  # Reference to Track
    title = models.CharField(
        max_length=100
    )  # e.g., 'Apprentice', 'Senior JavaScript Developer'
    slug = models.SlugField(unique=True)  # e.g. "senior-js-developer"
    image = models.ImageField(
        upload_to="images/levels/", null=True, blank=True
    )  # Optional, stores level image
    thumbnail = models.ImageField(
        upload_to="images/levels/", null=True, blank=True
    )  # Optional, stores level thumbnail
    icon = models.CharField(
        max_length=100, null=True, blank=True
    )  # Icon for visual representation
    order = (
        models.PositiveIntegerField()
    )  # Integer field to specify the order of progression
    pages_required = ArrayField(
        models.PositiveIntegerField()
    )  # Array of page IDs required to achieve this level

    def __str__(self):
        return f"{self.title} - {self.track.title}"


#     name = models.CharField(max_length=50, unique=True)  # e.g., 'Junior', 'Senior'
#     threshold = models.FloatField(default=0)  # Completion threshold (as a percentage)
#     description = models.TextField(null=True, blank=True)
#     image = models.ImageField(upload_to="images/levels/", null=True, blank=True)  # Image field for skill icons


# * USER PROGRESS
class UserProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    track = models.ForeignKey(Track, on_delete=models.CASCADE)

    points = models.IntegerField(default=0)
    health = models.IntegerField(default=100)

    # Completed items
    questions_completed = ArrayField(models.IntegerField(), default=list)
    pages_completed = ArrayField(models.IntegerField(), default=list)
    challenges_completed = ArrayField(models.IntegerField(), default=list)

    # Track current progress
    current_page = models.PositiveIntegerField(null=True, blank=True)
    last_completed = models.DateTimeField(auto_now=True)

    @property
    def xp(self):
        return (
            (len(self.pages_completed) * 5)
            + len(self.questions_completed)
            + (len(self.challenges_completed) * 10)
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
            Rank.objects.filter(challenge_threshold__lte=len(self.challenges_completed))
            .order_by("-challenge_threshold")
            .first()
        )

    @property
    def level(self):
        if not self.pages_completed:
            return Level.objects.get(title="Aspiring JavaScript Developer")

        levels = Level.objects.filter(track=self.track).order_by("order")
        completed_pages = set(self.pages_completed)
        for level in levels:
            if set(level.pages_required).issubset(completed_pages):
                return level
        return None  # Catch any unexpected cases

    def __str__(self):
        return f"Progress for {self.user.username} in {self.track.title}"


# level = models.ForeignKey(Level, on_delete=models.SET_NULL, null=True)


# class Level(models.Model):
#    # •	This is determined based on the percentage of questions and challenges completed at various difficulty levels (e.g., Trainee, Junior, Middle, Senior, Lead). For a user to reach a new skill level (e.g., from Junior to Senior), they need to complete a certain percentage of questions and challenges at the associated difficulty level.
#    name = models.CharField(max_length=50, unique=True)  # e.g., 'Junior', 'Senior'
#    threshold = models.FloatField(default=0)  # Completion threshold (as a percentage)
#    description = models.TextField(null=True, blank=True)
#    image = models.ImageField(
#        upload_to="images/levels/", null=True, blank=True
#    )  # Image field for skill icons
#
#   def __str__(self):
#        return self.name


# class GameplaySettings(models.Model):
#    point_scaling = models.FloatField(default=1.0)  # Scale points dynamically
#    health_regen_rate = models.FloatField(default=0.1)  # For health mechanics
#    description = models.TextField(null=True, blank=True)  # Explain the setting
#
#    def __str__(self):
#        return "Gameplay Settings"
