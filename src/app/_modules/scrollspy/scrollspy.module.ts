import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnchorDirective } from './anchor.directive';
import { ScrollspyService } from './scrollspy.service';
import { AnchorBarComponent } from './anchor-bar/anchor-bar.component';

export {}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AnchorDirective, AnchorBarComponent],
  providers: [ScrollspyService]
})
export class ScrollspyModule { }