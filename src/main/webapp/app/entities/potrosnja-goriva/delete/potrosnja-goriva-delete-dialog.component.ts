import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPotrosnjaGoriva } from '../potrosnja-goriva.model';
import { PotrosnjaGorivaService } from '../service/potrosnja-goriva.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './potrosnja-goriva-delete-dialog.component.html',
})
export class PotrosnjaGorivaDeleteDialogComponent {
  potrosnjaGoriva?: IPotrosnjaGoriva;

  constructor(protected potrosnjaGorivaService: PotrosnjaGorivaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.potrosnjaGorivaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
