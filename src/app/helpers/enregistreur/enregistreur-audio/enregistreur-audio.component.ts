import { Enregistreur } from "./../enregistreur";
import { Component, OnInit } from "@angular/core";
import { HelperService } from "../../service/helper.service";
import { ReactionBrainstormingService } from "src/app/Facade/service/gravure/brainstorming/reaction-brainstorming.service";

@Component({
  selector: "app-enregistreur-audio",
  templateUrl: "./enregistreur-audio.component.html",
  styleUrls: ["./enregistreur-audio.component.css"],
})
export class EnregistreurAudioComponent extends Enregistreur implements OnInit {
  constructor(
    private _helper: HelperService,
    private _reactionService: ReactionBrainstormingService
  ) {
    super(_helper, "audio");
  }

  ngOnInit() {
  }
}
