import { Component, OnInit } from '@angular/core';
import { ScrollspyService } from '../scrollspy.service';

@Component({
  selector: 'app-anchor-bar',
  templateUrl: './anchor-bar.component.html',
  styleUrls: ['./anchor-bar.component.css']
})
export class AnchorBarComponent implements OnInit {

  constructor(private srollSpyService: ScrollspyService) { }

  ngOnInit() {
  }

}