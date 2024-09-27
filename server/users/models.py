# /server/users/models.py

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager


class Role(models.Model):
    name = models.CharField(max_length=64, unique=True)

    def __str__(self):
        return self.name


class CustomUser(AbstractUser):
    # Handle/username (e.g. @pau1tuck), optional but unique
    username = models.CharField(max_length=32, unique=True, blank=True, null=True)
    first_name = models.CharField("First name", max_length=64, blank=True)
    last_name = models.CharField("Last name", max_length=64, blank=True)
    email = models.EmailField(_("Email address"), unique=True)
    city = models.CharField(max_length=64, blank=True, null=True)
    country = models.CharField(max_length=64, blank=True)
    avatar = models.ImageField(upload_to="uploads/avatars/", blank=True, null=True)
    roles = models.ManyToManyField(Role, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=True)
    last_visit = models.DateTimeField(auto_now=True, editable=True)

    HEADLINE_CHOICES = [
        ("Backend Developer", "Backend Developer"),
        ("Data Scientist", "Data Scientist"),
        ("DevOps Engineer", "DevOps Engineer"),
        ("Frontend Developer", "Frontend Developer"),
        ("Full Stack Developer", "Full Stack Developer"),
        ("JavaScript Developer", "JavaScript Developer"),
        ("Software Engineer", "Software Engineer"),
        ("Student", "Student"),
        ("Custom", "Custom"),  # Allows the user to provide their own headline
    ]
    headline = models.CharField(
        max_length=100, choices=HEADLINE_CHOICES, default="Custom", blank=True
    )
    custom_headline = models.CharField(max_length=100, blank=True, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = CustomUserManager()

    def __str__(self):
        return f"{self.first_name} {self.last_name} {self.email}"

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
