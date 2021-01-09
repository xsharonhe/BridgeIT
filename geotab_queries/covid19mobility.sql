SELECT * FROM `bigquery-public-data.covid19_google_mobility.mobility_report`
WHERE country_region = "Canada" 
AND sub_region_1="Ontario" 
AND sub_region_2 IS NOT NULL 
AND transit_stations_percent_change_from_baseline IS NOT NULL 
AND workplaces_percent_change_from_baseline IS NOT NULL 
AND workplaces_percent_change_from_baseline IS NOT NULL 
AND residential_percent_change_from_baseline IS NOT NULL 
AND date >='2020-11-01'