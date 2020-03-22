import { Directive, ViewContainerRef, TemplateRef, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[repeatByRange]'
})
export class RepeatByRangeDirective implements OnInit {

  constructor(private _viewContainer: ViewContainerRef, private templateRef: TemplateRef<any>) { }

  @Input('repeatByRange') repeatByRange: RepeatRange;

  ngOnInit(): void {
   this.createRange();
  }

  private createRange(){

    const repeatRange = {...new RepeatRange(), ...this.repeatByRange };

    for (let i = repeatRange.start; i <= repeatRange.end; i+=repeatRange.step) {
      this._viewContainer.createEmbeddedView(this.templateRef,{
        $implicit: i,
        i: i
      });
    }
  }

  ngOnChanges() {
    this._viewContainer.clear();
  }

}

export class RepeatRange {
  start: number = 0
  end: number;
  step: number = 1;
} 