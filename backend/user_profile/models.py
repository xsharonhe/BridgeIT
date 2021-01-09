from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    group_name = models.CharField(max_length=250, default='')
    phone = models.CharField(max_length=20, default='')
    address = models.CharField(max_length=30, default='')
    user_type = models.CharField(max_length=20, default='')

    def __str__(self):
        return self.group_name