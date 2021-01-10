from django.db import models

# Create your models here.
class Hazardous(models.Model):
    id=models.TextField(primary_key = True)
    lat = models.DecimalField(max_digits=10, decimal_places=4)
    lon = models.DecimalField(max_digits=10, decimal_places=4)
    city = models.CharField(max_length=50)
    severity_score = models.DecimalField(max_digits=10, decimal_places=4)
    incidents_total = models.IntegerField()
    
    class Meta:
        ordering = ('-incidents_total', )
    
    def __str__(self):
        return self.id