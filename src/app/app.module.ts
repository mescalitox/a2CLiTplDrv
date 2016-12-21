import { UserManagerService } from './shared/user-manager.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list/list-item/list-item.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UiPanelComponent } from './ui/ui-panel/ui-panel.component';
import { UiButtonComponent } from './ui/ui-button/ui-button.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { DetailItemComponent } from './detail-item/detail-item.component';
import { EditRfItemComponent } from './edit-rf-item/edit-rf-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ListItemComponent,
    NavBarComponent,
    UiPanelComponent,
    UiButtonComponent,
    EditItemComponent,
    DetailItemComponent,
    EditRfItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [UserManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
