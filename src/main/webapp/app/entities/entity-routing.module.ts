import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'student',
        data: { pageTitle: 'Students' },
        loadChildren: () => import('./student/student.module').then(m => m.StudentModule),
      },
      {
        path: 'potrosnja-goriva',
        data: { pageTitle: 'PotrosnjaGorivas' },
        loadChildren: () => import('./potrosnja-goriva/potrosnja-goriva.module').then(m => m.PotrosnjaGorivaModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
