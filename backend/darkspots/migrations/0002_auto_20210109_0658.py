# Generated by Django 3.0 on 2021-01-09 06:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('darkspots', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='darkspots',
            name='percent_affected',
            field=models.DecimalField(decimal_places=4, max_digits=10),
        ),
    ]
