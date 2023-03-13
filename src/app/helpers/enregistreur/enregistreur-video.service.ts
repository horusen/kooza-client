import { Injectable } from "@angular/core";
import { Helper } from "../services/helper";
import { Enregistreur } from "./enregistreur";

@Injectable({
  providedIn: "root",
})
export class EnregistreurVideoService extends Enregistreur {
  constructor(private _helper: Helper) {
    super(_helper, "audio");
  }
}
