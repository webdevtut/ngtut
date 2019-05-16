import { Component, OnInit } from '@angular/core';
import {EditableComponent} from '../editable-component';


@Component({
  selector: 'bwm-editable-image',
  templateUrl: './editable-image.component.html',
  styleUrls: ['./editable-image.component.scss']
})
export class EditableImageComponent extends EditableComponent{

handleImageUpload(){

}

handleImageError(){
  
}

}
