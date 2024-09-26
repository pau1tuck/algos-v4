from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from dj_rest_auth.registration.views import RegisterView
from .serializers import CustomUserSerializer
from .serializers import CustomRegisterSerializer


class CustomUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)


class CustomRegisterView(RegisterView):
    serializer_class = CustomRegisterSerializer
