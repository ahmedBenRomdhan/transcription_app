from django.urls import path
from . import views
from django.conf import settings

urlpatterns = [
path('', views.getData),
path('transcribe_video/', views.transcribe_video_view),
]