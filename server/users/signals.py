# server/users/signals.py

import logging
from django.contrib.auth.signals import (
    user_logged_in,
    user_logged_out,
    user_login_failed,
)
from django.dispatch import receiver

logger = logging.getLogger("users")


@receiver(user_logged_in)
def log_user_logged_in(sender, request, user, **kwargs):
    logger.info(f"User Logged In: {user.username} from IP {get_client_ip(request)}")


@receiver(user_logged_out)
def log_user_logged_out(sender, request, user, **kwargs):
    logger.info(f"User Logged Out: {user.username} from IP {get_client_ip(request)}")


@receiver(user_login_failed)
def log_user_login_failed(sender, credentials, request, **kwargs):
    logger.warning(
        f'Login Failed for: {credentials.get("username", "Unknown")} from IP {get_client_ip(request)}'
    )


def get_client_ip(request):
    """Utility function to get client IP address"""
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        return x_forwarded_for.split(",")[0]
    return request.META.get("REMOTE_ADDR")
