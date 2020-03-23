import { Component, OnInit, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, Renderer2, ViewChild, TemplateRef } from "@angular/core";
import { ScrollspyService, Anchor } from "../scrollspy.service";
import { Observable, fromEvent } from "rxjs";
import { map } from 'rxjs/operators'

@Component({
  selector: "scrollspy-anchor-bar",
  templateUrl: "./anchor-bar.component.html",
  styleUrls: ["./anchor-bar.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnchorBarComponent implements OnInit {
  constructor(
    private el: ElementRef,
    private scrollSpyService: ScrollspyService,
    private cd: ChangeDetectorRef,
    private renderer: Renderer2
  ) {}

  @ViewChild('scrollToTop', {static: false, read: ElementRef}) scrollToTop: ElementRef;

  public anchors: Observable<Array<Anchor>>;

  public scrollSpyButtonContainerClass = "scrollspy-buttons";
  private _scrollParentElement: HTMLElement;

  ngOnInit() {
    this._scrollParentElement = this.scrollSpyService.getScrollParent(this.el.nativeElement);
    this.anchors = this.scrollSpyService.anchors.pipe(
      map(this.filterAllAnchorsByScrollcontainer),
      map(this.markAllAnchorsAsVisible)
    );

    

// debugger;
    
    fromEvent(this._scrollParentElement, 'scroll').subscribe(event => {
      this.markAnchorsAsVisible(this.scrollSpyService.anchorSnapshot.filter(this.filterAnchorsInScrollContainer));
      // console.log(`${this._scrollParentElement.id} scrolled`, event);
      const scrolledDisctance = this._scrollParentElement.scrollTop;
      this.toggleScrollToTopVisibility(scrolledDisctance > 0)
    
    });
  }

  private toggleScrollToTopVisibility(visible: boolean){
    if(visible){
        this.renderer.removeClass(this.scrollToTop.nativeElement, "d-none");
        this.renderer.addClass(this.scrollToTop.nativeElement, "d-flex")
      } else {
        this.renderer.addClass(this.scrollToTop.nativeElement, "d-none");
        this.renderer.removeClass(this.scrollToTop.nativeElement, "d-flex")
      }
  }

  ngAfterViewInit(){
    this.renderer.appendChild(this._scrollParentElement, this.scrollToTop.nativeElement);
  }


  private filterAnchorsInScrollContainer = (anchor: Anchor) =>  (anchor.scrollParent as HTMLElement).id == this._scrollParentElement.id;
  private markAllAnchorsAsVisible = (anchors: Array<Anchor>) => this.markAnchorsAsVisible(anchors);
  private filterAllAnchorsByScrollcontainer = (anchors: Array<Anchor>) => anchors.filter(this.filterAnchorsInScrollContainer);
  private getActiveAnchor = (anchor: Anchor) => anchor.active;
  private getAllVisibleAnchorsAfterFirst =  (anchors: Array<Anchor>, firstActiveAnchors: Anchor) => anchors.filter(anchor => anchor.key != firstActiveAnchors.key && anchor.active).map(anchor => anchor.active = false)
  private getFirstAnchor =  (anchors: Array<Anchor>) => anchors.find(this.getActiveAnchor)

  private markAnchorsAsVisible(anchors: Array<Anchor>): Array<Anchor>{
    for(let anchor of anchors){
      anchor.active = this.isScrolledIntoView(anchor.nativeElement);
    }
    const lastActiveAnchors = this.getAllVisibleAnchorsAfterFirst(anchors, this.getFirstAnchor(anchors));
    this.cd.detectChanges();
    return anchors;
  }

  private isScrolledIntoView(el: HTMLElement) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
  }

  public scrollTo(anchor: Anchor) {
    let scrollDistance = anchor.nativeElement.offsetTop;

    const scrollSpyButtonContainer = this._scrollParentElement.querySelector(`.${this.scrollSpyButtonContainerClass}`) as HTMLElement;
    const scrollSpyButtonHeight = this.outerHeight(scrollSpyButtonContainer);

    // const elementAndButtonDifference = scrollSpyButtonHeight - 

    scrollDistance = scrollDistance - scrollSpyButtonHeight - 75;
    this._scrollParentElement.scrollTo({
      top: scrollDistance,
      behavior: "smooth"
    });

    this.scrollSpyService.activateAnchor(anchor.key);
  }

  public scrollContainerToTop(){
    this._scrollParentElement.scrollTo({
      top: 0,
      behavior: "smooth"
    });
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

  

  ngOnDestroy(){
    this.scrollSpyService.removeScrollAnchorsByScrollContainerId(this._scrollParentElement.id);
  }
}
