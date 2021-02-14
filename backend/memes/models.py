from django.db import models
from django.core.validators import RegexValidator


# Model to store memes
class Meme(models.Model):
    name = models.CharField(max_length=100)
    caption = models.CharField(max_length=500)
    # Basic URL validation is added in backend considering request from sources other than frontend
    url = models.CharField(max_length=1000, validators=[
        RegexValidator(
            regex='(http|https)://',
            message='URL must be that of an image',
            code='invalid_url'
        ),
    ])

    def __str__(self):
        return self.caption
