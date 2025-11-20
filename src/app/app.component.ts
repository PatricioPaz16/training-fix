import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { MatIconModule } from '@angular/material/icon'; 
import { MatSidenavModule} from '@angular/material/sidenav';
import { Button } from "primeng/button"; 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule, MatSidenavModule, RouterLinkWithHref, Button],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyecto-angular';
}
