from django.db import models


class Meme(models.Model):
    name = models.CharField(max_length=100)
    caption = models.CharField(max_length=500)
    url = models.CharField(max_length=1000)

    def __str__(self):
        return self.caption
