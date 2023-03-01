import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { PotrosnjaGorivaService } from '../service/potrosnja-goriva.service';

import { PotrosnjaGorivaComponent } from './potrosnja-goriva.component';

describe('PotrosnjaGoriva Management Component', () => {
  let comp: PotrosnjaGorivaComponent;
  let fixture: ComponentFixture<PotrosnjaGorivaComponent>;
  let service: PotrosnjaGorivaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'potrosnja-goriva', component: PotrosnjaGorivaComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [PotrosnjaGorivaComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(PotrosnjaGorivaComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PotrosnjaGorivaComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PotrosnjaGorivaService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.potrosnjaGorivas?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to potrosnjaGorivaService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getPotrosnjaGorivaIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getPotrosnjaGorivaIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
