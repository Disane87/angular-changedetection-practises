import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {

  constructor(private router: Router, public logService: LoggerService, private cd: ChangeDetectorRef,  private activatedRoute: ActivatedRoute) { }

  public routes: Array<Route> = this.router.config.filter(route => route.outlet == undefined); 
  @Input() fullscreen = false;

  public searchText: string;

  ngOnInit() {

  }

  toggleFullscreen(){
    this.fullscreen = !this.fullscreen;
     this.router.navigate(
      [],
      {
          relativeTo: this.activatedRoute,
          queryParams: { fullscreen: this.fullscreen },
          queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
    console.log(this['__proto__'].constructor.name, 'toggleFullscreen', `Toggling fullscreen to ${this.fullscreen}`);
    // this.cd.markForCheck();
  }

  ngDoCheck(){
  // debugger;
    console.log(this['__proto__'].constructor.name, 'ngDoCheck', "Doing checks");
  }

}