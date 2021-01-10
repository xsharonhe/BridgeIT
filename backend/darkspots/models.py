from django.db import models

# Create your models here.
class DarkSpots(models.Model):
    id=models.TextField(primary_key = True)
    lat = models.DecimalField(max_digits=10, decimal_places=4)
    lon = models.DecimalField(max_digits=10, decimal_places=4)
    city = models.CharField(max_length=50)
    avg_drops = models.DecimalField(max_digits=10, decimal_places=4)
    percent_affected = models.DecimalField(max_digits=10, decimal_places=4)
    
    class Meta:
        ordering = ('-percent_affected', '-avg_drops')
    
    def __str__(self):
        return self.id