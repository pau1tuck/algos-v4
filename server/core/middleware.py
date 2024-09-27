# /server/core/middleware.py

import logging

logger = logging.getLogger("core")


class RequestResponseLoggingMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):

        # Log request details
        logger.debug(f"Incoming Request: {request.method} {request.get_full_path()}")
        logger.debug(f"Request Headers: {dict(request.headers)}")
        logger.debug(
            f'Request Body: {request.body.decode("utf-8") if request.body else "No Body"}'
        )

        response = self.get_response(request)

        # Log response details
        logger.debug(f"Response Status Code: {response.status_code}")
        logger.debug(
            f'Response Content: {response.content.decode("utf-8") if response.content else "No Content"}'
        )

        return response


def __call__(self, request):
    # Check if the request contains file uploads (multipart/form-data)
    if request.content_type.startswith("multipart/form-data"):
        request_body = "Binary Data (multipart/form-data)"
    else:
        request_body = request.body.decode("utf-8") if request.body else "No Body"

    logger.info(f"Request Body: {request_body}")
    return self.get_response(request)
