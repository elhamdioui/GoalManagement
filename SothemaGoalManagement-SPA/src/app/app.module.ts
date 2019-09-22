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
  ModalModule,
  CarouselModule
} from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeAgoPipe } from 'time-ago-pipe';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

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
import { HrPanelComponent } from './hr/hr-panel/hr-panel.component';
import { StrategiesComponent } from './strategies/strategies.component';
import { GoalsCardsResolver } from './_resolvers/goals-cards.resolver';
import { StrategiesResolver } from './_resolvers/strategies.resolver';
import { StrategyListComponent } from './hr/strategies/strategy-list/strategy-list.component';
import { BehavioralSkillsComponent } from './hr/behavioral-skills/behavioral-skills.component';
import { StrategyListResolver } from './_resolvers/strategy-list.resolver';
import { HrService } from './_services/hr.service';
import { StrategyNewComponent } from './hr/strategies/strategy-new/strategy-new.component';
import { StrategyDetailComponent } from './hr/strategies/strategy-detail/strategy-detail.component';
import { StrategyEditModalComponent } from './hr/strategies/strategy-edit-modal/strategy-edit-modal.component';
import { StrategyAxisComponent } from './hr/strategies/strategy-axis/strategy-axis.component';
import { StrategyDetailResolver } from './_resolvers/strategy-detail.resolver.';
import { ResetPasswordComponent } from './collaborators/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './collaborators/forget-password/forget-password.component';
import { ProfileEditResolver } from './_resolvers/profile-edit.resolver';
import { AxisModalComponent } from './hr/strategies/axis-modal/axis-modal.component';
import { AxisPolesWeightsCardComponent } from './hr/strategies/axis-poles-weights-card/axis-poles-weights-card.component';
import { AxisPoleWeightItemComponent } from './hr/strategies/axis-pole-weight-item/axis-pole-weight-item.component';
import { AxisPolesWeightsListComponent } from './hr/strategies/axis-poles-weights-list/axis-poles-weights-list.component';
import { ProfileEditComponent } from './collaborators/profile-edit/profile-edit.component';
import { GoalCardListComponent } from './userCards/goal-card-list/goal-card-list.component';
import { GoalCardDetailComponent } from './userCards/goal-card-detail/goal-card-detail.component';
import { BehavioralSkillsCardComponent } from './userCards/behavioral-skills-card/behavioral-skills-card.component';
import { CardsPanelComponent } from './userCards/cards-panel/cards-panel.component';
import { GoalCardNewComponent } from './userCards/goal-card-new/goal-card-new.component';
import { GoalsCardDetailResolver } from './_resolvers/goals-card-detail.resolver';
import { StrategyDocumentationComponent } from './hr/strategies/strategy-documentation/strategy-documentation.component';

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
    ProfileEditComponent,
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
    CardsPanelComponent,
    GoalCardListComponent,
    GoalCardDetailComponent,
    GoalCardNewComponent,
    BehavioralSkillsCardComponent,
    HrPanelComponent,
    StrategiesComponent,
    StrategyListComponent,
    StrategyNewComponent,
    StrategyEditModalComponent,
    StrategyDetailComponent,
    StrategyAxisComponent,
    StrategyDocumentationComponent,
    AxisModalComponent,
    AxisPolesWeightsCardComponent,
    AxisPoleWeightItemComponent,
    AxisPolesWeightsListComponent,
    BehavioralSkillsComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent
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
    CarouselModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    NgxGalleryModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    FileUploadModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
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
    CollaboratorListResolver,
    CollaboratorDetailResolver,
    ProfileEditResolver,
    MessagesResolver,
    GoalsCardsResolver,
    GoalsCardDetailResolver,
    StrategiesResolver,
    StrategyListResolver,
    StrategyDetailResolver,
    AdminService,
    HrService
  ],
  entryComponents: [
    RolesModalComponent,
    AxisModalComponent,
    StrategyEditModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
