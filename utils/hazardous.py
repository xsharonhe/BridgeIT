# python3 manage.py shell to load data to django
# must place raw data in right folder
import pandas as pd
from geotabs.models import Hazardous
import os

os.chdir('../')
df = pd.read_csv("data/cleaned_data/hazardous_cleaned.csv")

hazards = [
    Hazardous(
        id = df.at[row, 'id'],
        lat = df.at[row, 'lat'],
        lon = df.at[row, 'lon'],
        city = df.at[row, 'city'],
        severity_score = df.at[row, 'severity_score'],
        incidents_total = df.at[row, 'incidents_total'],
    ) for row in range(0, 100)
]

Hazardous.objects.bulk_create(hazards)