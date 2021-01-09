from django.contrib import admin
from .models import UserProfile

# Register your models here
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'group_name', 'phone', 'address', 'user_type')

admin.site.register(UserProfile, ProfileAdmin)