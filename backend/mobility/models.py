from django.db import models

# Create your models here.
# from django.db import models

# # Create your models here.
# class Mobility(models.Model):
#     id=model.TextField(primary_key = True)
#     l
# class DarkSpots(models.Model):
#     id=models.TextField(primary_key = True)
#     lat = models.DecimalField(max_digits=10, decimal_places=4)
#     lon = models.DecimalField(max_digits=10, decimal_places=4)
#     city = models.CharField(max_length=50)
#     avg_drops = models.DecimalField(max_digits=10, decimal_places=4)
#     percent_affected = models.IntegerField()
    
#     class Meta:
#         ordering = ('-percent_affected', '-avg_drops')
    
#     def __str__(self):
#         return self.id