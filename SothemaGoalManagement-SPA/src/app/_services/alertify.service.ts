import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  constructor() { }

  confirm(title, message: string, okCallback: () => any) {
    alertify.confirm(title, message, function (e) {
      if (e) {
        okCallback();
      } else { }
    }, function () { });
  }

  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }

  message(message: string) {
    alertify.message(message);
  }

  prompt(title: string, message: string, value: string, okCallBack: (value) => any) {
    alertify.prompt(title, message, '', function (e, v) {
      if (e) {
        okCallBack(v);
      } else { }
    }, function () { }).set('modal', false).set('resizable', true).set('type', 'text');
  }
}
