from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.middleware.csrf import get_token

from .serializers import RegisterUserSerializer


class SignupUserView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = RegisterUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)

class GetCSRFView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        response = Response(status=status.HTTP_200_OK)
        response.set_cookie('csrftoken', get_token(request), httponly=True)
        return response