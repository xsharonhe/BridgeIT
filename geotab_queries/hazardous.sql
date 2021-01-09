SELECT 
	*
FROM geotab-public-intelligence.UrbanInfrastructure.HazardousDrivingAreas
WHERE ISO_3166_2="CA-ON" 
ORDER BY INCIDENTSTOTAL DESC, SEVERITYSCORE ASC
LIMIT 100