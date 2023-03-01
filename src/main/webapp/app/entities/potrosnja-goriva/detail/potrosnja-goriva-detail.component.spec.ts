import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PotrosnjaGorivaDetailComponent } from './potrosnja-goriva-detail.component';

describe('PotrosnjaGoriva Management Detail Component', () => {
  let comp: PotrosnjaGorivaDetailComponent;
  let fixture: ComponentFixture<PotrosnjaGorivaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PotrosnjaGorivaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ potrosnjaGoriva: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PotrosnjaGorivaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PotrosnjaGorivaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load potrosnjaGoriva on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.potrosnjaGoriva).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
