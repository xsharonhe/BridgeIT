from rest_framework import serializers
from .models import Hazardous

class HazardousSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hazardous
        fields = [
            'id',
            'lat',
            'lon',
            'city',
            'severity_score',
            'incidents_total'
        ]