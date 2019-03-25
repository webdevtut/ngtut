import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { CommonModule} from '@angular/common';

import { MapComponent } from './map.component';
import { CamelizePipe } from 'ngx-pipes';
import { MapService } from './map.service';

@NgModule({
  declarations: [
    MapComponent
  ],
  exports: [
    MapComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
   apiKey: 'AIzaSyDZyO8Chbvq4iOPd0Ud6E9FgXoR7Yc_rqk'
 }),
   CommonModule
  ],
  providers: [
    MapService,
    CamelizePipe
  ],
})
export class MapModule { }
