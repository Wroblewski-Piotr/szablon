import {Component, Input, OnInit} from '@angular/core';
import {NavigationItemConfig} from "./navigation.item.config.type";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {

  @Input()
  items!: NavigationItemConfig[];

  constructor() { }

  ngOnInit() {}
}
