import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'clap-app-space-giver-used-with-fixed-elements',
  templateUrl: 'space-giver-used-with-fixed-elements.component.html',
})
export class SpaceGiverUsedWithFixedElementsComponent implements OnInit {
  @Input()
  height = 80;

  constructor() {}

  ngOnInit() {}
}
