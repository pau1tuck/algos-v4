from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _
from allauth.account.models import EmailAddress


class Role(models.Model):
    name = models.CharField(max_length=64, unique=True)

    def __str__(self):
        return self.name


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_("The Email field must be set."))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))

        user = self.create_user(email, password, **extra_fields)

        # Automatically verify the superuser's email
        EmailAddress.objects.create(user=user, email=email, verified=True, primary=True)

        return user


class CustomUser(AbstractUser):
    username = models.CharField(max_length=32, unique=True, blank=True, null=True)
    first_name = models.CharField("First name", max_length=64, blank=True)
    last_name = models.CharField("Last name", max_length=64, blank=True)
    email = models.EmailField(_("email address"), unique=True)
    country = models.CharField(max_length=64, blank=True)
    roles = models.ManyToManyField(Role, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True, editable=True)
    last_visit = models.DateTimeField(auto_now=True, editable=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
    EMAIL_FIELD = "email"

    objects = CustomUserManager()

    def __str__(self):
        return f"{self.first_name} {self.last_name} {self.email}"

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
