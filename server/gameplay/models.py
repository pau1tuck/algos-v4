# /server/gameplay/models.py
from django.db import models
from django.contrib.auth.models import User
from content.models import QuestionData  # Assuming QuestionData is in content.models
from django.db import models
from django.contrib.postgres.fields import ArrayField
from content.models import Track  # Import Track model


# * MAX ATTAINABLE SCORE
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


# * GRADE
# White Belt, White Belt (Yellow Stripe), Yellow Belt, Yellow Belt (Orange Stripe), Orange Belt
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
        max_length=2, null=True, blank=True
    )  # Icon for visual representation
    xp_threshold = models.FloatField()

    def __str__(self):
        return self.title


# * RANK
# Explorer, Postulant, Apprentice, Journeyman, Professional, Master, Grand Master, BEAST
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
        max_length=2, null=True, blank=True
    )  # Icon for visual representation
    order = models.PositiveIntegerField()  # Integer field to specify progression order
    challenge_threshold = (
        models.FloatField()
    )  # Challenges required to achieve this rank

    def __str__(self):
        return self.title


# * LEVEL
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
        max_length=2, null=True, blank=True
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

    questions_completed = ArrayField(models.IntegerField(), default=list)
    pages_completed = ArrayField(models.IntegerField(), default=list)
    challenges_completed = ArrayField(models.IntegerField(), default=list)

    # Current page will be the last one in pages_completed
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
            return Level.objects.get(title="Aspiring Developer")

        levels = Level.objects.filter(track=self.track).order_by("order")
        completed_pages = set(self.pages_completed)
        for level in levels:
            if set(level.pages_required).issubset(completed_pages):
                return level
        return None  # Catch any unexpected cases

    # Overriding save to set current_page as the most recent in pages_completed
    def save(self, *args, **kwargs):
        if self.pages_completed:
            self.current_page = self.pages_completed[-1]  # Most recent completed page
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Progress for {self.user.username} in {self.track.title}"
