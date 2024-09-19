# /server/gameplay/models.py
from django.db import models


class SkillLevel(models.Model):
    # •	This is determined based on the percentage of questions and challenges completed at various difficulty levels (e.g., Junior, Middle, Senior). For a user to reach a new skill level (e.g., from Junior to Senior), they need to complete a certain percentage of questions and challenges at the associated difficulty level.
    name = models.CharField(max_length=50, unique=True)  # e.g., 'Junior', 'Senior'
    threshold = models.FloatField(default=0)  # Completion threshold (as a percentage)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(
        upload_to="images/skills/", null=True, blank=True
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
