from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.authtoken.models import Token
from rest_framework.authentication import authenticate, TokenAuthentication
from django.db import models
from drf_spectacular.utils import extend_schema, OpenApiRequest, OpenApiExample
from .models import *
from .serializers import *

# Create your views here.


class RegisterView(APIView):
    @extend_schema(
        summary="Get all registered Users",
        description="Input is not needed for User list",
    )
    def get(self, request):
        qs = WebUser.objects.all()
        serializer = UserSerializer(qs, many=True)
        return Response({"data": serializer.data})

    @extend_schema(
        summary="Register a new user",
        description="Input a username and password",
        request=OpenApiRequest(
            request=UserSerializer,
            examples=[
                OpenApiExample(
                    name="example",
                    value={"username": "tg", "password": "1234"},
                )
            ],
        ),
    )
    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if WebUser.objects.filter(username=request.data["username"]).exists():
            return Response({"error": "Username already exists"})

        if WebUser.objects.filter(email=request.data["email"]).exists():
            return Response({"error": "Email already exists"})

        elif serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"})

        return Response({"errors": serializer.errors})


class LoginView(APIView):
    @extend_schema(
        summary="Login a user and return a generated token",
        description="Input a username and password",
    )
    def post(self, request):
        user = authenticate(
            username=request.data["username"], password=request.data["password"]
        )
        print(user)
        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"token": token.key})
        return Response({"error_message": "Invalid username or password"})


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    @extend_schema(
        summary="Logout the current user",
        description="Delete the current auth_token",
    )
    def post(self, request):
        request.auth.delete()
        return Response({"message": "Logged out successfully"})


class UpdateInfoView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    @extend_schema(
        summary="Update personal info of the logged in user",
        description="Input a field with the new value you want to replace with",
        request=OpenApiRequest(
            request=UserUpdateSerializer,
            examples=[
                OpenApiExample(
                    name="example",
                    value={
                        "username": "tg",
                        "email": "tg@gmail.com",
                        "first_name": "Tom",
                        "last_name": "Jones",
                    },
                ),
            ],
        ),
    )
    def patch(self, request):
        serializer = UserUpdateSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"Successfully updated": serializer.data})
        return Response({"error": serializer.errors})


class UpdatePasswordView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    @extend_schema(
        summary="Update password of the logged in user",
        description="Input a password with the new value you want to replace with",
        request=OpenApiRequest(
            PasswordUpdateSerializer,
            examples=[
                OpenApiExample(name="example", value={"password": "1234"}),
            ],
        ),
    )
    def patch(self, request):
        serializer = PasswordUpdateSerializer(
            request.user, data=request.data, partial=True
        )
        if serializer.is_valid():
            request.user.set_password(serializer.validated_data["password"])
            request.user.save()
            return Response({"message": "Successfully updated"})
        return Response({"error": serializer.errors})


class Eventist(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        serializer = EventListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": serializer.data})
        return Response({"error": serializer.errors})

    def patch(self, request, id):
        event = Event.objects.get(id=id)
        serializer = EventListSerializer(event, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": serializer.data})
        return Response({"error": serializer.errors})
