from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import DarkSpotsSerializer
from .models import DarkSpots

# Create your views here.
class DarkSpotsView(APIView):
    def get(self, request, format=None):
        try:
            darkspots = DarkSpots.objects.all().order_by('percent_affected')
            serializer = DarkSpotsSerializer(darkspots, many=True)
            return Response(serializer.data)
        except DarkSpots.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)