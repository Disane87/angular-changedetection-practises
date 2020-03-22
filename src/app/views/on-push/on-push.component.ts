import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  SimpleChanges,
  
} from "@angular/core";


import { timer, interval, Subscription } from 'rxjs';

import { LoggerService } from '../../logger.service';

@Component({
  selector: "app-on-push",
  templateUrl: "./on-push.component.html",
  styleUrls: ["./on-push.component.css"],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnPushComponent implements OnInit {
  constructor(private cd: ChangeDetectorRef, private logger: LoggerService) {
    console.log(this['__proto__'].constructor.name, 'ctor', `constructing`);
  }

  private intervalSubscription$: Subscription;
  public cdDetached = false;
  public timerStarted = false;

  @Input() public user: User = {
        name: "Marco",
        // surname: "Franke"
  };

  ngOnChanges(sc: SimpleChanges){
    console.log("Changed detected", sc);
  }

  ngDoCheck(){
    // debugger;
    console.log(this['__proto__'].constructor.name, 'ngDoCheck', "Doing checks");
  }

  ngOnInit() {
    
  }

  executeCd(){
    this.cd.detectChanges();
  }

  toggleChangeDetection(){
    if(this.cdDetached){
      this.cd.reattach();
    } else {
      this.cd.detach();
    }

    this.cdDetached = !this.cdDetached;
    this.cd.detectChanges();
  }

  startChangeTimer(){
    if(!this.timerStarted){
      this.intervalSubscription$ = interval(1000).subscribe(timer => this.changeUsername(true));
    } else {
      this.intervalSubscription$.unsubscribe();
    }

    this.timerStarted = !this.timerStarted;
  }

  changeUsername(copyObject: boolean){
    const name = `Marco ${Math.random().toPrecision(1)}`
    if(copyObject){
      this.user = { ...this.user, name: name };
    } else {
      this.user.name = name;
    }
    console.log("Name changed to", name);

    // this.executeCd();
  }

  ngOnDestroy(){
    if(this.intervalSubscription$) this.intervalSubscription$.unsubscribe();
  }
}

interface User {
  name: string;
  // surname: string;
}
