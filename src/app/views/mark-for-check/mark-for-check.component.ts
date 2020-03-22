import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-mark-for-check',
  templateUrl: './mark-for-check.component.html',
  styleUrls: ['./mark-for-check.component.css']
})
export class MarkForCheckComponent implements OnInit {

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  markForCheck() {
    this.cd.markForCheck();
  }

   ngDoCheck(){
    // debugger;
    console.log(this['__proto__'].constructor.name, 'ngDoCheck', "Doing checks");
  }

}