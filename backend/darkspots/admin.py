from django.contrib import admin
from .models import DarkSpots

# Register your models here.
@admin.register(DarkSpots)
class DarkSpotsAdmin(admin.ModelAdmin):
    list_display = ('id', 'lat', 'lon', 'city', 'avg_drops', 'percent_affected')
    ordering = ('percent_affected',)