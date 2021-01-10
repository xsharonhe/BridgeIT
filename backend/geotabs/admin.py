from django.contrib import admin
from .models import Hazardous

# Register your models here.
@admin.register(Hazardous)
class HazardsAdmin(admin.ModelAdmin):
    list_display = ('id', 'lat', 'lon', 'city', 'severity_score', 'incidents_total')
    ordering = ('severity_score', )