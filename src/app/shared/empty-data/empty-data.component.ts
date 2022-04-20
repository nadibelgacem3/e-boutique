import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-data',
  templateUrl: './empty-data.component.html',
  styleUrls: ['./empty-data.component.scss']
})
export class EmptyDataComponent implements OnInit {
  img2 = '../../../assets/images/logos/empty.png';
  constructor() { }

  ngOnInit(): void {
  }

}
