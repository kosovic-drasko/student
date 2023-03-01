import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPotrosnjaGoriva } from '../potrosnja-goriva.model';
import { PotrosnjaGorivaService } from '../service/potrosnja-goriva.service';

@Injectable({ providedIn: 'root' })
export class PotrosnjaGorivaRoutingResolveService implements Resolve<IPotrosnjaGoriva | null> {
  constructor(protected service: PotrosnjaGorivaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPotrosnjaGoriva | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((potrosnjaGoriva: HttpResponse<IPotrosnjaGoriva>) => {
          if (potrosnjaGoriva.body) {
            return of(potrosnjaGoriva.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
