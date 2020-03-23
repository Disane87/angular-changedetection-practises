import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class ScrollspyService {

  constructor() { }

  private _anchors: Array<Anchor> = new Array<Anchor>();
  public anchors = new BehaviorSubject<Array<Anchor>>(this._anchors);
  public anchorAdded = new BehaviorSubject<Anchor>(null);
  public anchorSnapshot = new Array<Anchor>();

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
    this.anchorSnapshot = this._anchors;
    this.anchors.next(this._anchors);
  }

  public removeScrollAnchorsByScrollContainerId(scrollContainerId: string){
    this._anchors = this.anchorSnapshot.filter(anchor => (anchor.scrollParent as HTMLElement).id != scrollContainerId)
    this.updateAnchors();
  }

  public getScrollParent(node) {
    /** Adapted by https://stackoverflow.com/a/49186677/5773586 */
    const regex = /(auto|scroll)/;
    const parents = (_node, ps) => {
      if (_node.parentNode === null) {
        return ps;
      }
      return parents(_node.parentNode, ps.concat([_node]));
    };

    const style = (_node, prop) =>
      getComputedStyle(_node, null).getPropertyValue(prop);

    const overflow = _node =>
      style(_node, "overflow") +
      style(_node, "overflow-y") +
      style(_node, "overflow-x");
    const scroll = _node => regex.test(overflow(_node));

    /* eslint-disable consistent-return */
    const scrollParent = _node => {
      if (!(_node instanceof HTMLElement || _node instanceof SVGElement)) {
        return;
      }

      const ps = parents(_node.parentNode, []);

      for (let i = 0; i < ps.length; i += 1) {
        if (scroll(ps[i])) {
          return ps[i];
        }
      }

      return document.scrollingElement || document.documentElement;
    };

    return scrollParent(node);
    /* eslint-enable consistent-return */
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
  visible: boolean;
}