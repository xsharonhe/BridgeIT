from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import pickle
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
        prescott_4_day = model.predict([[83.98, 0, 0, 1, 0, 0, 0, 0, 1, 0]])
        prescott_4_end = model.predict([[83.98, 0, 0, 1, 0, 0, 0, 1, 1, 0]])
        prescott_5_day = model.predict([[83.98, 0, 0, 1, 0, 0, 0, 0, 0, 1]])
        prescott_5_end = model.predict([[83.98, 0, 0, 1, 0, 0, 0, 1, 0, 1]])
        prescott_6_day = model.predict([[83.98, 0, 0, 1, 0, 0, 0, 0, 0, 0]])
        prescott_6_end = model.predict([[83.98, 0, 0, 1, 0, 0, 0, 1, 0, 0]])
        queenston_4_day = model.predict([[83.98, 0, 0, 0, 1, 0, 0, 0, 1, 0]])
        queenston_4_end = model.predict([[83.98, 0, 0, 0, 1, 0, 0, 1, 1, 0]])
        queenston_5_day = model.predict([[83.98, 0, 0, 0, 1, 0, 0, 0, 0, 1]])
        queenston_5_end = model.predict([[83.98, 0, 0, 0, 1, 0, 0, 1, 0, 1]])
        queenston_6_day = model.predict([[83.98, 0, 0, 0, 1, 0, 0, 0, 0, 0]])
        queenston_6_end = model.predict([[83.98, 0, 0, 0, 1, 0, 0, 1, 0, 0]])
        sarnia_4_day = model.predict([[83.98, 0, 0, 0, 0, 1, 0, 0, 1, 0]])
        sarnia_4_end = model.predict([[83.98, 0, 0, 0, 0, 1, 0, 1, 1, 0]])
        sarnia_5_day = model.predict([[83.98, 0, 0, 0, 0, 1, 0, 0, 0, 1]])
        sarnia_5_end = model.predict([[83.98, 0, 0, 0, 0, 1, 0, 1, 0, 1]])
        sarnia_6_day = model.predict([[83.98, 0, 0, 0, 0, 1, 0, 0, 0, 0]])
        sarnia_6_end = model.predict([[83.98, 0, 0, 0, 0, 1, 0, 1, 0, 0]])
        windsor_4_day = model.predict([[83.98, 0, 0, 0, 0, 0, 1, 0, 1, 0]])
        windsor_4_end = model.predict([[83.98, 0, 0, 0, 0, 0, 1, 1, 1, 0]])
        windsor_5_day = model.predict([[83.98, 0, 0, 0, 0, 0, 1, 0, 0, 1]])
        windsor_5_end = model.predict([[83.98, 0, 0, 0, 0, 0, 1, 1, 0, 1]])
        windsor_6_day = model.predict([[83.98, 0, 0, 0, 0, 0, 1, 0, 0, 0]])
        windsor_6_end = model.predict([[83.98, 0, 0, 0, 0, 0, 1, 1, 0, 0]])
        cornwall_4_day = model.predict([[83.98, 0, 0, 0, 0, 0, 0, 0, 1, 0]])
        cornwall_4_end = model.predict([[83.98, 0, 0, 0, 0, 0, 0, 1, 1, 0]])
        cornwall_5_day = model.predict([[83.98, 0, 0, 0, 0, 0, 0, 0, 0, 1]])
        cornwall_5_end = model.predict([[83.98, 0, 0, 0, 0, 0, 0, 1, 0, 1]])
        cornwall_6_day = model.predict([[83.98, 0, 0, 0, 0, 0, 0, 0, 0, 0]])
        cornwall_6_end = model.predict([[83.98, 0, 0, 0, 0, 0, 0, 1, 0, 0]])
        
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
        elif(params["place"] =="Prescott"):
            sorted_list = sorted([
                prescott_4_day,
                prescott_4_end,
                prescott_5_day,
                prescott_5_end,
                prescott_6_day,
                prescott_6_end
            ])
        elif(params["place"] == "Queenston"):
            sorted_list = sorted([
                queenston_4_day,
                queenston_4_end,
                queenston_5_day,
                queenston_5_end,
                queenston_6_day,
                queenston_6_end
            ])
        elif(params["place"] == "Sarnia"):
            sorted_list = sorted([
                sarnia_4_day,
                sarnia_4_end,
                sarnia_5_day,
                sarnia_5_end,
                sarnia_6_day,
                sarnia_6_end
            ])
        elif(params["place"] == "Windsor"):
            sorted_list = sorted([
                windsor_4_day,
                windsor_4_end,
                windsor_5_day,
                windsor_5_end,
                windsor_6_day,
                windsor_6_end
            ])
        elif(params["place"] == "Cornwall"):
            sorted_list = sorted([
                cornwall_4_day,
                cornwall_4_end,
                cornwall_5_day,
                cornwall_5_end,
                cornwall_6_day,
                cornwall_6_end
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
                lansdowne_6_end,
                prescott_4_day,
                prescott_4_end,
                prescott_5_day,
                prescott_5_end,
                prescott_6_day,
                prescott_6_end,
                queenston_4_day,
                queenston_4_end,
                queenston_5_day,
                queenston_5_end,
                queenston_6_day,
                queenston_6_end,
                sarnia_4_day,
                sarnia_4_end,
                sarnia_5_day,
                sarnia_5_end,
                sarnia_6_day,
                sarnia_6_end,
                windsor_4_day,
                windsor_4_end,
                windsor_5_day,
                windsor_5_end,
                windsor_6_day,
                windsor_6_end,
                cornwall_4_day,
                cornwall_4_end,
                cornwall_5_day,
                cornwall_5_end,
                cornwall_6_day,
                cornwall_6_end
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
                    "hours": lansdowne_4_end[0]
                })
            elif(lansdowne_5_day == sorted_list[i]):
                    smallest.append({
                    "location": "Lansdowne",
                    "lat": 44.347,
                    "lon": -75.983,
                    "hour": 0,
                    "weekday": 1, # 1 being is weekday
                    "hours": lansdowne_5_day[0]
                })
            elif(lansdowne_5_end == sorted_list[i]):
                smallest.append({
                    "location": "Lansdowne",
                    "lat": 44.347,
                    "lon": -75.983,
                    "hour": 0,
                    "weekday": 0, # 1 being is weekday
                    "hours": lansdowne_5_end[0]
                })
            elif(lansdowne_6_day == sorted_list[i]):
                smallest.append({
                    "location": "Lansdowne",
                    "lat": 44.347,
                    "lon": -75.983,
                    "hour": 1,
                    "weekday": 1, # 1 being is weekday
                    "hours": lansdowne_6_day[0]
                })
            elif(lansdowne_6_end == sorted_list[i]):
                smallest.append({
                    "location": "Lansdowne",
                    "lat": 44.347,
                    "lon": -75.983,
                    "hour": 1,
                    "weekday": 0, # 1 being is weekday
                    "hours": lansdowne_6_end[0]
                })
            elif(prescott_4_day == sorted_list[i]):
                smallest.append({
                    "location": "Prescott",
                    "lat": 44.733,
                    "lon": -75.458,
                    "hour": 23,
                    "weekday": 1, # 1 being is weekday
                    "hours": prescott_4_day[0]
                })
            elif(prescott_4_end == sorted_list[i]):
                    smallest.append({
                    "location": "Prescott",
                    "lat": 44.733,
                    "lon": -75.458,
                    "hour": 23,
                    "weekday": 0, # 1 being is weekday
                    "hours": prescott_4_end[0]
                })
            elif(prescott_5_day == sorted_list[i]):
                    smallest.append({
                    "location": "Prescott",
                    "lat": 44.733,
                    "lon": -75.458,
                    "hour": 0,
                    "weekday": 1, # 1 being is weekday
                    "hours": prescott_5_day[0]
                })
            elif(prescott_5_end == sorted_list[i]):
                    smallest.append({
                    "location": "Prescott",
                    "lat": 44.733,
                    "lon": -75.458,
                    "hour": 0,
                    "weekday": 0, # 1 being is weekday
                    "hours": prescott_5_end[0]
                })
            elif(prescott_6_day == sorted_list[i]):
                    smallest.append({
                    "location": "Prescott",
                    "lat": 44.733,
                    "lon": -75.458,
                    "hour": 1,
                    "weekday": 1, # 1 being is weekday
                    "hours": prescott_6_day[0]
                })
            elif(prescott_6_end == sorted_list[i]):
                    smallest.append({
                    "location": "Prescott",
                    "lat": 44.733,
                    "lon": -75.458,
                    "hour": 1,
                    "weekday": 1, # 1 being is weekday
                    "hours": prescott_6_end[0]
            })
            elif(queenston_4_day == sorted_list[i]):
                smallest.append({
                    "location": "Queenston",
                    "lat": 43.153,
                    "lon": -79.044,
                    "hour": 23,
                    "weekday": 1, # 1 being is weekday
                    "hours": queenston_4_day[0]
                })
            elif(queenston_4_end == sorted_list[i]):
                smallest.append({
                    "location": "Queenston",
                    "lat": 43.153,
                    "lon": -79.044,
                    "hour": 23,
                    "weekday": 0, # 1 being is weekday
                    "hours": queenston_4_end[0]
                    })
            elif(queenston_5_day == sorted_list[i]):
                smallest.append({
                    "location": "Queenston",
                    "lat": 43.153,
                    "lon": -79.044,
                    "hour": 0,
                    "weekday": 1, # 1 being is weekday
                    "hours": queenston_5_day[0]
                    })
            elif(queenston_5_end == sorted_list[i]):
                smallest.append({
                    "location": "Queenston",
                    "lat": 43.153,
                    "lon": -79.044,
                    "hour": 0,
                    "weekday": 0, # 1 being is weekday
                    "hours": queenston_5_end[0]
                    })
            elif(queenston_6_day == sorted_list[i]):
                smallest.append({
                    "location": "Queenston",
                    "lat": 43.153,
                    "lon": -79.044,
                    "hour": 1,
                    "weekday": 1, # 1 being is weekday
                    "hours": queenston_6_day[0]
                    })
            elif(queenston_6_end == sorted_list[i]):
                smallest.append({
                "location": "Queenston",
                "lat": 43.153,
                "lon": -79.044,
                "hour": 1,
                "weekday": 0, # 1 being is weekday
                "hours": queenston_6_end[0]
                })
            elif(sarnia_4_day == sorted_list[i]):
                smallest.append({
                    "location": "Sarnia",
                    "lat": 42.999,
                    "lon": -82.423,
                    "hour": 23,
                    "weekday": 1, # 1 being is weekday
                    "hours": sarnia_4_day[0]
                })
            elif(sarnia_4_end == sorted_list[i]):
                smallest.append({
                    "location": "Sarnia",
                    "lat": 42.999,
                    "lon": -82.423,
                    "hour": 23,
                    "weekday": 0, # 1 being is weekday
                    "hours": sarnia_4_end[0]
                })
            elif(sarnia_5_day == sorted_list[i]):
                smallest.append({
                    "location": "Sarnia",
                    "lat": 42.999,
                    "lon": -82.423,
                    "hour": 0,
                    "weekday": 1, # 1 being is weekday
                    "hours": sarnia_5_day[0]
                })    
            elif(sarnia_5_end == sorted_list[i]):
                smallest.append({
                    "location": "Sarnia",
                    "lat": 42.999,
                    "lon": -82.423,
                    "hour": 0,
                    "weekday": 0, # 1 being is weekday
                    "hours": sarnia_5_end[0]
                })  
            elif(sarnia_6_day == sorted_list[i]):
                smallest.append({
                    "location": "Sarnia",
                    "lat": 42.999,
                    "lon": -82.423,
                    "hour": 1,
                    "weekday": 1, # 1 being is weekday
                    "hours": sarnia_6_day[0]
                })
            elif(sarnia_6_end == sorted_list[i]):
                smallest.append({
                    "location": "Sarnia",
                    "lat": 42.999,
                    "lon": -82.423,
                    "hour": 1,
                    "weekday": 0, # 1 being is weekday
                    "hours": sarnia_6_end[0]
                })
            elif(windsor_4_day == sorted_list[i]):
                smallest.append({
                    "location": "Windsor - Ambassador Bridge",
                    "lat": 42.312,
                    "lon": -83.074,
                    "hour": 23,
                    "weekday": 1, # 1 being is weekday
                    "hours": windsor_4_day[0]
                })
            elif(windsor_4_end == sorted_list[i]):
                smallest.append({
                    "location": "Windsor - Ambassador Bridge",
                    "lat": 42.312,
                    "lon": -83.074,
                    "hour": 23,
                    "weekday": 0, # 1 being is weekday
                    "hours": windsor_4_end[0]
                })
            elif(windsor_5_day == sorted_list[i]):
               smallest.append({
                    "location": "Windsor - Ambassador Bridge",
                    "lat": 42.312,
                    "lon": -83.074,
                    "hour": 0,
                    "weekday": 1, # 1 being is weekday
                    "hours": windsor_5_day[0]
                }) 
            elif(windsor_5_end == sorted_list[i]):
                   smallest.append({
                    "location": "Windsor - Ambassador Bridge",
                    "lat": 42.312,
                    "lon": -83.074,
                    "hour": 0,
                    "weekday": 0, # 1 being is weekday
                    "hours": windsor_5_end[0]
                }) 
            elif(windsor_6_day == sorted_list[i]):
                   smallest.append({
                    "location": "Windsor - Ambassador Bridge",
                    "lat": 42.312,
                    "lon": -83.074,
                    "hour": 1,
                    "weekday": 1, # 1 being is weekday
                    "hours": windsor_6_day[0]
                }) 
            elif(windsor_6_end == sorted_list[i]):
                   smallest.append({
                    "location": "Windsor - Ambassador Bridge",
                    "lat": 42.312,
                    "lon": -83.074,
                    "hour": 1,
                    "weekday": 0, # 1 being is weekday
                    "hours": windsor_6_end[0]
                }) 
            elif(cornwall_4_day == sorted_list[i]):
                smallest.append({
                    "location": "Cornwall",
                    "lat": 44.991,
                    "lon": -74.74,
                    "hour": 23,
                    "weekday": 1, # 1 being is weekday
                    "hours": cornwall_4_day[0]
                })
            elif(cornwall_4_end == sorted_list[i]):
                smallest.append({
                    "location": "Cornwall",
                    "lat": 44.991,
                    "lon": -74.74,
                    "hour": 23,
                    "weekday": 0, # 1 being is weekday
                    "hours": cornwall_4_end[0]
                })
            elif(cornwall_5_day == sorted_list[i]):
                    smallest.append({
                    "location": "Cornwall",
                    "lat": 44.991,
                    "lon": -74.74,
                    "hour": 0,
                    "weekday": 1, # 1 being is weekday
                    "hours": cornwall_5_day[0]
                })
            elif(cornwall_5_end == sorted_list[i]):
                    smallest.append({
                    "location": "Cornwall",
                    "lat": 44.991,
                    "lon": -74.74,
                    "hour": 0,
                    "weekday": 0, # 1 being is weekday
                    "hours": cornwall_5_end[0]
                })
            elif(cornwall_6_day == sorted_list[i]):
                    smallest.append({
                    "location": "Cornwall",
                    "lat": 44.991,
                    "lon": -74.74,
                    "hour": 1,
                    "weekday": 1, # 1 being is weekday
                    "hours": cornwall_6_day[0]
                })
            elif(cornwall_6_end == sorted_list[i]):
                    smallest.append({
                    "location": "Cornwall",
                    "lat": 44.991,
                    "lon": -74.74,
                    "hour": 1,
                    "weekday": 0, # 1 being is weekday
                    "hours": cornwall_6_end[0]
                })
        biggest = []
        sorted_list = sorted_list[::-1]
        for i in range(0, 1):
            if(fort_erie_4_day == sorted_list[i]):
                biggest.append({
                "location": "Fort Erie",
                "lat": 42.907,
                "lon": -78.906,
                "hour": 23,
                "weekday": 1, # 1 being is weekday
                "hours": fort_erie_4_day[0]
            })
            elif(fort_erie_4_end == sorted_list[i]):
                biggest.append({
                    "location": "Fort Erie",
                    "lat": 42.907,
                    "lon": -78.906,
                    "hour": 23,
                    "weekday": 0, # 1 being is weekday
                    "hours": fort_erie_4_end[0]
                })
            elif(fort_erie_5_day == sorted_list[i]):
                biggest.append({
                    "location": "Fort Erie",
                    "lat": 42.907,
                    "lon": -78.906,
                    "hour": 0,
                    "weekday": 1, # 1 being is weekday
                    "hours": fort_erie_5_day[0]
                })
            elif(fort_erie_5_end == sorted_list[i]):
                biggest.append({
                    "location": "Fort Erie",
                    "lat": 42.907,
                    "lon": -78.906,
                    "hour": 0,
                    "weekday": 0, # 1 being is weekday
                    "hours": fort_erie_5_end[0]
                })
            elif(fort_erie_6_day == sorted_list[i]):
                biggest.append({
                    "location": "Fort Erie",
                    "lat": 42.907,
                    "lon": -78.906,
                    "hour": 1,
                    "weekday": 1, # 1 being is weekday
                    "hours": fort_erie_5_end[0]
                })
            elif(fort_erie_6_end == sorted_list[i]):
                biggest.append({
                    "location": "Fort Erie",
                    "lat": 42.907,
                    "lon": -78.906,
                    "hour": 1,
                    "weekday": 1, # 1 being is weekday
                    "hours": fort_erie_5_end[0]
                })
            elif(lansdowne_4_day == sorted_list[i]):
                biggest.append({
                    "location": "Lansdowne",
                    "lat": 44.347,
                    "lon": -75.983,
                    "hour": 23,
                    "weekday": 1, # 1 being is weekday
                    "hours": lansdowne_4_day[0]
                })
            elif(lansdowne_4_end == sorted_list[i]):
                    biggest.append({
                    "location": "Lansdowne",
                    "lat": 44.347,
                    "lon": -75.983,
                    "hour": 23,
                    "weekday": 0, # 1 being is weekday
                    "hours": lansdowne_4_end[0]
                })
            elif(lansdowne_5_day == sorted_list[i]):
                    biggest.append({
                    "location": "Lansdowne",
                    "lat": 44.347,
                    "lon": -75.983,
                    "hour": 0,
                    "weekday": 1, # 1 being is weekday
                    "hours": lansdowne_5_day[0]
                })
            elif(lansdowne_5_end == sorted_list[i]):
                biggest.append({
                    "location": "Lansdowne",
                    "lat": 44.347,
                    "lon": -75.983,
                    "hour": 0,
                    "weekday": 0, # 1 being is weekday
                    "hours": lansdowne_5_end[0]
                })
            elif(lansdowne_6_day == sorted_list[i]):
                biggest.append({
                    "location": "Lansdowne",
                    "lat": 44.347,
                    "lon": -75.983,
                    "hour": 1,
                    "weekday": 1, # 1 being is weekday
                    "hours": lansdowne_6_day[0]
                })
            elif(lansdowne_6_end == sorted_list[i]):
               biggest.append({
                    "location": "Lansdowne",
                    "lat": 44.347,
                    "lon": -75.983,
                    "hour": 1,
                    "weekday": 0, # 1 being is weekday
                    "hours": lansdowne_6_end[0]
                })
            elif(prescott_4_day == sorted_list[i]):
                biggest.append({
                    "location": "Prescott",
                    "lat": 44.733,
                    "lon": -75.458,
                    "hour": 23,
                    "weekday": 1, # 1 being is weekday
                    "hours": prescott_4_day[0]
                })
            elif(prescott_4_end == sorted_list[i]):
                    biggest.append({
                    "location": "Prescott",
                    "lat": 44.733,
                    "lon": -75.458,
                    "hour": 23,
                    "weekday": 0, # 1 being is weekday
                    "hours": prescott_4_end[0]
                })
            elif(prescott_5_day == sorted_list[i]):
                    biggest.append({
                    "location": "Prescott",
                    "lat": 44.733,
                    "lon": -75.458,
                    "hour": 0,
                    "weekday": 1, # 1 being is weekday
                    "hours": prescott_5_day[0]
                })
            elif(prescott_5_end == sorted_list[i]):
                    biggest.append({
                    "location": "Prescott",
                    "lat": 44.733,
                    "lon": -75.458,
                    "hour": 0,
                    "weekday": 0, # 1 being is weekday
                    "hours": prescott_5_end[0]
                })
            elif(prescott_6_day == sorted_list[i]):
                    biggest.append({
                    "location": "Prescott",
                    "lat": 44.733,
                    "lon": -75.458,
                    "hour": 1,
                    "weekday": 1, # 1 being is weekday
                    "hours": prescott_6_day[0]
                })
            elif(prescott_6_end == sorted_list[i]):
                    biggest.append({
                    "location": "Prescott",
                    "lat": 44.733,
                    "lon": -75.458,
                    "hour": 1,
                    "weekday": 1, # 1 being is weekday
                    "hours": prescott_6_end[0]
            })
            elif(queenston_4_day == sorted_list[i]):
                biggest.append({
                    "location": "Queenston",
                    "lat": 43.153,
                    "lon": -79.044,
                    "hour": 23,
                    "weekday": 1, # 1 being is weekday
                    "hours": queenston_4_day[0]
                })
            elif(queenston_4_end == sorted_list[i]):
                biggest.append({
                    "location": "Queenston",
                    "lat": 43.153,
                    "lon": -79.044,
                    "hour": 23,
                    "weekday": 0, # 1 being is weekday
                    "hours": queenston_4_end[0]
                    })
            elif(queenston_5_day == sorted_list[i]):
                biggest.append({
                    "location": "Queenston",
                    "lat": 43.153,
                    "lon": -79.044,
                    "hour": 0,
                    "weekday": 1, # 1 being is weekday
                    "hours": queenston_5_day[0]
                    })
            elif(queenston_5_end == sorted_list[i]):
                biggest.append({
                    "location": "Queenston",
                    "lat": 43.153,
                    "lon": -79.044,
                    "hour": 0,
                    "weekday": 0, # 1 being is weekday
                    "hours": queenston_5_end[0]
                    })
            elif(queenston_6_day == sorted_list[i]):
                biggest.append({
                    "location": "Queenston",
                    "lat": 43.153,
                    "lon": -79.044,
                    "hour": 1,
                    "weekday": 1, # 1 being is weekday
                    "hours": queenston_6_day[0]
                    })
            elif(queenston_6_end == sorted_list[i]):
                biggest.append({
                "location": "Queenston",
                "lat": 43.153,
                "lon": -79.044,
                "hour": 1,
                "weekday": 0, # 1 being is weekday
                "hours": queenston_6_end[0]
                })
            elif(sarnia_4_day == sorted_list[i]):
                biggest.append({
                    "location": "Sarnia",
                    "lat": 42.999,
                    "lon": -82.423,
                    "hour": 23,
                    "weekday": 1, # 1 being is weekday
                    "hours": sarnia_4_day[0]
                })
            elif(sarnia_4_end == sorted_list[i]):
                biggest.append({
                    "location": "Sarnia",
                    "lat": 42.999,
                    "lon": -82.423,
                    "hour": 23,
                    "weekday": 0, # 1 being is weekday
                    "hours": sarnia_4_end[0]
                })
            elif(sarnia_5_day == sorted_list[i]):
                biggest.append({
                    "location": "Sarnia",
                    "lat": 42.999,
                    "lon": -82.423,
                    "hour": 0,
                    "weekday": 1, # 1 being is weekday
                    "hours": sarnia_5_day[0]
                })    
            elif(sarnia_5_end == sorted_list[i]):
                biggest.append({
                    "location": "Sarnia",
                    "lat": 42.999,
                    "lon": -82.423,
                    "hour": 0,
                    "weekday": 0, # 1 being is weekday
                    "hours": sarnia_5_end[0]
                })  
            elif(sarnia_6_day == sorted_list[i]):
                biggest.append({
                    "location": "Sarnia",
                    "lat": 42.999,
                    "lon": -82.423,
                    "hour": 1,
                    "weekday": 1, # 1 being is weekday
                    "hours": sarnia_6_day[0]
                })
            elif(sarnia_6_end == sorted_list[i]):
                biggest.append({
                    "location": "Sarnia",
                    "lat": 42.999,
                    "lon": -82.423,
                    "hour": 1,
                    "weekday": 0, # 1 being is weekday
                    "hours": sarnia_6_end[0]
                })
            elif(windsor_4_day == sorted_list[i]):
                biggest.append({
                    "location": "Windsor - Ambassador Bridge",
                    "lat": 42.312,
                    "lon": -83.074,
                    "hour": 23,
                    "weekday": 1, # 1 being is weekday
                    "hours": windsor_4_day[0]
                })
            elif(windsor_4_end == sorted_list[i]):
                biggest.append({
                    "location": "Windsor - Ambassador Bridge",
                    "lat": 42.312,
                    "lon": -83.074,
                    "hour": 23,
                    "weekday": 0, # 1 being is weekday
                    "hours": windsor_4_end[0]
                })
            elif(windsor_5_day == sorted_list[i]):
               biggest.append({
                    "location": "Windsor - Ambassador Bridge",
                    "lat": 42.312,
                    "lon": -83.074,
                    "hour": 0,
                    "weekday": 1, # 1 being is weekday
                    "hours": windsor_5_day[0]
                }) 
            elif(windsor_5_end == sorted_list[i]):
                   biggest.append({
                    "location": "Windsor - Ambassador Bridge",
                    "lat": 42.312,
                    "lon": -83.074,
                    "hour": 0,
                    "weekday": 0, # 1 being is weekday
                    "hours": windsor_5_end[0]
                }) 
            elif(windsor_6_day == sorted_list[i]):
                   biggest.append({
                    "location": "Windsor - Ambassador Bridge",
                    "lat": 42.312,
                    "lon": -83.074,
                    "hour": 1,
                    "weekday": 1, # 1 being is weekday
                    "hours": windsor_6_day[0]
                }) 
            elif(windsor_6_end == sorted_list[i]):
                   biggest.append({
                    "location": "Windsor - Ambassador Bridge",
                    "lat": 42.312,
                    "lon": -83.074,
                    "hour": 1,
                    "weekday": 0, # 1 being is weekday
                    "hours": windsor_6_end[0]
                }) 
            elif(cornwall_4_day == sorted_list[i]):
                biggest.append({
                    "location": "Cornwall",
                    "lat": 44.991,
                    "lon": -74.74,
                    "hour": 23,
                    "weekday": 1, # 1 being is weekday
                    "hours": cornwall_4_day[0]
                })
            elif(cornwall_4_end == sorted_list[i]):
                biggest.append({
                    "location": "Cornwall",
                    "lat": 44.991,
                    "lon": -74.74,
                    "hour": 23,
                    "weekday": 0, # 1 being is weekday
                    "hours": cornwall_4_end[0]
                })
            elif(cornwall_5_day == sorted_list[i]):
                    biggest.append({
                    "location": "Cornwall",
                    "lat": 44.991,
                    "lon": -74.74,
                    "hour": 0,
                    "weekday": 1, # 1 being is weekday
                    "hours": cornwall_5_day[0]
                })
            elif(cornwall_5_end == sorted_list[i]):
                    biggest.append({
                    "location": "Cornwall",
                    "lat": 44.991,
                    "lon": -74.74,
                    "hour": 0,
                    "weekday": 0, # 1 being is weekday
                    "hours": cornwall_5_end[0]
                })
            elif(cornwall_6_day == sorted_list[i]):
                    biggest.append({
                    "location": "Cornwall",
                    "lat": 44.991,
                    "lon": -74.74,
                    "hour": 1,
                    "weekday": 1, # 1 being is weekday
                    "hours": cornwall_6_day[0]
                })
            elif(cornwall_6_end == sorted_list[i]):
                    biggest.append({
                    "location": "Cornwall",
                    "lat": 44.991,
                    "lon": -74.74,
                    "hour": 1,
                    "weekday": 0, # 1 being is weekday
                    "hours": cornwall_6_end[0]
                })
        return Response({
            "query": smallest,
            "biggest": biggest
        })
