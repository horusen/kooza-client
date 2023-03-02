import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"],
})
export class ModalComponent implements OnInit {
  @Input() configuration: {
    name: string; // id du modal
    titre?: string; // Le titre affiché sur le header
    icone?: string; // L'icone sur le header
    taille?: string; // taille du modal (sm, md, lg)
    minWidth?: string; // taille du modal (sm, md, lg)
    minHeight?: string; // taille du modal (sm, md, lg)
  } = {
    name: "",
    titre: "",
  };

  @Output() closed = new EventEmitter();
  constructor() {}

  ngOnInit() {}
}
