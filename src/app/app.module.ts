import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from './layout/layout.module';
import { AppComponent } from './app.component';
import { LoggerService } from './logger.service';
import { ScrollspyModule } from './_modules/scrollspy/scrollspy.module';

@NgModule({
  imports:      [ BrowserModule, FormsModule, LayoutModule, FormsModule, ScrollspyModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [LoggerService]
})
export class AppModule { }
