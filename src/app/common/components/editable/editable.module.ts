import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditableInputComponent } from './editable-input/editable-input.component';


@NgModule({
  imports:[
    CommonModule,
    FormsModule
  ],
  exports:[
    EditableInputComponent
  ],
  declarations:[
    EditableInputComponent
  ]
})

export class EditableModule{}
