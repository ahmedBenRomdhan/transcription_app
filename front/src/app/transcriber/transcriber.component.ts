import { Component, OnInit } from '@angular/core';
import { TranscriberService } from './transcriber.service';

@Component({
  selector: 'app-transcriber',
  templateUrl: './transcriber.component.html',
  styleUrls: ['./transcriber.component.css']
})
export class TranscriberComponent implements OnInit {
  transcribedTextReady: boolean =false;

  videoUrl: string = '';
  transcribedText: string = '';

  constructor(private transcriberService : TranscriberService) { }

  transcribe() {
    this.transcribedText = '';
    this.transcriberService.transcribe({ url: this.videoUrl }).subscribe(
      response => {
        this.transcribedTextReady = true;
        console.log('Transcription process initiated:', response);
        this.transcribedText = response.transcription_result;
      },
      error => {
        console.error('Error occurred:', error);

      }
    );
  }

  ngOnInit(): void {
  }



}
