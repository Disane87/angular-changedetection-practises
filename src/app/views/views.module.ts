import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarterComponent } from './starter/starter.component';
import { OnPushComponent } from './on-push/on-push.component';
import { RouterModule, Routes, ExtraOptions, Route } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { MarkForCheckComponent } from './mark-for-check/mark-for-check.component';
import { DialogsComponent } from './dialogs/dialogs.component';

import { NavigationRoute } from '../_interfaces/navigation-route.interface';

const appRoutes: Array<NavigationRoute> = [
  { path: 'start', component: StarterComponent, displayName: "Start" },
  { path: 'onPush', component: OnPushComponent, displayName: "ChangeDetection" },
  { path: 'dialogs', component: DialogsComponent, displayName: "dialogs"},
  { path: 'onPush', component: OnPushComponent, outlet: 'dialog' },
];

@NgModule({
  imports: [
    CommonModule, FormsModule, RouterModule.forChild(appRoutes), 
  ],
  declarations: [StarterComponent, OnPushComponent, MarkForCheckComponent, DialogsComponent],
  exports: [StarterComponent, OnPushComponent]
})
export class ViewsModule { }


