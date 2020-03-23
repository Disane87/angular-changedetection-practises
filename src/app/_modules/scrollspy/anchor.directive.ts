import { Directive, ElementRef, Input } from "@angular/core";
import { ScrollspyService, Anchor } from "./scrollspy.service";

@Directive({
  selector: "[scrollspyAnchor]"
})
export class AnchorDirective {
  @Input("scrollspyAnchor") public anchor: string | Anchor;

  constructor(
    private el: ElementRef,
    private scrollSpyService: ScrollspyService
  ) {}

  ngOnInit(): void {
    let currentAnchor: Anchor;
    const scrollingContainer = this.scrollSpyService.getScrollParent(this.el.nativeElement);

    if (typeof this.anchor == "string") {
      currentAnchor = {
        key: this.cleanString(this.anchor.toLowerCase()),
        displayName: this.anchor,
        nativeElement: this.el.nativeElement,
        active: false,
        scrollParent: scrollingContainer,
        visible: false
      };

    } else {
      currentAnchor = this.anchor;
    }

    this.el.nativeElement.id = currentAnchor.key;
    this.scrollSpyService.addAnchor(currentAnchor);
  }

  private cleanString(name: string) {
    const cleanPattern = new RegExp(/[^0-9a-zA-Z]+/);
    return name.trim().replace(cleanPattern, "");
  }

  
}
