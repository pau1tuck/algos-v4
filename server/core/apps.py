# /server/core/apps.py
from django.apps import AppConfig
from .tasks import celery_heartbeat_task
import logging

logger = logging.getLogger(__name__)


class CoreConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core"

    def ready(self):
        # Trigger Celery heartbeat task
        self.check_celery_status()

    def check_celery_status(self):
        try:
            celery_heartbeat_task.delay()  # Sends an async task to check Celery status
            logger.info("Celery task dispatched successfully.")
        except Exception as e:
            logger.error(f"Celery is not running or not reachable: {str(e)}")
