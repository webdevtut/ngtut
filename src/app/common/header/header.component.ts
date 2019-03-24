import {Component} from '@angular/core';
import {AuthService} from '../../auth/shared/auth.service';  // Added for hiding or showing login / register buttons in HTML

@Component({
  selector: "bwm-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})

export class HeaderComponent {
  constructor (private auth: AuthService) {}   // In order to use auth service here we have to export it privately in constructor
}
