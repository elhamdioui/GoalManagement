import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { SheetsPanelComponent } from './../sheets/sheets-panel/sheets-panel.component';

@Injectable()
export class PreventUnsavedChangesForSheets
  implements CanDeactivate<SheetsPanelComponent> {
  canDeactivate(component: SheetsPanelComponent) {

    if ((component.behavioralSkillEvaluationUpdated)) {
      return confirm(
        'Es-tu sur de vouloir continuer? Toutes les modifications non enregistrées seront perdues.'
      );
    }
    return true;
  }
}
