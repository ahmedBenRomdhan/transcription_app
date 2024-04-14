// import { Component, OnInit, ElementRef } from '@angular/core';
// import { TranscriberService } from './transcriber.service';
// import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-transcriber',
//   templateUrl: './transcriber.component.html',
//   styleUrls: ['./transcriber.component.css']
// })
// export class TranscriberComponent implements OnInit {
//   transcribedTextReady: boolean = false;
//   videoUrl: string = '';
//   transcribedText:string;
//   caseSensitive: boolean = false;
//   searchTerm: string = '';

//   constructor(private transcriberService : TranscriberService) {

//   }

//   transcribe() {

//     this.transcriberService.transcribe({ url: this.videoUrl }).subscribe(
//       response => {
//         this.transcribedTextReady = true;
//         console.log('Transcription process initiated:', response);
//         this.transcribedText = response.transcription_result;
//       },
//       error => {
//         console.error('Error occurred:', error);

//       }
//     );
//   }


//   ngOnInit(): void {
//     this.transcribedText = "text";
//     console.log(this.transcribedText);

//   }



// }








import { Component } from '@angular/core';
import { TranscriberService } from './transcriber.service';

@Component({
  selector: 'app-transcriber',
  templateUrl: './transcriber.component.html',
  styleUrls: ['./transcriber.component.css']
})
export class TranscriberComponent {
  videoUrl: string = '';
  searchText: string = '';
  transcribedText: string = '';
  highlightedText:string;

  constructor(private transcriberService: TranscriberService) {}

  transcribeVideo() {
    if (this.videoUrl.trim() !== '') {
      this.transcriberService.transcribe({ url: this.videoUrl }).subscribe(
        (response: any) => {
          this.transcribedText = response.transcription_result;
          this.highlightText()
        },
        (error: any) => {
          console.error('Error transcribing video:', error);
        }
      );
    }
  }

  highlightText() {
    if (this.transcribedText && this.searchText) {
      const regex = new RegExp(this.searchText, 'gi');
      this.highlightedText = this.transcribedText.replace(
        regex,
        (match: string) => `<mark>${match}</mark>`
      );
    } else {
      this.highlightedText = this.transcribedText;
    }
  }
}
