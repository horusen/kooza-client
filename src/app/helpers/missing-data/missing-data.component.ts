import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-missing-data',
  templateUrl: './missing-data.component.html',
  styleUrls: ['./missing-data.component.css'],
})
export class MissingDataComponent implements OnInit {
  @Input() message!: string;
  @Input() subMessage: string;
  constructor() {}

  ngOnInit() {}
}
