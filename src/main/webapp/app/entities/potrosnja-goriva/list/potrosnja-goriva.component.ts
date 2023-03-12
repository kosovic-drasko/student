import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router } from '@angular/router';
import { combineLatest, filter, Observable, switchMap, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPotrosnjaGoriva } from '../potrosnja-goriva.model';
import { ASC, DESC, SORT, ITEM_DELETED_EVENT, DEFAULT_SORT_DATA } from 'app/config/navigation.constants';
import { EntityArrayResponseType, PotrosnjaGorivaService } from '../service/potrosnja-goriva.service';
import { PotrosnjaGorivaDeleteDialogComponent } from '../delete/potrosnja-goriva-delete-dialog.component';
import { SortService } from 'app/shared/sort/sort.service';

@Component({
  selector: 'jhi-potrosnja-goriva',
  templateUrl: './potrosnja-goriva.component.html',
})
export class PotrosnjaGorivaComponent implements OnInit {
  potrosnjaGorivas?: IPotrosnjaGoriva[];
  isLoading = false;
  potrosnja?: number;
  predicate = 'id';
  ascending = true;
  potrosnjaOtvoreno?: any;
  predjenoKm?: any;
  constructor(
    protected potrosnjaGorivaService: PotrosnjaGorivaService,
    protected activatedRoute: ActivatedRoute,
    public router: Router,
    protected sortService: SortService,
    protected modalService: NgbModal
  ) {}

  trackId = (_index: number, item: IPotrosnjaGoriva): number => this.potrosnjaGorivaService.getPotrosnjaGorivaIdentifier(item);

  ngOnInit(): void {
    this.load();
  }
  protected queryBackendPotrosnja(): any {
    return this.potrosnjaGorivaService.potrosnja(this.potrosnjaOtvoreno, this.predjenoKm).subscribe({
      next: (res: number | undefined) => {
        this.potrosnja = res;
        // this.predjenoKm=res;
        console.log('To je potrosnja:', this.potrosnja);
      },
    });
  }

  load(): void {
    this.queryBackendPotrosnja();
  }

  delete(potrosnjaGoriva: IPotrosnjaGoriva): void {
    const modalRef = this.modalService.open(PotrosnjaGorivaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.potrosnjaGoriva = potrosnjaGoriva;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed
      .pipe(
        filter(reason => reason === ITEM_DELETED_EVENT),
        switchMap(() => this.loadFromBackendWithRouteInformations())
      )
      .subscribe({
        next: (res: EntityArrayResponseType) => {
          this.onResponseSuccess(res);
        },
      });
  }

  navigateToWithComponentValues(): void {
    this.handleNavigation(this.predicate, this.ascending);
  }

  protected loadFromBackendWithRouteInformations(): Observable<EntityArrayResponseType> {
    return combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
      switchMap(() => this.queryBackend(this.predicate, this.ascending))
    );
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    const sort = (params.get(SORT) ?? data[DEFAULT_SORT_DATA]).split(',');
    this.predicate = sort[0];
    this.ascending = sort[1] === ASC;
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.potrosnjaGorivas = this.refineData(dataFromBody);
  }

  protected refineData(data: IPotrosnjaGoriva[]): IPotrosnjaGoriva[] {
    return data.sort(this.sortService.startSort(this.predicate, this.ascending ? 1 : -1));
  }

  protected fillComponentAttributesFromResponseBody(data: IPotrosnjaGoriva[] | null): IPotrosnjaGoriva[] {
    return data ?? [];
  }

  protected queryBackend(predicate?: string, ascending?: boolean): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const queryObject = {
      sort: this.getSortQueryParam(predicate, ascending),
    };
    return this.potrosnjaGorivaService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
  }

  protected handleNavigation(predicate?: string, ascending?: boolean): void {
    const queryParamsObj = {
      sort: this.getSortQueryParam(predicate, ascending),
    };

    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      queryParams: queryParamsObj,
    });
  }

  protected getSortQueryParam(predicate = this.predicate, ascending = this.ascending): string[] {
    const ascendingQueryParam = ascending ? ASC : DESC;
    if (predicate === '') {
      return [];
    } else {
      return [predicate + ',' + ascendingQueryParam];
    }
  }
}
