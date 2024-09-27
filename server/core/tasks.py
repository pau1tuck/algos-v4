# /server/core/tasks.py
from celery import shared_task
import logging

logger = logging.getLogger(__name__)


@shared_task
def celery_heartbeat_task():
    logger.info("Celery is up and running.")
