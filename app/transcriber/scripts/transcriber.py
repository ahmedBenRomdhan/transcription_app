# transcriber.py

import argparse
from pytube import YouTube
import os
import requests
from time import sleep

def transcribe_video(video_url):
    # Parse argument
    parser = argparse.ArgumentParser(prog='transcriber')
    parser.add_argument('-i', help='Enter the URL of YouTube video')
    args = parser.parse_args(['-i', video_url])

    # 1. Read API from text file
    api_key = '86a6a06804804b86901e7127be3e1733'

    print('1. API is read ...')

    # 2. Retrieving audio file from YouTube video
    video = YouTube(args.i)
    yt = video.streams.get_audio_only()
    yt.download()

    current_dir = os.getcwd()

    for file in os.listdir(current_dir):
        if file.endswith(".mp4"):
            mp4_file = os.path.join(current_dir, file)

    print('2. Audio file has been retrieved from YouTube video')

    # 3. Upload YouTube audio file to AssemblyAI
    filename = mp4_file

    def read_file(filename, chunk_size=5242880):
        with open(filename, 'rb') as _file:
            while True:
                data = _file.read(chunk_size)
                if not data:
                    break
                yield data

    headers = {'authorization': api_key}
    response = requests.post('https://api.assemblyai.com/v2/upload',
                             headers=headers,
                             data=read_file(filename))

    audio_url = response.json()['upload_url']

    print('3. YouTube audio file has been uploaded to AssemblyAI')

    # 4. Transcribe uploaded audio file
    endpoint = "https://api.assemblyai.com/v2/transcript"
    json = {"audio_url": audio_url}
    headers = {"authorization": api_key, "content-type": "application/json"}
    transcript_input_response = requests.post(endpoint, json=json, headers=headers)

    print('4. Transcribing uploaded file')

    # 5. Extract transcript ID
    transcript_id = transcript_input_response.json()["id"]
    print('5. Extract transcript ID')

    # 6. Retrieve transcription results
    endpoint = f"https://api.assemblyai.com/v2/transcript/{transcript_id}"
    transcript_output_response = requests.get(endpoint, headers=headers)
    print('6. Retrieve transcription results')

    # Check if transcription is complete
    while transcript_output_response.json()['status'] != 'completed':
        sleep(5)
        print('Transcription is processing ...')
        transcript_output_response = requests.get(endpoint, headers=headers)

    os.remove(filename)
    print("7. Audio file deleted successfully.")

    # 7. Return transcribed text
    return transcript_output_response.json()["text"]

    # 8. Delete the audio file
    