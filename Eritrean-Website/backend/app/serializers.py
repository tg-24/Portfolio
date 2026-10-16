from rest_framework import serializers
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


class EventSerializer(serializers.ModelSerializer):
    start_time = serializers.DateTimeField(
        format="%m/%d/%Y %I:%M %p", input_formats=["%m/%d/%Y %I:%M %p"]
    )
    end_time = serializers.DateTimeField(
        format="%m/%d/%Y %I:%M %p", input_formats=["%m/%d/%Y %I:%M %p"]
    )

    class Meta:
        model = Event
        fields = "__all__"
