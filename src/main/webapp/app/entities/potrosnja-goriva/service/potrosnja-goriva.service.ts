import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPotrosnjaGoriva, NewPotrosnjaGoriva } from '../potrosnja-goriva.model';

export type PartialUpdatePotrosnjaGoriva = Partial<IPotrosnjaGoriva> & Pick<IPotrosnjaGoriva, 'id'>;

export type EntityResponseType = HttpResponse<IPotrosnjaGoriva>;
export type EntityArrayResponseType = HttpResponse<IPotrosnjaGoriva[]>;

@Injectable({ providedIn: 'root' })
export class PotrosnjaGorivaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/potrosnja-gorivas');
  protected resourceUrlPotrosnja = this.applicationConfigService.getEndpointFor('api/potrosnja');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  potrosnja(potrosnja: number, predjeno: number): any {
    return this.http.get(`${this.resourceUrlPotrosnja}/${potrosnja}/${predjeno}`);
  }

  create(potrosnjaGoriva: NewPotrosnjaGoriva): Observable<EntityResponseType> {
    return this.http.post<IPotrosnjaGoriva>(this.resourceUrl, potrosnjaGoriva, { observe: 'response' });
  }

  update(potrosnjaGoriva: IPotrosnjaGoriva): Observable<EntityResponseType> {
    return this.http.put<IPotrosnjaGoriva>(`${this.resourceUrl}/${this.getPotrosnjaGorivaIdentifier(potrosnjaGoriva)}`, potrosnjaGoriva, {
      observe: 'response',
    });
  }

  partialUpdate(potrosnjaGoriva: PartialUpdatePotrosnjaGoriva): Observable<EntityResponseType> {
    return this.http.patch<IPotrosnjaGoriva>(`${this.resourceUrl}/${this.getPotrosnjaGorivaIdentifier(potrosnjaGoriva)}`, potrosnjaGoriva, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPotrosnjaGoriva>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPotrosnjaGoriva[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getPotrosnjaGorivaIdentifier(potrosnjaGoriva: Pick<IPotrosnjaGoriva, 'id'>): number {
    return potrosnjaGoriva.id;
  }

  comparePotrosnjaGoriva(o1: Pick<IPotrosnjaGoriva, 'id'> | null, o2: Pick<IPotrosnjaGoriva, 'id'> | null): boolean {
    return o1 && o2 ? this.getPotrosnjaGorivaIdentifier(o1) === this.getPotrosnjaGorivaIdentifier(o2) : o1 === o2;
  }

  addPotrosnjaGorivaToCollectionIfMissing<Type extends Pick<IPotrosnjaGoriva, 'id'>>(
    potrosnjaGorivaCollection: Type[],
    ...potrosnjaGorivasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const potrosnjaGorivas: Type[] = potrosnjaGorivasToCheck.filter(isPresent);
    if (potrosnjaGorivas.length > 0) {
      const potrosnjaGorivaCollectionIdentifiers = potrosnjaGorivaCollection.map(
        potrosnjaGorivaItem => this.getPotrosnjaGorivaIdentifier(potrosnjaGorivaItem)!
      );
      const potrosnjaGorivasToAdd = potrosnjaGorivas.filter(potrosnjaGorivaItem => {
        const potrosnjaGorivaIdentifier = this.getPotrosnjaGorivaIdentifier(potrosnjaGorivaItem);
        if (potrosnjaGorivaCollectionIdentifiers.includes(potrosnjaGorivaIdentifier)) {
          return false;
        }
        potrosnjaGorivaCollectionIdentifiers.push(potrosnjaGorivaIdentifier);
        return true;
      });
      return [...potrosnjaGorivasToAdd, ...potrosnjaGorivaCollection];
    }
    return potrosnjaGorivaCollection;
  }
}
