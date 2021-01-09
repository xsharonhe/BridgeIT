from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import pickle
import pandas as pd
# import os
# from .serializers import HazardousSerializer
# from .models import Hazardous

# Create your views here.
class MLView(APIView):
    def get(self, request, format=None):
        # try:
        params = request.query_params
        # print(os.getcwd())
        # print(params)
        model = pickle.load(open('mobility/random_forest.pkl','rb'))
        fort_erie_4_day = model.predict([[83.98, 1, 0, 0, 0, 0, 0, 0, 1, 0]])
        fort_erie_4_end = model.predict([[83.98, 1, 0, 0, 0, 0, 0, 1, 1, 0]])
        fort_erie_5_day = model.predict([[83.98, 1, 0, 0, 0, 0, 0, 0, 0, 1]])
        fort_erie_5_end = model.predict([[83.98, 1, 0, 0, 0, 0, 0, 1, 0, 1]])
        fort_erie_6_day = model.predict([[83.98, 1, 0, 0, 0, 0, 0, 0, 0, 0]])
        fort_erie_6_end = model.predict([[83.98, 1, 0, 0, 0, 0, 0, 1, 0, 0]])
        lansdowne_4_day = model.predict([[83.98, 0, 1, 0, 0, 0, 0, 0, 1, 0]])
        lansdowne_4_end = model.predict([[83.98, 0, 1, 0, 0, 0, 0, 1, 1, 0]])
        lansdowne_5_day = model.predict([[83.98, 0, 1, 0, 0, 0, 0, 0, 0, 1]])
        lansdowne_5_end = model.predict([[83.98, 0, 1, 0, 0, 0, 0, 1, 0, 1]])
        lansdowne_6_day = model.predict([[83.98, 0, 1, 0, 0, 0, 0, 0, 0, 0]])
        lansdowne_6_end = model.predict([[83.98, 0, 1, 0, 0, 0, 0, 1, 0, 0]])
        sorted_list = []
        if(params["place"] == "FortErie"):
            sorted_list = sorted([
                fort_erie_4_day,
                fort_erie_4_end,
                fort_erie_5_day,
                fort_erie_5_end,
                fort_erie_6_day,
                fort_erie_6_end
            ])
        elif(params["place"] == "Lansdowne"):
            sorted_list = sorted([
                lansdowne_4_day,
                lansdowne_4_end,
                lansdowne_5_day,
                lansdowne_5_end,
                lansdowne_6_day,
                lansdowne_6_end
            ])
        else:
            sorted_list = sorted([
                fort_erie_4_day,
                fort_erie_4_end,
                fort_erie_5_day,
                fort_erie_5_end,
                fort_erie_6_day,
                fort_erie_6_end,
                lansdowne_4_day,
                lansdowne_4_end,
                lansdowne_5_day,
                lansdowne_5_end,
                lansdowne_6_day,
                lansdowne_6_end
            ])
        smallest = []
        for i in range(0, 3):
            if(fort_erie_4_day == sorted_list[i]):
                smallest.append({
                "location": "Fort Erie",
                "lat": 42.907,
                "lon": -78.906,
                "hour": 23,
                "weekday": 1, # 1 being is weekday
                "hours": fort_erie_4_day[0]
            })
            elif(fort_erie_4_end == sorted_list[i]):
                smallest.append({
                    "location": "Fort Erie",
                    "lat": 42.907,
                    "lon": -78.906,
                    "hour": 23,
                    "weekday": 0, # 1 being is weekday
                    "hours": fort_erie_4_end[0]
                })
            elif(fort_erie_5_day == sorted_list[i]):
                smallest.append({
                    "location": "Fort Erie",
                    "lat": 42.907,
                    "lon": -78.906,
                    "hour": 0,
                    "weekday": 1, # 1 being is weekday
                    "hours": fort_erie_5_day[0]
                })
            elif(fort_erie_5_end == sorted_list[i]):
                smallest.append({
                    "location": "Fort Erie",
                    "lat": 42.907,
                    "lon": -78.906,
                    "hour": 0,
                    "weekday": 0, # 1 being is weekday
                    "hours": fort_erie_5_end[0]
                })
            elif(fort_erie_6_day == sorted_list[i]):
                smallest.append({
                    "location": "Fort Erie",
                    "lat": 42.907,
                    "lon": -78.906,
                    "hour": 1,
                    "weekday": 1, # 1 being is weekday
                    "hours": fort_erie_5_end[0]
                })
            elif(fort_erie_6_end == sorted_list[i]):
                smallest.append({
                    "location": "Fort Erie",
                    "lat": 42.907,
                    "lon": -78.906,
                    "hour": 1,
                    "weekday": 1, # 1 being is weekday
                    "hours": fort_erie_5_end[0]
                })
            elif(lansdowne_4_day == sorted_list[i]):
                smallest.append({
                    "location": "Lansdowne",
                    "lat": 44.347,
                    "lon": -75.983,
                    "hour": 23,
                    "weekday": 1, # 1 being is weekday
                    "hours": lansdowne_4_day[0]
                })
            elif(lansdowne_4_end == sorted_list[i]):
                    smallest.append({
                    "location": "Lansdowne",
                    "lat": 44.347,
                    "lon": -75.983,
                    "hour": 23,
                    "weekday": 0, # 1 being is weekday
                    "hours": lansdowne_4_day[0]
                })
            elif(lansdowne_5_day == sorted_list[i]):
                    smallest.append({
                    "location": "Lansdowne",
                    "lat": 44.347,
                    "lon": -75.983,
                    "hour": 0,
                    "weekday": 1, # 1 being is weekday
                    "hours": lansdowne_4_day[0]
                })
            elif(lansdowne_5_end == sorted_list[i]):
                smallest.append({
                    "location": "Lansdowne",
                    "lat": 44.347,
                    "lon": -75.983,
                    "hour": 0,
                    "weekday": 0, # 1 being is weekday
                    "hours": lansdowne_4_day[0]
                })
            elif(lansdowne_6_day == sorted_list[i]):
                smallest.append({
                    "location": "Lansdowne",
                    "lat": 44.347,
                    "lon": -75.983,
                    "hour": 1,
                    "weekday": 1, # 1 being is weekday
                    "hours": lansdowne_4_day[0]
                })
            elif(lansdowne_6_end == sorted_list[i]):
                    smallest.append({
                    "location": "Lansdowne",
                    "lat": 44.347,
                    "lon": -75.983,
                    "hour": 1,
                    "weekday": 0, # 1 being is weekday
                    "hours": lansdowne_4_day[0]
                })
        return Response({
            "query": smallest
        })
