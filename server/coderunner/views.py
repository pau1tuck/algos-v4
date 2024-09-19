# server/coderunner/views.py

import docker
import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CodeExecutionSerializer

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class CodeRunnerView(APIView):
    def post(self, request):
        logger.info("Received a code execution request")

        # Initialize Docker client
        docker_client = docker.from_env()
        logger.info("Docker client initialized")

        # Validate incoming data using the serializer
        serializer = CodeExecutionSerializer(data=request.data)
        if serializer.is_valid():
            user_code = serializer.validated_data["user_code"]
            test_code = serializer.validated_data["test_code"]
            test_cases = serializer.validated_data["test_cases"]

            # Log user code and test cases
            logger.info(f"User code received: {user_code}")
            logger.info(f"Test cases received: {test_cases}")
            logger.info(f"Test code received: {test_code}")

            # Start Docker container to execute code
            try:
                container = docker_client.containers.run(
                    "node-code-executor",
                    detach=True,
                    environment={
                        "USER_CODE": user_code,
                        "TEST_CODE": test_code,
                        "TEST_CASES": json.dumps(test_cases),
                    },
                    remove=True,
                )

                # Capture output from the container
                container_output = container.logs().decode("utf-8")
                logger.info(f"Container output: {container_output}")

                # Return the captured output to the user
                return Response({"output": container_output}, status=status.HTTP_200_OK)
            except Exception as e:
                logger.error(f"Error during container execution: {e}")
                return Response(
                    {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        else:
            logger.error(f"Validation errors: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
