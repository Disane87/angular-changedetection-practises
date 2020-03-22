import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css']
})
export class DialogsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigate(routeName: string){
    this.router.navigate([{ outlets: { dialog: ['onPush'] },  }])
  }

}