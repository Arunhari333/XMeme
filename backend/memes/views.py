from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Meme
from .serializers import MemeSerializer


@api_view(['GET', 'POST'])
def meme_list(request):
    if request.method == 'POST':
        serializer = MemeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        print(serializer.data)
        return Response(serializer.data)
    queryset = Meme.objects.all()
    serializer = MemeSerializer(queryset, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def meme_detail(request, pk):
    instance = Meme.objects.get(id=pk)
    serializer = MemeSerializer(instance, many=False)
    return Response(serializer.data)
