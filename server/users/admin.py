from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = (
        "email",
        "username",
        "first_name",
        "last_name",
        "country",
        "is_staff",
        "is_active",
        "created_at",
        "last_visit",
    )
    list_filter = ("email", "is_staff", "is_active", "country")
    fieldsets = (
        (None, {"fields": ("email", "username", "password")}),
        ("Personal info", {"fields": ("first_name", "last_name", "country")}),
        (
            "Permissions",
            {
                "fields": (
                    "is_staff",
                    "is_active",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        ("Important dates", {"fields": ("last_login", "created_at", "last_visit")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "username",
                    "password1",
                    "password2",
                    "first_name",
                    "last_name",
                    "country",
                    "is_staff",
                    "is_active",
                ),
            },
        ),
    )
    search_fields = ("email", "username", "first_name", "last_name")
    ordering = ("email",)
    readonly_fields = ("created_at", "last_visit")


admin.site.register(CustomUser, CustomUserAdmin)
