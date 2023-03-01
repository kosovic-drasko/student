import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PotrosnjaGorivaComponent } from '../list/potrosnja-goriva.component';
import { PotrosnjaGorivaDetailComponent } from '../detail/potrosnja-goriva-detail.component';
import { PotrosnjaGorivaUpdateComponent } from '../update/potrosnja-goriva-update.component';
import { PotrosnjaGorivaRoutingResolveService } from './potrosnja-goriva-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const potrosnjaGorivaRoute: Routes = [
  {
    path: '',
    component: PotrosnjaGorivaComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PotrosnjaGorivaDetailComponent,
    resolve: {
      potrosnjaGoriva: PotrosnjaGorivaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PotrosnjaGorivaUpdateComponent,
    resolve: {
      potrosnjaGoriva: PotrosnjaGorivaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PotrosnjaGorivaUpdateComponent,
    resolve: {
      potrosnjaGoriva: PotrosnjaGorivaRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(potrosnjaGorivaRoute)],
  exports: [RouterModule],
})
export class PotrosnjaGorivaRoutingModule {}
