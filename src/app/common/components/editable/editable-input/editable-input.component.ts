import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bwm-editable-input',
  templateUrl: './editable-input.component.html',
  styleUrls: ['./editable-input.component.scss']
})
export class EditableInputComponent implements OnInit {

  @Input() entity: any;

  @Input() set field(entityField: string) {
    this.entityField = entityField;
    this.setOriginValue();
  };

  @Input() className: boolean = false;

  @Output() entityUpdated = new EventEmitter();

  isActiveInput: boolean = false;

  public entityField : string;

  public originEntityValue: any;




  constructor() { }

  ngOnInit() {
  }

  updateEntity(){
    const entityValue = this.entity[this.entityField];
    if (entityValue !== this.originEntityValue){
      this.entityUpdated.emit({[this.entityField]: this.entity[this.entityField]});
      this.setOriginValue();
    }
    this.isActiveInput = false;
  }

  cancelUpdate(){
    this.isActiveInput = false;
    this.entity[this.entityField] = this.originEntityValue;
  }

  setOriginValue(){
    this.originEntityValue = this.entity[this.entityField];
  }

}
