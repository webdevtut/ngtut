import {Component} from '@angular/core';
import {AuthService} from '../../auth/shared/auth.service';  // Added for hiding or showing login / register buttons in HTML
import {Router} from '@angular/router';

@Component({
  selector: "bwm-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})

export class HeaderComponent {
  constructor (private auth: AuthService,
    private router : Router) {}

  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
