# Generated by Django 3.1.5 on 2021-01-09 19:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('items', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='date_arriving',
            field=models.DateField(blank=True, default='2021-01-20'),
        ),
        migrations.AddField(
            model_name='item',
            name='date_shipping',
            field=models.DateField(blank=True, default='2021-01-20'),
        ),
        migrations.AlterField(
            model_name='item',
            name='donor',
            field=models.CharField(default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='item',
            name='duration',
            field=models.DecimalField(decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AlterField(
            model_name='item',
            name='expiry',
            field=models.DateField(default=''),
        ),
        migrations.AlterField(
            model_name='item',
            name='is_weekday',
            field=models.BooleanField(null=True),
        ),
        migrations.AlterField(
            model_name='item',
            name='location',
            field=models.CharField(default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='item',
            name='receiver',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='item',
            name='time',
            field=models.IntegerField(null=True),
        ),
    ]
