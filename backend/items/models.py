from django.db import models

# Create your models here.
class Item(models.Model):
    id = models.TextField(primary_key = True)
    name = models.CharField(max_length=50)
    quantity = models.CharField(max_length=3)
    expiry = models.DateField(blank=True)
    is_matched = models.BooleanField(default=False)
    is_donation = models.BooleanField()
    location = models.CharField(max_length=50)
    is_weekday = models.BooleanField()
    time = models.IntegerField()
    duration = models.DecimalField(max_digits=5, decimal_places=2)
    donor = models.CharField(max_length=50)
    receiver = models.CharField(max_length=50)

    def __str__(self):
        return self.name