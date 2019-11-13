import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-prompt-modal',
  templateUrl: './prompt-modal.component.html',
  styleUrls: ['./prompt-modal.component.css']
})
export class PromptModalComponent implements OnInit {
  @Output() sendPromptValueEvent = new EventEmitter();
  promptValue: string;
  promptTitle: string;
  promptMessage: string;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {

  }

  sendPromptValue() {
    console.log('promptValue:', this.promptValue);
    if (this.promptValue !== '') {
      this.sendPromptValueEvent.emit(this.promptValue);
    }
    this.bsModalRef.hide();
  }
}
