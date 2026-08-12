from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import *


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = WebUser
        fields = ["username", "first_name", "last_name", "email", "password"]

    def create(self, validated_data):
        return WebUser.objects.create_user(**validated_data)


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebUser
        fields = ["username", "first_name", "last_name", "email"]


class PasswordUpdateSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True)
