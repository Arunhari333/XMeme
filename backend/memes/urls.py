from django.urls import path
from . import views

urlpatterns = [
    path('', views.meme_list, name='meme-list'),
    path('/<str:pk>', views.meme_detail, name='meme-detail'),
]
