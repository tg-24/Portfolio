from django.contrib import admin
from .models import *

# Register your models here.


@admin.register(WebUser)
class WebAdmin(admin.ModelAdmin):
    list_display = ["username", "first_name", "last_name", "email"]


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ["title", "location", "date", "start_time", "end_time"]
