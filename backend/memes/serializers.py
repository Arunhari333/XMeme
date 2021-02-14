from rest_framework import serializers
from .models import Meme


# Serializes the data
class MemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meme
        fields = '__all__'


# Serializes the partial data to receive PATCH request
class PartialMemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meme
        fields = ('caption', 'url')
