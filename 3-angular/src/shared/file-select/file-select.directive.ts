import {
  Directive,
  EventEmitter,
  ElementRef,
  Output,
  HostListener,
} from '@angular/core';

@Directive({ selector: '[appFileSelect]' })
export class FileSelectDirective {
  @Output()
  fileSelect: EventEmitter<File> = new EventEmitter<File>();

  protected element: ElementRef;

  public constructor(element: ElementRef) {
    this.element = element;
  }

  @HostListener('change')
  public onChange(): any {
    const files = this.element.nativeElement.files;
    this.fileSelect.emit(files);
  }
}
