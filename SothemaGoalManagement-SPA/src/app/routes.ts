import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { CollaboratorEditComponent } from './collaborators/collaborator-edit/collaborator-edit.component';
import { CollaboratorEditResolver } from './_resolvers/collaborator-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsave-changes-guards';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { GoalsComponent } from './goals/goals.component';
import { GoalsResolver } from './_resolvers/goals.resolver';
import { HrPanelComponent } from './hr/hr-panel/hr-panel.component';
import { StrategiesComponent } from './strategies/strategies.component';
import { StrategiesResolver } from './_resolvers/strategies.resolver';
import { CollaboratorListResolver } from './_resolvers/collaborator-list.resolver';
import { CollaboratorDetailResolver } from './_resolvers/collaborator-detail.resolver.';
import { CollaboratorDetailComponent } from './collaborators/collaborator-detail/collaborator-detail.component';
import { StrategyListResolver } from './_resolvers/strategy-list.resolver';
import { StrategyDetailComponent } from './hr/strategies/strategy-detail/strategy-detail.component';
import { StrategyDetailResolver } from './_resolvers/strategy-detail.resolver.';
import { ResetPasswordComponent } from './collaborators/reset-password/reset-password.component';


export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'collaborator/edit',
        component: CollaboratorEditComponent,
        resolve: { user: CollaboratorEditResolver },
        canDeactivate: [PreventUnsavedChanges]
      },
      {
        path: 'strategies',
        component: StrategiesComponent,
        resolve: { strategies: StrategiesResolver }
      }, {
        path: 'strategies/:id',
        component: StrategyDetailComponent,
        resolve: { strategy: StrategyDetailResolver }
      },
      {
        path: 'goals',
        component: GoalsComponent,
        resolve: { goals: GoalsResolver }
      },
      {
        path: 'messages',
        component: MessagesComponent,
        resolve: { messages: MessagesResolver }
      },
      {
        path: 'hr',
        component: HrPanelComponent,
        resolve: { strategies: StrategyListResolver },
        data: { roles: ['HR'] }
      },
      {
        path: 'admin',
        component: AdminPanelComponent,
        resolve: { resolvedData: CollaboratorListResolver },
        data: { roles: ['Admin', 'HR'] }
      },
      {
        path: 'admin/collaborators/:id',
        component: CollaboratorDetailComponent,
        resolve: { user: CollaboratorDetailResolver },
        data: { roles: ['Admin', 'HR'] }
      },
      {
        path: 'admin/collaborator/edit',
        component: CollaboratorEditComponent,
        resolve: { user: CollaboratorEditResolver },
        canDeactivate: [PreventUnsavedChanges]
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
