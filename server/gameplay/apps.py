# /server/gameplay/apps.py
from django.apps import AppConfig


class GameplayConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "gameplay"

    def ready(self):
        import gameplay.signals  # Import the signals to ensure they get registered
