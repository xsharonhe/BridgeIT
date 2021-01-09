SELECT 
	*
FROM geotab-public-intelligence.COVIDMobilityImpact.BorderWaitTimes
WHERE TRIPDIRECTION = "US to Canada" AND ISO_3166_2="CA-ON"
LIMIT 2000