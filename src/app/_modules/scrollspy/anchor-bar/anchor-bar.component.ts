import { Component, OnInit, ElementRef } from "@angular/core";
import { ScrollspyService, Anchor } from "../scrollspy.service";
import { Observable, fromEvent } from "rxjs";
import { map } from 'rxjs/operators'

@Component({
  selector: "scrollspy-anchor-bar",
  templateUrl: "./anchor-bar.component.html",
  styleUrls: ["./anchor-bar.component.css"]
})
export class AnchorBarComponent implements OnInit {
  constructor(
    private el: ElementRef,
    private scrollSpyService: ScrollspyService
  ) {}

  public anchors: Observable<Array<Anchor>>;

  public scrollSpyButtonContainerClass = "scrollspy-buttons";

  ngOnInit() {
    this.anchors = this.scrollSpyService.anchors.pipe(map(anchors => this.markAnchorsAsVisible(anchors)));

    const scrollParent = this.scrollSpyService.getScrollParent(this.el.nativeElement);
    
    fromEvent(scrollParent, 'scroll').subscribe((event) => {
      this.markAnchorsAsVisible(this.scrollSpyService.anchorSnapshot);
    });
  }



  markAnchorsAsVisible(anchors: Array<Anchor>): Array<Anchor>{
    anchors.forEach(anchorElement => {
        anchorElement.active = this.isScrolledIntoView(anchorElement.nativeElement);
    })

    const firstActiveAnchors = anchors.find(anchor => anchor.active);
    const lastActiveAnchors = anchors.filter(anchor => anchor.key != firstActiveAnchors.key && anchor.active);
    lastActiveAnchors.forEach(anchor => anchor.active = false);
    return anchors;
  }

  isScrolledIntoView(el: HTMLElement) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
  }

  scrollTo(anchor: Anchor) {

    const parentScrollableContainer = anchor.scrollParent;
    const nativeElement = this.el.nativeElement;
    let scrollDistance = anchor.nativeElement.offsetTop;

    const scrollSpyButtonContainer = parentScrollableContainer
      .querySelector(`.${this.scrollSpyButtonContainerClass}`) as HTMLElement;
    const scrollSpyButtonHeight = this.outerHeight(scrollSpyButtonContainer);

    // const elementAndButtonDifference = scrollSpyButtonHeight - 

    scrollDistance = scrollDistance - scrollSpyButtonHeight - 75;
    parentScrollableContainer.scrollTo({
      top: scrollDistance,
      behavior: "smooth"
    });

    this.scrollSpyService.activateAnchor(anchor.key);
  }

  outerHeight(element: HTMLElement): number {
    const 
      height = element.offsetHeight,
      style = window.getComputedStyle(element);


    const marginsAndPaddings = ["top", "bottom"]
      .map(side => parseInt(style[`margin-${side}`]))
      .reduce((total, side) => total + side, height);

    return marginsAndPaddings;
  }
}
