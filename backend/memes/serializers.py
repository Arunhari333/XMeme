from rest_framework import serializers
from .models import Meme


class MemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meme
        fields = '__all__'


class PartialMemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meme
        fields = ('caption', 'url')
