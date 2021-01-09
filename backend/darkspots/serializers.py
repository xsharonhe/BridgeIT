from rest_framework import serializers
from .models import DarkSpots

class DarkSpotsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DarkSpots
        fields = [
            'id',
            'lat',
            'lon',
            'city',
            'avg_drops',
            'percent_affected'
        ]