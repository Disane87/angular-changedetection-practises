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
    if (typeof this.anchor == "string") {
      currentAnchor = {
        key: this.cleanString(this.anchor.toLowerCase()),
        displayName: this.anchor,
        nativeElement: this.el.nativeElement,
        active: false,
        scrollParent: this.getScrollParent(this.el.nativeElement)
      };
    } else {
      currentAnchor = this.anchor;
    }


    const scrollingContainer = this.getScrollParent(this.el.nativeElement);

    this.el.nativeElement.id = currentAnchor.key;

    this.scrollSpyService.addAnchor(currentAnchor);
  }

  private cleanString(name: string) {
    const cleanPattern = new RegExp(/[^0-9a-zA-Z]+/);
    return name.trim().replace(cleanPattern, "");
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
