import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  BsDropdownModule,
  TabsModule,
  BsDatepickerModule,
  PaginationModule,
  ButtonsModule,
  ModalModule
} from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeAgoPipe } from 'time-ago-pipe';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';
import { CollaboratorListComponent } from './collaborators/collaborator-list/collaborator-list.component';
import { MessagesComponent } from './messages/messages.component';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/user.service';
import { CollaboratorCardComponent } from './collaborators/collaborator-card/collaborator-card.component';
import { CollaboratorDetailComponent } from './collaborators/collaborator-detail/collaborator-detail.component';
import { CollaboratorEditComponent } from './collaborators/collaborator-edit/collaborator-edit.component';
import { CollaboratorEditResolver } from './_resolvers/collaborator-edit.resolver';
import { CollaboratorListResolver } from './_resolvers/collaborator-list.resolver';
import { CollaboratorDetailResolver } from './_resolvers/collaborator-detail.resolver.';
import { CollaboratorNewComponent } from './collaborators/collaborator-new/collaborator-new.component';
import { PreventUnsavedChanges } from './_guards/prevent-unsave-changes-guards';
import { PhotoEditorComponent } from './collaborators/photo-editor/photo-editor.component';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { CollaboratorMessagesComponent } from './collaborators/collaborator-messages/collaborator-messages.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directives/hasRole.directive';
import { UserRolesManagementComponent } from './admin/user-roles-management/user-roles-management.component';
import { PhotoManagementComponent } from './admin/photo-management/photo-management.component';
import { AdminService } from './_services/admin.service';
import { RolesModalComponent } from './admin/roles-modal/roles-modal.component';
import { GoalsComponent } from './goals/goals.component';
import { HrPanelComponent } from './hr/hr-panel/hr-panel.component';
import { StrategiesComponent } from './strategies/strategies.component';
import { GoalsResolver } from './_resolvers/goals.resolver';
import { StrategiesResolver } from './_resolvers/strategies.resolver';
import { StrategyListComponent } from './hr/strategies/strategy-list/strategy-list.component';
import { BehavioralSkillsComponent } from './hr/behavioral-skills/behavioral-skills.component';
import { StrategyListResolver } from './_resolvers/strategy-list.resolver';
import { HrService } from './_services/hr.service';
import { StrategyNewComponent } from './hr/strategies/strategy-new/strategy-new.component';
import { StrategyDetailComponent } from './hr/strategies/strategy-detail/strategy-detail.component';
import { StrategyDetailResolver } from './_resolvers/strategy-detail.resolver.';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    CollaboratorListComponent,
    MessagesComponent,
    CollaboratorCardComponent,
    CollaboratorDetailComponent,
    CollaboratorEditComponent,
    CollaboratorNewComponent,
    CollaboratorMessagesComponent,
    PhotoEditorComponent,
    TimeAgoPipe,
    AdminPanelComponent,
    HasRoleDirective,
    UserRolesManagementComponent,
    PhotoManagementComponent,
    RolesModalComponent,
    MessagesComponent,
    NavComponent,
    HomeComponent,
    GoalsComponent,
    HrPanelComponent,
    StrategiesComponent,
    StrategyListComponent,
    StrategyNewComponent,
    StrategyDetailComponent,
    BehavioralSkillsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    NgxGalleryModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    FileUploadModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    })
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AlertifyService,
    AuthGuard,
    PreventUnsavedChanges,
    UserService,
    CollaboratorEditResolver,
    CollaboratorListResolver,
    CollaboratorDetailResolver,
    MessagesResolver,
    GoalsResolver,
    StrategiesResolver,
    StrategyListResolver,
    StrategyDetailResolver,
    AdminService,
    HrService
  ],
  entryComponents: [
    RolesModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
