import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  hiddenToast:boolean=true;

  constructor(private messageService: MessageService) { }

  private showToast(severity:string,title:string,content:string)
  {
    this.hiddenToast=false;
    this.messageService.add({
        severity: severity,
        summary: title,
        detail: content,
         });
  }

  HandleCloseEvent($event:any)
  {
    console.log($event);
    setTimeout(() => {
      this.hiddenToast=true;
    }, 5000);

  }

  showWarnToast(title:string,content:string)
  {
    this.showToast('warn',title,content);

  }
  showErrorToast(title:string,content:string)
  {

    this.showToast('error',title,content);
  }
  showInfoToast(title:string,content:string)
  {
    this.showToast('info',title,content);
  }
  showSuccessToast(title:string,content:string)
  {
    this.showToast('success',title,content);
  }
}
