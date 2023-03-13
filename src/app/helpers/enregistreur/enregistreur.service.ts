import { Inject, Injectable } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import * as moment from 'moment';
import { Subject, BehaviorSubject } from 'rxjs';
import { Helper } from '../helper/helper';

@Injectable({
  providedIn: 'root',
})

// TODO Faire un refactoring de cette classe
export class EnregistreurService {
  private _file: File | undefined;
  private _urlFile: string | undefined;
  private _dureeEnregistrement: string | undefined;
  private _enregistreur: any;
  private _streamAudio: any;
  private _isRecording: boolean = false;
  private _intervalDureeEnregistrement: any;
  private _debutEnregistrement: any;

  public file$ = new Subject<File>();
  public urlFile$ = new Subject<string>();
  public dureeEnregistrement$ = new Subject<string>();
  public isRecording$ = new BehaviorSubject<boolean>(this._isRecording);

  constructor(
    protected helper: Helper,
    @Inject('string') public type?: string
  ) {}

  enregistrer() {
    if (this._enregistreur) {
      return;
    }

    this._resetTempsEnregistrement();
    this._isRecording = true;
    this.isRecording$.next(this._isRecording);

    // Activation des medias (micro, camera) du navigateur
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: this.type === 'video',
      })
      .then((stream) => {
        // Activation de l'enregistrement
        if (this.type == 'audio') {
          // Configuration de l'enregistreur audio
          this._enregistreur = new RecordRTC.StereoAudioRecorder(stream, {
            type: 'audio',
            mimeType: 'audio/webm',
            timeSlice: 1000,
          });

          this._streamAudio = stream;

          // Enregistrement
          this._enregistreur.record();
        } else if (this.type == 'video') {
          // Configration de l'enregistreur video
          this._enregistreur = new RecordRTC(stream, {
            type: 'video',
          });

          // Rendu en live
          let video: HTMLVideoElement | null =
            document.querySelector('#videoRecordingRR');
          if (video) {
            video.muted = true;
            video.volume = 0;
            video.srcObject = stream;
            this.helper.modal.show('videoRecording');
          }

          // Enregistrement
          this._enregistreur.startRecording();
          this._enregistreur.camera = stream;
        }

        this._getRecordingTime();
      });
  }

  stopEnregistrer() {
    if (this._enregistreur) {
      if (this.type == 'audio') {
        this._enregistreur.stop((blob: Blob) => {
          // if (this._dureeEnregistrement) {
          const mp3Name = 'voice.mp3';
          this._file = this._fromBlobToFile(blob, mp3Name, 'mp3');
          this.file$.next(this._file);
          this._stopMedia();
          // }
        });
      } else if (this.type == 'video') {
        this._enregistreur.stopRecording(() => {
          if (this._dureeEnregistrement) {
            const videoName = 'video.mp4';
            this._fromBlobToFile(
              this._enregistreur.getBlob(),
              videoName,
              'mp4'
            );
          }
        });
      }
    }
  }

  annulerEnregistrement() {
    this._stopMedia();
  }

  private _getRecordingTime() {
    // Marquage du debut de l'enregistrement
    this._debutEnregistrement = moment();

    // Intervale permettant mesurer la durée de l'enregistrement
    /* Chaque seconde l'interval emet une difference entre le moment actuel et le moment du debut de l'enregistrement */
    this._intervalDureeEnregistrement = setInterval(() => {
      const currentTime = moment();
      const diffTime = moment.duration(
        currentTime.diff(this._debutEnregistrement)
      );

      if (this.type == 'audio') {
        const time =
          this._dateToString(diffTime.minutes()) +
          ':' +
          this._dateToString(diffTime.seconds());

        this._dureeEnregistrement = time;

        this.dureeEnregistrement$.next(this._dureeEnregistrement);
      } else if (this.type == 'video') {
        // if (diffTime.seconds() === 1800) {
        //   this.stopRecordingVideo();
        // }
      } else {
        // this.stopMedia();
      }
    }, 1000);
  }

  private _stopMedia() {
    if (this._enregistreur) {
      this._isRecording = false;
      this.isRecording$.next(this._isRecording);

      clearInterval(this._intervalDureeEnregistrement);

      if (this.type == 'video') {
        this.helper.modal.toggle('videoRecording');
        this._enregistreur.camera.stop();
      }

      if (this._streamAudio) {
        let track = this._streamAudio.getTracks()[0]; // if only one media track
        // ...
        track.stop();
        // this.stream.getTracks().forEach(track => track.stop());
        this._streamAudio = null;
      }

      this._debutEnregistrement = null;
      this._enregistreur = null;
    }
  }

  private _dateToString(date: any) {
    let value = date;
    if (date < 10) {
      value = '0' + value;
    }

    return value;
  }

  private _fromBlobToFile(theBlob: Blob, fileName: string, extension: string) {
    return new File([theBlob], fileName, {
      type: extension,
      lastModified: Date.now(),
    });
  }

  private _resetTempsEnregistrement() {
    this._dureeEnregistrement = '00:00';
  }
}
