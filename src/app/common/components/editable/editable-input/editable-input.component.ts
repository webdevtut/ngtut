import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bwm-editable-input',
  templateUrl: './editable-input.component.html',
  styleUrls: ['./editable-input.component.scss']
})
export class EditableInputComponent implements OnInit {

  @Input() entity: any;

  @Input() field: string;

  isActiveInput: boolean = false;


  constructor() { }

  ngOnInit() {
  }

}
