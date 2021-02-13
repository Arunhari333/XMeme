# Generated by Django 3.0.7 on 2021-02-13 14:41

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('memes', '0002_auto_20210212_1603'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meme',
            name='url',
            field=models.CharField(max_length=1000, validators=[django.core.validators.RegexValidator(code='invalid_url', message='URL must be that of an image', regex='((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)')]),
        ),
    ]
