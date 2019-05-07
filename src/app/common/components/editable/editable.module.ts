import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditableInputComponent } from './editable-input/editable-input.component';
import { EditableTextareaComponent } from './editable-textarea/editable-textarea.component';


@NgModule({
  imports:[
    CommonModule,
    FormsModule
  ],
  exports:[
    EditableInputComponent,
    EditableTextareaComponent
  ],
  declarations:[
    EditableInputComponent,
    EditableTextareaComponent
  ]
})

export class EditableModule{}
