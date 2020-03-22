import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, ExtraOptions, Route } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ViewsModule } from '../views/views.module';
import { SearchPipe } from './search.pipe';
import { FormsModule } from '@angular/forms';
import { NavigationRoute } from '../_interfaces/navigation-route.interface';
import { DialogComponent } from './dialog/dialog.component';

const appRoutes: Array<NavigationRoute> = [
  { path: '', redirectTo: '/start', pathMatch: 'full' }
  // { path: '**', component: StarterComponent }
];

const routeOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  onSameUrlNavigation: 'ignore',
  enableTracing: false,
  useHash: false,
}

@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(appRoutes, routeOptions), ViewsModule, FormsModule
  ],
  declarations: [LayoutComponent, SearchPipe, DialogComponent],
  exports: [LayoutComponent]
})
export class LayoutModule { }
