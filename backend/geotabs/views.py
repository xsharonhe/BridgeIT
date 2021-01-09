from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import HazardousSerializer
from .models import Hazardous

# Create your views here.
class HazardsView(APIView):
    def get(self, request, format=None):
        try:
            hazards = Hazardous.objects.all().order_by('-severity_score')
            serializer = HazardousSerializer(hazards, many=True)
            return Response(serializer.data)
        except Hazardous.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)