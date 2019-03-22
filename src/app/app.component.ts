import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  componentTitle ='Name of the component will appear';
  clickHandler(){
    alert("It is Going Here!!!!!");
    console.log("This is Not a clickBait");
  }
}
