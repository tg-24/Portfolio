from django.contrib import admin
from .models import *
from django.contrib.sessions.models import Session

# Register your models here.


@admin.register(WebUser)
class WebAdmin(admin.ModelAdmin):
    list_display = ["id", "username", "first_name", "last_name", "email"]


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "location", "start_time", "end_time"]
    filter_horizontal = ["roster"]
