import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { CollaboratorEditComponent } from './../collaborators/collaborator-edit/collaborator-edit.component';

@Injectable()
export class PreventUnsavedChanges
  implements CanDeactivate<CollaboratorEditComponent> {
  canDeactivate(component: CollaboratorEditComponent) {
    if (component.editForm.dirty) {
      return confirm(
        'Are you sure you want to continue? Any unsaved changes will be lost'
      );
    }
    return true;
  }
}
