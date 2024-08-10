import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.css'
})
export class VerificationComponent {

  constructor(private router:Router)
  {
    
  }


  goToLogin()
  {
    this.router.navigateByUrl("pages/login");
  }

}
