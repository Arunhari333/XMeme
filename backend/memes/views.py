from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Meme
from .serializers import MemeSerializer, PartialMemeSerializer
from rest_framework.views import APIView


# The API base point lists all accessible endpoints
@api_view(['GET'])
def api_base(request):
    api_urls = {
        'List & Create': '/memes',
        'Detail View': '/memes/<str:pk>/',
        'Update': '/memes/edit/<str:pk>',
        'Delete': '/memes/delete/<str:pk>',
    }
    return Response(api_urls)


# This view returns latest 100 memes and also allows users to post memes
@api_view(['GET', 'POST'])
def meme_list(request):
    # Functionality for posting memes
    if request.method == 'POST':
        serializer = MemeSerializer(data=request.data)
        for meme in Meme.objects.all():
            if meme.name == request.data["name"] and meme.caption == request.data["caption"] \
                    and meme.url == request.data["url"]:
                return Response({"Status code": "409"})
        if serializer.is_valid():
            serializer.save()
        else:
            return Response({"Status code": "422"})
        new = Meme.objects.all().order_by('-id')[0]
        return Response({"id": new.id})

    # Functionality for listing 100 latest memes
    queryset = Meme.objects.all().order_by('-id')[:100]
    serializer = MemeSerializer(queryset, many=True)
    return Response(serializer.data)


# This view returns data of a single meme based on the received id
@api_view(['GET'])
def meme_detail(request, pk):
    instance = Meme.objects.get(id=pk)
    serializer = MemeSerializer(instance, many=False)
    return Response(serializer.data)


# This view deletes a meme based on the received id
@api_view(['DELETE'])
def meme_delete(request, pk):
    meme = Meme.objects.get(id=pk)
    meme.delete()
    return Response("Task successfully deleted")


# This view helps update a meme based on the received id
class MemeUpdate(APIView):
    def get_object(self, pk):
        return Meme.objects.get(pk=pk)

    def patch(self, request, pk):
        meme = self.get_object(pk)
        serializer = PartialMemeSerializer(meme, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"Status code": "201"})
        return Response({"Status code": "400"})
