# /server/core/middleware.py

import logging
from django.http import FileResponse

logger = logging.getLogger("core")


class RequestResponseLoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Log incoming request details
        logger.debug(f"Incoming Request: {request.method} {request.get_full_path()}")
        logger.debug(f"Request Headers: {dict(request.headers)}")

        # Handle file uploads or binary data
        if request.method == "POST" and request.FILES:
            # Skip decoding for binary data
            logger.info("File upload detected, skipping request body logging.")
        else:
            try:
                # Try to decode non-binary data as UTF-8
                logger.debug(
                    f'Request Body: {request.body.decode("utf-8") if request.body else "No Body"}'
                )
            except UnicodeDecodeError:
                # Log and handle binary data or non-decodable content
                logger.warning("Binary data detected, skipping body logging.")

        response = self.get_response(request)

        # Log response details
        logger.debug(f"Response Status Code: {response.status_code}")

        if isinstance(response, FileResponse):
            # Handle file responses
            logger.debug("FileResponse detected, skipping content logging.")
        else:
            try:
                logger.debug(
                    f'Response Content: {response.content.decode("utf-8") if response.content else "No Content"}'
                )
            except AttributeError:
                logger.warning(
                    "No content attribute found, possibly a stream response."
                )
            except UnicodeDecodeError:
                logger.warning("Binary response detected, skipping content logging.")

        return response
