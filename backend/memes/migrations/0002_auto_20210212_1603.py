# Generated by Django 3.0.7 on 2021-02-12 10:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('memes', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='meme',
            old_name='creator',
            new_name='name',
        ),
    ]
