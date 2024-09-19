# /server/content/models.py
from django.db import models


class QuestionType(models.Model):
    name = models.CharField(
        max_length=50, unique=True
    )  # E.g., True/False, Coding Challenge, etc.
    description = models.TextField(null=True, blank=True)  # Optional description

    def __str__(self):
        return self.name


class DifficultyLevel(models.Model):
    name = models.CharField(
        max_length=50, unique=True
    )  # E.g., Junior, Middle, Senior, Lead
    description = models.TextField(null=True, blank=True)  # Optional description

    def __str__(self):
        return self.name


class QuestionData(models.Model):
    question_id = models.CharField(
        max_length=100, unique=True
    )  # Unique ID for each question
    name = models.CharField(max_length=100, null=True, blank=True)  # Optional name
    question_type = models.ForeignKey(
        QuestionType, on_delete=models.SET_NULL, null=True
    )
    difficulty_level = models.ForeignKey(
        DifficultyLevel, on_delete=models.SET_NULL, null=True
    )
    point_value = models.PositiveIntegerField(default=0)  # Question's point value
    description = models.TextField(
        null=True, blank=True
    )  # Optional description of the question

    def __str__(self):
        return f"{self.question_id} - {self.difficulty_level} - {self.question_type}"
