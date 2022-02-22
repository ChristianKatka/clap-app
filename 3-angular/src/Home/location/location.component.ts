import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'clap-app-location',
  templateUrl: 'location.component.html',
  styleUrls: ['location.component.scss'],
})
export class LocationComponent {
  @Output()
  openChangeLocationBottomSheet = new EventEmitter();

  @ViewChild('navbar') navbar!: any;
  @HostListener('window:scroll', ['$event']) onWindowScroll(e: any) {
    this.hideTopNavigationBarOnScroll();
  }
  prevScrollpos = window.pageYOffset;

  hideTopNavigationBarOnScroll() {
    const currentScrollPos = window.pageYOffset;
    if (this.prevScrollpos > currentScrollPos) {
      this.navbar.nativeElement.style.top = '0';
    } else {
      this.navbar.nativeElement.style.top = '-80px';
    }
    this.prevScrollpos = currentScrollPos;
  }
}
