import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [ToastModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {

  constructor(public _toast:ToastService)
  {

  }

    
  showToast()
  {
    this._toast.hiddenToast=false;
    this._toast.showSuccessToast("titulo","contenido");
    setTimeout(() => {
      this._toast.hiddenToast=true;
    }, 3000);
  
  }


}
