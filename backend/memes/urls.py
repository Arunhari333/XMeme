from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_base, name='api-base'),
    path('memes', views.meme_list, name='meme-list'),
    path('memes/<str:pk>', views.meme_detail, name='meme-detail'),
    path('memes/delete/<str:pk>', views.meme_delete, name='meme-delete'),
    path('memes/edit/<str:pk>', views.MemeUpdate.as_view(), name='meme-update'),
]
