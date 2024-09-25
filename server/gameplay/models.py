# /server/gameplay/models.py
from django.db import models
from django.contrib.auth.models import User
from content.models import QuestionData  # Assuming QuestionData is in content.models
from .models import Level, Rank


class UserProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Link to the user
    xp = models.PositiveIntegerField(default=0)  # Total XP earned by the user
    points = models.PositiveIntegerField(default=0)  # Total points earned
    health = models.PositiveIntegerField(default=100)  # Current health of the user
    # coins = models.PositiveBigIntegerField(default=0)  # Coins earned by the user

    # Foreign keys to Level and Rank
    level = models.ForeignKey(Level, on_delete=models.SET_NULL, null=True)
    rank = models.ForeignKey(Rank, on_delete=models.SET_NULL, null=True)

    # Track completed pages, questions, and challenges as JSON or List
    completed_questions = models.ManyToManyField(
        QuestionData, related_name="completed_questions"
    )  # Many-to-many with QuestionData
    completed_pages = models.JSONField(default=list)  # List of completed page IDs
    completed_challenges = models.JSONField(
        default=list
    )  # List of completed challenge IDs

    # Track current progress
    current_page = models.PositiveIntegerField(
        null=True, blank=True
    )  # Last uncompleted page
    current_module = models.CharField(
        max_length=100, null=True, blank=True
    )  # Last opened module

    last_completed = models.DateTimeField(
        auto_now=True
    )  # Timestamp of the last completion

    def __str__(self):
        return f"{self.user.username}'s Progress"


class Level(models.Model):
    # •	This is determined based on the percentage of questions and challenges completed at various difficulty levels (e.g., Trainee, Junior, Middle, Senior, Lead). For a user to reach a new skill level (e.g., from Junior to Senior), they need to complete a certain percentage of questions and challenges at the associated difficulty level.
    name = models.CharField(max_length=50, unique=True)  # e.g., 'Junior', 'Senior'
    threshold = models.FloatField(default=0)  # Completion threshold (as a percentage)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(
        upload_to="images/levels/", null=True, blank=True
    )  # Image field for skill icons

    def __str__(self):
        return self.name


class Rank(models.Model):
    name = models.CharField(max_length=50, unique=True)  # e.g., 'Beginner', 'Expert'
    description = models.TextField(null=True, blank=True)
    rank_order = models.PositiveIntegerField(default=0)
    image = models.ImageField(
        upload_to="images/ranks/", null=True, blank=True
    )  # Image field for rank icons

    def __str__(self):
        return self.name


class GameplaySettings(models.Model):
    point_scaling = models.FloatField(default=1.0)  # Scale points dynamically
    health_regen_rate = models.FloatField(default=0.1)  # For health mechanics
    description = models.TextField(null=True, blank=True)  # Explain the setting

    def __str__(self):
        return "Gameplay Settings"
