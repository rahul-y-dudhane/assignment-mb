import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  showSuccessMessage(){
    this.show('Done !', { classname: 'bg-success text-light' });
  }

  showErrorMessage(msg: string){
    this.show(msg, { classname: 'bg-danger text-light' });
  }
}