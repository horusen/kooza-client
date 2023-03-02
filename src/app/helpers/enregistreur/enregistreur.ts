import * as RecordRTC from "recordrtc";
import * as moment from "moment";
import { Helper } from "../services/helper";

export class Enregistreur {
  protected file: File;
  protected urlFile: string;
  private _enregistreur: any;
  private _streamAudio: any;
  protected dureeEnregistrement: string;
  private _intervalDureeEnregistrement: any;
  private _debutEnregistrement: any;
  protected isRecording: boolean = false;
  constructor(protected helper: Helper, public type?: string) {}

  enregistrer() {
    if (this._enregistreur) {
      return;
    }

    this._resetTempsEnregistrement();
    this.isRecording = true;

    // Activation des medias (micro, camera) du navigateur
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: this.type === "video",
      })
      .then((stream) => {
        // Activation de l'enregistrement
        if (this.type == "audio") {
          // Configuration de l'enregistreur audio
          this._enregistreur = new RecordRTC.StereoAudioRecorder(stream, {
            type: "audio",
            mimeType: "audio/webm",
            timeSlice: 1000,
          });

          this._streamAudio = stream;

          // Enregistrement
          this._enregistreur.record();
        } else if (this.type == "video") {
          // Configration de l'enregistreur video
          this._enregistreur = RecordRTC(stream, {
            type: "video",
          });

          // Rendu en live
          let video: HTMLVideoElement = document.querySelector(
            "#videoRecordingRR"
          );
          video.muted = true;
          video.volume = 0;
          video.srcObject = stream;
          this.helper.toggleModal("videoRecording");

          // Enregistrement
          this._enregistreur.startRecording();
          this._enregistreur.camera = stream;
        }

        this._getRecordingTime();
      });
  }

  stopEnregistrer() {
    if (this._enregistreur) {
      if (this.type == "audio") {
        this._enregistreur.stop((blob: Blob) => {
          // if (this.dureeEnregistrement) {
          const mp3Name = "voice.mp3";
          this.file = this._fromBlobToFile(blob, mp3Name, "mp3");
          this._stopMedia();
          // }
        });
      } else if (this.type == "video") {
        this._enregistreur.stopRecording(() => {
          if (this.dureeEnregistrement) {
            const videoName = "video.mp4";
            this._fromBlobToFile(
              this._enregistreur.getBlob(),
              videoName,
              "mp4"
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

      if (this.type == "audio") {
        const time =
          this._dateToString(diffTime.minutes()) +
          ":" +
          this._dateToString(diffTime.seconds());

        this.dureeEnregistrement = time;
        // if (diffTime.seconds() === 4200) {
        //   this.stopRecordingAudio();
        // }
      } else if (this.type == "video") {
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
      this.isRecording = false;
      clearInterval(this._intervalDureeEnregistrement);
      if (this.type == "video") {
        this.helper.toggleModal("videoRecording");
        this._enregistreur.camera.stop();
      }

      if (this._streamAudio) {
        var track = this._streamAudio.getTracks()[0]; // if only one media track
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
      value = "0" + value;
    }

    return value;
  }

  private _fromBlobToFile(theBlob: Blob, fileName: string, extension: string) {
    let file = new File([theBlob], fileName, {
      type: extension,
      lastModified: Date.now(),
    });

    this.urlFile = URL.createObjectURL(file);
    return file;
  }

  private _resetTempsEnregistrement() {
    this.dureeEnregistrement = "00:00";
  }
}
