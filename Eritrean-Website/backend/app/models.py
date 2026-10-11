from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class WebUser(AbstractUser):
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username


class Event(models.Model):
    title = models.CharField()
    location = models.CharField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    address = models.CharField()
    description = models.TextField()
    roster = models.ManyToManyField(
        WebUser, related_name="registered_users", blank=True
    )
