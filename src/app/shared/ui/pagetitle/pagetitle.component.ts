import { Component, OnInit, Input } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-pagetitle',
  templateUrl: './pagetitle.component.html',
  styleUrls: ['./pagetitle.component.scss']
})
export class PagetitleComponent implements OnInit {

  @Input() breadcrumbItems;
  @Input() title: string;
  rtl = "";

  constructor(private location: Location) { }

  ngOnInit(): void {
    if (localStorage.getItem("lang") === 'ar') {
      this.rtl = 'rtl';
    }
  }

  goBack() {
    this.location.back();
  }

}
