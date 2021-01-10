from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import pickle
import requests
import os
import os.path
from dotenv import load_dotenv

load_dotenv()
REACT_APP_API_KEY = str(os.getenv('REACT_APP_API_KEY'))
# from .serializers import HazardousSerializer
# from .models import Hazardous

# Create your views here.

# axios
#             .get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Ottawa,DC&destinations=FortErie,NY&key=${process.env.REACT_APP_API_KEY}`)
#             .then(res => {
#                 console.log(res)
#             })
#             .catch(err => {
#                 setError(true);
#             })
class MLView(APIView):
    def get(self, request, format=None):
        # try:
        params = request.query_params
        origins = params["origins"]
        url_f = f"https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins={origins}&destinations=FortErie,NY&key={REACT_APP_API_KEY}"
        res = requests.get(url_f)
        res = res.json()
        fort_erie = res["rows"][0]["elements"][0]["duration"]["text"]
        f = fort_erie.split(" ")
        if(f[0] == "mins"):
            fort_erie = float(f[0]) / 60
        else:
            fort_erie = float(f[0]) + (float(f[2]) / 60)
        url_l = f"https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins={origins}&destinations=Lansdowne,NY&key={REACT_APP_API_KEY}"
        res = requests.get(url_l)
        res = res.json()
        lansdowne = res["rows"][0]["elements"][0]["duration"]["text"]
        l = lansdowne.split(" ")
        if(l[1] == "mins"):
            lansdowne = float(l[0]) / 60
        else:
            lansdowne = float(l[0])+ (float(l[2]) / 60)
        url_p = f"https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins={origins}&destinations=Prescott,NY&key={REACT_APP_API_KEY}"
        res = requests.get(url_p)
        res = res.json()
        prescott = res["rows"][0]["elements"][0]["duration"]["text"]
        p = prescott.split(" ")
        if(p[1] == "mins"):
            prescott = float(p[0]) / 60
        else:
            prescott = float(p[0])+ (float(p[2]) / 60)
        url_q = f"https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins={origins}&destinations=Queenston,NY&key={REACT_APP_API_KEY}"
        res = requests.get(url_q)
        res = res.json()
        queenston = res["rows"][0]["elements"][0]["duration"]["text"]
        q = queenston.split(" ")
        if(q[1] == "mins"):
            queenston = float(q[0]) / 60
        else: 
            queenston = float(q[0])+ (float(q[2]) / 60)
        url_s = f"https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins={origins}&destinations=Sarnia,ON&key={REACT_APP_API_KEY}"
        res = requests.get(url_s)
        res = res.json()
        sarnia = res["rows"][0]["elements"][0]["duration"]["text"]
        s = sarnia.split(" ")
        if(s[1] == "mins"):
            sarnia = float(s[0]) / 60
        else: 
            sarnia = float(s[0])+ (float(s[2]) / 60)
        url_c = f"https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins={origins}&destinations=Cornwall,NY&key={REACT_APP_API_KEY}"
        res = requests.get(url_c)
        res = res.json()
        cornwall = res["rows"][0]["elements"][0]["duration"]["text"]
        c = cornwall.split(" ")
        if(c[1] == "mins"):
            cornwall = float(c[0]) / 60
        else:
            cornwall = float(c[0])+ (float(c[2]) / 60)
        url_w = f"https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins={origins}&destinations=WindsorAmbassadorBridge,ON&key={REACT_APP_API_KEY}"
        res = requests.get(url_w)
        res = res.json()
        windsor = res["rows"][0]["elements"][0]["duration"]["text"]
        w = windsor.split(" ")
        if(w[1] == "mins"):
            windsor = float(w[0]) / 60
        else:
            windsor = float(w[0]) + (float(w[2]) / 60)
        
        model = pickle.load(open('mobility/random_forest.pkl','rb'))
        fort_erie_4_day = model.predict([[83.98, 1, 0, 0, 0, 0, 0, 0, 1, 0]]) + fort_erie
        fort_erie_4_end = model.predict([[83.98, 1, 0, 0, 0, 0, 0, 1, 1, 0]]) + fort_erie
        fort_erie_5_day = model.predict([[83.98, 1, 0, 0, 0, 0, 0, 0, 0, 1]]) + fort_erie
        fort_erie_5_end = model.predict([[83.98, 1, 0, 0, 0, 0, 0, 1, 0, 1]]) + fort_erie
        fort_erie_6_day = model.predict([[83.98, 1, 0, 0, 0, 0, 0, 0, 0, 0]]) + fort_erie
        fort_erie_6_end = model.predict([[83.98, 1, 0, 0, 0, 0, 0, 1, 0, 0]]) + fort_erie
        lansdowne_4_day = model.predict([[83.98, 0, 1, 0, 0, 0, 0, 0, 1, 0]]) + lansdowne
        lansdowne_4_end = model.predict([[83.98, 0, 1, 0, 0, 0, 0, 1, 1, 0]]) + lansdowne
        lansdowne_5_day = model.predict([[83.98, 0, 1, 0, 0, 0, 0, 0, 0, 1]]) + lansdowne
        lansdowne_5_end = model.predict([[83.98, 0, 1, 0, 0, 0, 0, 1, 0, 1]]) + lansdowne
        lansdowne_6_day = model.predict([[83.98, 0, 1, 0, 0, 0, 0, 0, 0, 0]]) + lansdowne
        lansdowne_6_end = model.predict([[83.98, 0, 1, 0, 0, 0, 0, 1, 0, 0]]) + lansdowne
        prescott_4_day = model.predict([[83.98, 0, 0, 1, 0, 0, 0, 0, 1, 0]]) + prescott
        prescott_4_end = model.predict([[83.98, 0, 0, 1, 0, 0, 0, 1, 1, 0]]) + prescott
        prescott_5_day = model.predict([[83.98, 0, 0, 1, 0, 0, 0, 0, 0, 1]]) + prescott
        prescott_5_end = model.predict([[83.98, 0, 0, 1, 0, 0, 0, 1, 0, 1]]) + prescott
        prescott_6_day = model.predict([[83.98, 0, 0, 1, 0, 0, 0, 0, 0, 0]]) + prescott
        prescott_6_end = model.predict([[83.98, 0, 0, 1, 0, 0, 0, 1, 0, 0]]) + prescott
        queenston_4_day = model.predict([[83.98, 0, 0, 0, 1, 0, 0, 0, 1, 0]]) + queenston
        queenston_4_end = model.predict([[83.98, 0, 0, 0, 1, 0, 0, 1, 1, 0]]) + queenston
        queenston_5_day = model.predict([[83.98, 0, 0, 0, 1, 0, 0, 0, 0, 1]]) + queenston
        queenston_5_end = model.predict([[83.98, 0, 0, 0, 1, 0, 0, 1, 0, 1]]) + queenston
        queenston_6_day = model.predict([[83.98, 0, 0, 0, 1, 0, 0, 0, 0, 0]]) + queenston
        queenston_6_end = model.predict([[83.98, 0, 0, 0, 1, 0, 0, 1, 0, 0]]) + queenston
        sarnia_4_day = model.predict([[83.98, 0, 0, 0, 0, 1, 0, 0, 1, 0]]) + sarnia
        sarnia_4_end = model.predict([[83.98, 0, 0, 0, 0, 1, 0, 1, 1, 0]]) + sarnia
        sarnia_5_day = model.predict([[83.98, 0, 0, 0, 0, 1, 0, 0, 0, 1]]) + sarnia
        sarnia_5_end = model.predict([[83.98, 0, 0, 0, 0, 1, 0, 1, 0, 1]]) + sarnia
        sarnia_6_day = model.predict([[83.98, 0, 0, 0, 0, 1, 0, 0, 0, 0]]) + sarnia
        sarnia_6_end = model.predict([[83.98, 0, 0, 0, 0, 1, 0, 1, 0, 0]]) + sarnia
        windsor_4_day = model.predict([[83.98, 0, 0, 0, 0, 0, 1, 0, 1, 0]]) + windsor
        windsor_4_end = model.predict([[83.98, 0, 0, 0, 0, 0, 1, 1, 1, 0]]) + windsor
        windsor_5_day = model.predict([[83.98, 0, 0, 0, 0, 0, 1, 0, 0, 1]]) + windsor
        windsor_5_end = model.predict([[83.98, 0, 0, 0, 0, 0, 1, 1, 0, 1]]) + windsor
        windsor_6_day = model.predict([[83.98, 0, 0, 0, 0, 0, 1, 0, 0, 0]]) + windsor
        windsor_6_end = model.predict([[83.98, 0, 0, 0, 0, 0, 1, 1, 0, 0]]) + windsor
        cornwall_4_day = model.predict([[83.98, 0, 0, 0, 0, 0, 0, 0, 1, 0]]) + cornwall
        cornwall_4_end = model.predict([[83.98, 0, 0, 0, 0, 0, 0, 1, 1, 0]]) + cornwall
        cornwall_5_day = model.predict([[83.98, 0, 0, 0, 0, 0, 0, 0, 0, 1]]) + cornwall
        cornwall_5_end = model.predict([[83.98, 0, 0, 0, 0, 0, 0, 1, 0, 1]]) + cornwall
        cornwall_6_day = model.predict([[83.98, 0, 0, 0, 0, 0, 0, 0, 0, 0]]) + cornwall
        cornwall_6_end = model.predict([[83.98, 0, 0, 0, 0, 0, 0, 1, 0, 0]]) + cornwall

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
            biggest = windsor_6_end + 5
        return Response({
            "smallest": smallest,
            "biggest": biggest
        })
