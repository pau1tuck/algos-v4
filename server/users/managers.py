# /server/users/managers.py
from django.contrib.auth.models import BaseUserManager
from django.utils.translation import gettext_lazy as _
from allauth.account.models import EmailAddress
from .models import Role


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_("The Email field must be set."))

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        # Assign the "member" role by default if not provided
        if "roles" not in extra_fields or not extra_fields["roles"]:
            try:
                member_role = Role.objects.get(name="member")
                user.roles.add(member_role)
            except Role.DoesNotExist:
                raise ValueError(
                    _("The 'member' role does not exist. Please create it first.")
                )

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))

        user = self.create_user(email, password, **extra_fields)

        # Assign all relevant roles to the superuser
        required_roles = ["member", "subscriber", "staff", "admin"]
        for role_name in required_roles:
            try:
                role = Role.objects.get(name=role_name)
                user.roles.add(role)
            except Role.DoesNotExist:
                raise ValueError(
                    _(f"The '{role_name}' role does not exist. Please create it first.")
                )

        # Automatically verify the superuser's email
        EmailAddress.objects.create(user=user, email=email, verified=True, primary=True)

        return user
