# python3 manage.py shell to load data to django
# must place raw data in right folder
import pandas as pd
from darkspots.models import DarkSpots
import os

os.chdir('../')
df = pd.read_csv("data/cleaned_data/dark_cleaned.csv")

darkspots = [
    DarkSpots(
        id = df.at[row, 'id'],
        lat = df.at[row, 'lat'],
        lon = df.at[row, 'lon'],
        city = df.at[row, 'city'],
        avg_drops = df.at[row, 'avg_drops'],
        percent_affected = df.at[row, 'percent_affected']
    ) for row in range(0, 100)
]

DarkSpots.objects.bulk_create(darkspots)