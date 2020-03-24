import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-information-flip',
  templateUrl: './information-flip.component.html',
  styleUrls: ['./information-flip.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InformationFlipComponent implements OnInit {

  public informations: Array<Information> = [{
    text: 'Hallo 134343'
  },{
    text: 'Miese Sache'
  }];

  private infoInterval: Subscription;
  public addedInformation: string;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.informations.map((info: Information, index: number) => info.visible = index == 0);

    this.infoInterval = interval(5000).pipe(delay(1000)).subscribe(fired => {
      const currentVisibleIndex = this.informations.findIndex(info => info.visible);
      const informationCount = this.informations.length -1;

      this.informations[currentVisibleIndex].visible = false;
      let nextVisibleIndex = currentVisibleIndex+1;
      if(nextVisibleIndex > informationCount){
        nextVisibleIndex = 0;
      }

      this.informations[nextVisibleIndex].visible = true;
      console.log("nextVisibleIndex", nextVisibleIndex);
      this.cd.detectChanges();
    })
  }

  ngOnDestroy(){
    this.infoInterval.unsubscribe();
  }

  addInformation(text: string){
    this.informations.push({ text: text, visible: false});
    this.addedInformation = null;
  }

}

export interface Information {
  text: string;
  visible?: boolean;
}