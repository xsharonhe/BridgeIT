from django.contrib import admin
from .models import Item

# Register your models here
class ItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'quantity', 'expiry', 'is_matched', 'is_donation', 'location', 'is_weekday', 'time', 'duration', 'donor', 'receiver')

admin.site.register(Item, ItemAdmin)