from django.db import models


class Track(models.Model):
    id = models.PositiveIntegerField(primary_key=True)  # Allow manual ID input
    title = models.CharField(max_length=100)  # Track title, e.g., 'JavaScript'
    description = models.TextField(null=True, blank=True)
    slug = models.SlugField(unique=True)  # Unique slug for URL purposes
    image = models.ImageField(upload_to="images/tracks/", null=True, blank=True)
    thumbnail = models.ImageField(upload_to="images/tracks/", null=True, blank=True)
    icon = models.CharField(
        max_length=100, null=True, blank=True
    )  # Optional, Font-awesome icon name for visual representation

    def __str__(self):
        return self.title


# class DifficultyLevel(models.Model):
#    name = models.CharField(
#        max_length=50, unique=True
#    )  # E.g., Trainee, Junior, Middle, Senior, Lead
#    description = models.TextField(null=True, blank=True)
#
#    def __str__(self):
#        return self.name


# class QuestionType(models.Model):
#    name = models.CharField(
#        max_length=50, unique=True
#    )  # E.g., True/False, Coding Challenge, etc.
#    description = models.TextField(null=True, blank=True)
#
#    def __str__(self):
#        return self.name


# class QuestionData(models.Model):
#    question_id = models.CharField(
#        max_length=100, unique=True
#    )  # Unique ID for each question
#    name = models.CharField(max_length=100, null=True, blank=True)  # Optional name
#    question_type = models.ForeignKey(
#        QuestionType, on_delete=models.SET_NULL, null=True
#    )
#    difficulty_level = models.ForeignKey(
#        DifficultyLevel, on_delete=models.SET_NULL, null=True
#   )
#    point_value = models.PositiveIntegerField(default=0)  # Question's point value
#    description = models.TextField(null=True, blank=True)
#
#    def __str__(self):
#        return f"{self.question_id} - {self.difficulty_level} - {self.question_type}"
