# /server/core/middleware.py

import logging
from django.http import FileResponse

logger = logging.getLogger("core")


class RequestResponseLoggingMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Skip logging the body if it's a multipart/form-data request (file upload)
        if request.content_type and "multipart/form-data" in request.content_type:
            request_body = "Binary Data (multipart/form-data)"
        else:
            try:
                request_body = (
                    request.body.decode("utf-8") if request.body else "No Body"
                )
            except UnicodeDecodeError:
                request_body = "Binary Data (could not decode)"

        logger.debug(f"Incoming Request: {request.method} {request.get_full_path()}")
        logger.debug(f"Request Headers: {dict(request.headers)}")
        logger.debug(f"Request Body: {request_body}")

        response = self.get_response(request)

        # Ensure not to access streaming content directly, e.g., for FileResponse
        if isinstance(response, FileResponse):
            response_content = "File Streaming Content"
        else:
            try:
                response_content = (
                    response.content.decode("utf-8")
                    if response.content
                    else "No Content"
                )
            except UnicodeDecodeError:
                response_content = "Binary Data (could not decode)"

        logger.debug(f"Response Status Code: {response.status_code}")
        logger.debug(f"Response Content: {response_content}")

        return response
