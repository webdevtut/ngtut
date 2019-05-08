import { Component,Input,OnInit, OnDestroy } from '@angular/core';
import {MapService} from './map.service';

import { Subject } from 'rxjs';


@Component({
  selector: 'bwm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy{

  @Input() location: string;

  @Input() locationSubject: Subject<any>;

  isPositionError: boolean = false;
  lat: number ;
  lng: number ;

  constructor(private mapService:MapService ) { }

  ngOnInit(){
    if(this.locationSubject){
      this.locationSubject.subscribe((location:string)=>{
        debugger;
        this.getLocation(location);
      });
    }
  }

ngOnDestroy(){
  if(this.locationSubject){
    this.locationSubject.unsubscribe();
      }
}

getLocation(location){
  this.mapService.getGeoLocation(location).subscribe(
    (coordinates)=>{
      this.lat  = coordinates.lat;
      this.lng  = coordinates.lng;
    }, () => {
      this.isPositionError = true;
    });
}

  mapReadyHandler(){
    this.getLocation(this.location);
  }
}
