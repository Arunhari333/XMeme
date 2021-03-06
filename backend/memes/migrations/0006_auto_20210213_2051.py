# Generated by Django 3.0.7 on 2021-02-13 15:21

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('memes', '0005_auto_20210213_2047'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meme',
            name='url',
            field=models.CharField(max_length=1000, validators=[django.core.validators.RegexValidator(code='invalid_url', message='URL must be that of an image', regex='(http|https)://')]),
        ),
    ]
