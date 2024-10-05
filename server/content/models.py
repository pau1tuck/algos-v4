from django.db import models


class DifficultyLevel(models.Model):
    name = models.CharField(
        max_length=50, unique=True
    )  # E.g., Trainee, Junior, Middle, Senior, Lead
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name


from django.db import models


class Track(models.Model):
    id = models.PositiveIntegerField(primary_key=True)  # Manual ID input
    title = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    slug = models.SlugField(unique=True)
    image = models.ImageField(upload_to="images/tracks/", null=True, blank=True)
    thumbnail = models.ImageField(upload_to="images/tracks/", null=True, blank=True)
    icon = models.CharField(max_length=100, null=True, blank=True)
    order = models.PositiveIntegerField(default=0)  # Order for the track

    def __str__(self):
        return self.title


class Course(models.Model):
    id = models.PositiveIntegerField(primary_key=True)  # Manual ID input
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    track = models.ForeignKey(Track, related_name="courses", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="images/courses/", null=True, blank=True)
    order = models.PositiveIntegerField(default=0)  # Order for the course

    def __str__(self):
        return self.title


class Module(models.Model):
    id = models.PositiveIntegerField(primary_key=True)  # Manual ID input
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    course = models.ForeignKey(Course, related_name="modules", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="images/modules/", null=True, blank=True)
    order = models.PositiveIntegerField(default=0)  # Order for the module

    def __str__(self):
        return self.title


class Section(models.Model):
    id = models.PositiveIntegerField(primary_key=True)  # Manual ID input
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    module = models.ForeignKey(
        Module, related_name="sections", on_delete=models.CASCADE
    )
    image = models.ImageField(upload_to="images/sections/", null=True, blank=True)
    order = models.PositiveIntegerField(default=0)  # Order for the section

    def __str__(self):
        return self.title


class Page(models.Model):
    id = models.PositiveIntegerField(primary_key=True)  # Manual ID input
    title = models.CharField(max=255)
    description = models.TextField()
    image = models.ImageField(upload_to="images/pages/", null=True, blank=True)
    questions = models.ManyToManyField("Question", related_name="pages", blank=True)
    section = models.ForeignKey(Section, related_name="pages", on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=0)  # Order for the page
    points = models.IntegerField(default=0)  # Points for completing the page
    prerequisites = models.ManyToManyField(
        "self", blank=True, related_name="required_for"
    )  # Prerequisite pages
    requires_auth = models.BooleanField(default=False)  # Authentication requirement

    def __str__(self):
        return self.title


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
