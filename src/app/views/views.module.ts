import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarterComponent } from './starter/starter.component';
import { OnPushComponent } from './on-push/on-push.component';
import { RouterModule, Routes, ExtraOptions, Route } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { MarkForCheckComponent } from './mark-for-check/mark-for-check.component';
import { DialogsComponent } from './dialogs/dialogs.component';

import { NavigationRoute } from '../_interfaces/navigation-route.interface';
import { ScrollspyComponent } from './scrollspy/scrollspy.component';

import { RepeatByRangeDirective } from '../_directives/repeat-by-range.directive';

import { ScrollspyModule } from '../_modules/scrollspy/scrollspy.module';
import { InformationFlipComponent } from './information-flip/information-flip.component';

const appRoutes: Array<NavigationRoute> = [
  { path: 'start', component: StarterComponent, displayName: "Start" },
  { path: 'onPush', component: OnPushComponent, displayName: "ChangeDetection" },
  { path: 'dialogs', component: DialogsComponent, displayName: "Dialogs"},
  { path: 'scrollspy', component: ScrollspyComponent, displayName: "Scrollspy"},
  { path: 'onPush', component: OnPushComponent, outlet: 'dialog' },
  { path: 'information-flip', component: InformationFlipComponent, displayName: 'Flip-Information' }
];

@NgModule({
  imports: [
    CommonModule, FormsModule, RouterModule.forChild(appRoutes), ScrollspyModule
  ],
  declarations: [StarterComponent, OnPushComponent, MarkForCheckComponent, DialogsComponent, ScrollspyComponent, RepeatByRangeDirective, InformationFlipComponent],
  exports: [StarterComponent, OnPushComponent, ScrollspyModule]
})
export class ViewsModule { }


