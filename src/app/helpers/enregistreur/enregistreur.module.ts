import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EnregistreurAudioComponent } from "./enregistreur-audio/enregistreur-audio.component";

@NgModule({
  declarations: [EnregistreurAudioComponent],
  imports: [CommonModule],
  exports: [EnregistreurAudioComponent],
})
export class EnregistreurModule {}
