# /server/users/apps.py
from django.apps import AppConfig
import redis
from django.conf import settings
import logging
from celery import Celery

logger = logging.getLogger(__name__)


class UsersConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "users"

    def ready(self):
        # Import your signals (existing functionality)
        import users.signals  # Import the signals module

        # Add Redis and Celery checks here
        self.check_redis_connection()
        self.check_celery_status()

    def check_redis_connection(self):
        try:
            # Checking if Redis is running
            r = redis.StrictRedis.from_url(settings.CACHES["default"]["LOCATION"])
            r.ping()  # Ping the Redis server
            logger.info("Connected to Redis.")
        except redis.ConnectionError:
            logger.error("Redis is not running.")

    def check_celery_status(self):
        try:
            # Trigger a simple Celery task or check its status
            app = Celery("core")
            app.conf.broker_url = settings.CELERY_BROKER_URL
            app.control.ping(timeout=1)
            logger.info("Celery is running.")
        except Exception as e:
            logger.error(f"Celery is not running: {str(e)}")
