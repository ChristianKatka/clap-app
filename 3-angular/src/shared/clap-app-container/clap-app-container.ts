import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'clap-app-container',
  templateUrl: 'clap-app-container.html',
})
export class ClapAppContainer {
  @Input()
  width = '100%';
}
