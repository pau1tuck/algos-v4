# server/coderunner/views.py

# Import necessary modules from Django Rest Framework
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Import coderunner execution serializer for code execution
from .serializers import CodeExecutionSerializer


# Define a view class for code execution
class CodeRunnerView(APIView):
    """
    A view that handles code execution requests.

    It accepts POST requests with code to be executed and returns the execution result.
    """

    def post(self, request):
        """
        Handle a POST request for code execution.

        :param request: The incoming request object
        :return: A response object with the execution result
        """

        # Validate incoming data using the serializer
        serializer = CodeExecutionSerializer(data=request.data)

        # Check if the serializer is valid
        if serializer.is_valid():
            # Get the validated data from the serializer
            user_code = serializer.validated_data["user_code"]
            test_cases = serializer.validated_data["test_cases"]
            test_code = serializer.validated_data["test_code"]

            # TO DO: Implement code execution logic here
            # For now, just return a mock response
            output = "Code executed successfully"
            return Response({"output": output}, status=status.HTTP_200_OK)

        # If the serializer is not valid, return an error response
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
