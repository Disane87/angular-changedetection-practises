import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationError, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private cd: ChangeDetectorRef) { }

  public dialogActive = false;
  public outletName = 'dialog';
  public fullscreen = false;

  @ViewChild('dialogOutlet', { static: true })  dialogOutlet: RouterOutlet;

  ngOnInit() {
    
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){     
        this.dialogActive = this.dialogOutlet.isActivated;
        this.cd.detectChanges();

      }

      if(event instanceof NavigationError){
        const error = event as NavigationError;
        console.error(this['__proto__'].constructor.name, 'ngOnInit', error.error);
      }
    })
    
  }

  closeDialog(){
    this.router.navigate([{ outlets: { dialog: null } }])
  }

  activated(event){
    debugger;
  }

}