from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
# Create your views here.
from rest_framework import status
import argparse
from pytube import YouTube
import os
import requests
from time import sleep
from .scripts.transcriber import transcribe_video


# Create your views here.
@api_view(['GET'])
def getData(request):
    return Response("hi")

@api_view(['POST'])
def transcribe_video_view(request, format=None):
        print("Request data:", request.data)  # Debugging statement
        # Extract video URL from POST data
        video_url = request.data.get('url')

        # Run transcription script
        transcription_result = transcribe_video(video_url)
        print("Transcription result:", transcription_result)
        # Example response
        response_data = {
            'message': 'Transcription process initiated for video URL: {}'.format(video_url),
            'transcription_result': transcription_result
        }
        return Response(response_data, status=status.HTTP_200_OK)