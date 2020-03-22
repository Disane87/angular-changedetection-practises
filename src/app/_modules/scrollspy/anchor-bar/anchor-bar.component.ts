import { Component, OnInit, ElementRef } from "@angular/core";
import { ScrollspyService, Anchor } from "../scrollspy.service";
import { Observable } from "rxjs";

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
    this.anchors = this.scrollSpyService.anchors;

    const scrollParent = this.scrollSpyService.getScrollParent(this.el.nativeElement);
    debugger
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
