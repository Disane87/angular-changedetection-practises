import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class ScrollspyService {

  constructor() { }

  private _anchors: Array<Anchor> = new Array<Anchor>();
  public anchors = new BehaviorSubject<Array<Anchor>>(this._anchors);
  public anchorAdded = new BehaviorSubject<Anchor>(null);

  public addAnchor(anchor: Anchor){
    this._anchors.push(anchor);
    this.updateAnchors();
    this.anchorAdded.next(anchor);
    
  }

  public activateAnchor(key: string){

    this._anchors.map(anchor=> anchor.active = false);
    const foundAnchor = this._anchors.find(anchor => anchor.key == key);
    foundAnchor.active = true;
  }

  private updateAnchors(){
    this.anchors.next(this._anchors);
  }
}

  
export interface Anchor {
  key: string;
  displayName?: string;
  icon?: string;
  index?: number;
  nativeElement: HTMLElement;
  scrollParent?: HTMLElement | string;
  active: boolean;
}