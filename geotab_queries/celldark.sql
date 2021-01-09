SELECT 
	Geohash,
    GeohashBounds,
    Latitude, 
    Longitude,
    City,
    AvgDropsPerMonth,
    PercentAffected
FROM geotab-public-intelligence.UrbanInfrastructure.CellCoverageDarkSpots
WHERE COUNTRY = "Canada" AND STATE = "Ontario" 
ORDER BY PERCENTAFFECTED DESC 
LIMIT 100