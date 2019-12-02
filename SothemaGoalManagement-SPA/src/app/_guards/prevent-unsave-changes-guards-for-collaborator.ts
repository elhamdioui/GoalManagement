import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { CollaboratorEditComponent } from './../collaborators/collaborator-edit/collaborator-edit.component';
import { SheetsPanelComponent } from './../sheets/sheets-panel/sheets-panel.component';

@Injectable()
export class PreventUnsavedChangesForCollaborator
  implements CanDeactivate<CollaboratorEditComponent> {
  canDeactivate(component: CollaboratorEditComponent) {
    console.log('component:', component);

    if ((component.editForm.dirty)) {
      return confirm(
        'Es-tu sur de vouloir continuer? Toutes les modifications non enregistrées seront perdues.'
      );
    }
    return true;
  }
}
