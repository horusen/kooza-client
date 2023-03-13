import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-sidebar-alt',
  templateUrl: './modal-sidebar-alt.component.html',
  styleUrls: ['./modal-sidebar-alt.component.scss'],
})
export class ModalSidebarAltComponent implements OnInit {
  @Input() configuration: {
    name: string; // id du modal
    titre?: string; // Le titre affiché sur le header
    icone?: string; // L'icone sur le header
    position: string; // position left ou right
  } = {
    name: '',
    titre: '',
    position: '',
  };

  @Output() closed = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
}
