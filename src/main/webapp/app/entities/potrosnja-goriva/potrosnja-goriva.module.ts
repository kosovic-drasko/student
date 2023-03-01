import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PotrosnjaGorivaComponent } from './list/potrosnja-goriva.component';
import { PotrosnjaGorivaDetailComponent } from './detail/potrosnja-goriva-detail.component';
import { PotrosnjaGorivaUpdateComponent } from './update/potrosnja-goriva-update.component';
import { PotrosnjaGorivaDeleteDialogComponent } from './delete/potrosnja-goriva-delete-dialog.component';
import { PotrosnjaGorivaRoutingModule } from './route/potrosnja-goriva-routing.module';

@NgModule({
  imports: [SharedModule, PotrosnjaGorivaRoutingModule],
  declarations: [
    PotrosnjaGorivaComponent,
    PotrosnjaGorivaDetailComponent,
    PotrosnjaGorivaUpdateComponent,
    PotrosnjaGorivaDeleteDialogComponent,
  ],
})
export class PotrosnjaGorivaModule {}
