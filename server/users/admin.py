# /server/users/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Role


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
        "avatar",
    )
    list_filter = ("email", "is_staff", "is_active", "country")

    fieldsets = (
        (
            None,
            {"fields": ("email", "username", "password")},
        ),
        (
            "Personal info",
            {"fields": ("first_name", "last_name", "country", "avatar")},
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_staff",
                    "is_active",
                    "is_superuser",
                    "roles",
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
                    "roles",
                    "avatar",
                ),
            },
        ),
    )

    search_fields = ("email", "username", "first_name", "last_name")
    ordering = ("email",)
    readonly_fields = ("created_at", "last_visit")


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Role)
