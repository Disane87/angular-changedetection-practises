import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.css']
})
export class StarterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

    ngDoCheck(){
    // debugger;
    console.log(this['__proto__'].constructor.name, 'ngDoCheck', "Doing checks");
  }

}