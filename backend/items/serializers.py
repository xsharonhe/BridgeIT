from rest_framework import serializers
from .models import Item

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class CreateItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('name', 'quantity', 'expiry', 'is_matched', 'is_donation', 'location', 'is_weekday', 'time', 'duration', 'donor', 'receiver')