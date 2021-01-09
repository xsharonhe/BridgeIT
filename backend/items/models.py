from django.db import models

# Create your models here.
class Item(models.Model):
    id = models.TextField(primary_key = True)
    name = models.CharField(max_length=50)
    quantity = models.CharField(max_length=3)
    expiry = models.DateField(default='')
    is_matched = models.BooleanField(default=False)
    is_donation = models.BooleanField()
    location = models.CharField(max_length=50, default='')
    is_weekday = models.BooleanField(null=True)
    time = models.IntegerField(null=True)
    duration = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    donor = models.CharField(max_length=50, default='')
    receiver = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.name