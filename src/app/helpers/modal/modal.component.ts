import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input() configuration: {
    name: string; // id du modal
    title?: string; // Le titre affiché sur le header
    icon?: string; // L'icone sur le header
    taille?: string; // taille du modal (sm, md, lg)
    minWidth?: string; // taille du modal (sm, md, lg)
    minHeight?: string; // taille du modal (sm, md, lg)
  } = {
    name: '',
    title: '',
  };

  @Output() closed = new EventEmitter();
  constructor() {}

  ngOnInit() {}
}
