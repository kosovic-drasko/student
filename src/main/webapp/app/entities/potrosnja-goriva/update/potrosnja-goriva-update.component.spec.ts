import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PotrosnjaGorivaFormService } from './potrosnja-goriva-form.service';
import { PotrosnjaGorivaService } from '../service/potrosnja-goriva.service';
import { IPotrosnjaGoriva } from '../potrosnja-goriva.model';

import { PotrosnjaGorivaUpdateComponent } from './potrosnja-goriva-update.component';

describe('PotrosnjaGoriva Management Update Component', () => {
  let comp: PotrosnjaGorivaUpdateComponent;
  let fixture: ComponentFixture<PotrosnjaGorivaUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let potrosnjaGorivaFormService: PotrosnjaGorivaFormService;
  let potrosnjaGorivaService: PotrosnjaGorivaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PotrosnjaGorivaUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(PotrosnjaGorivaUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PotrosnjaGorivaUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    potrosnjaGorivaFormService = TestBed.inject(PotrosnjaGorivaFormService);
    potrosnjaGorivaService = TestBed.inject(PotrosnjaGorivaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const potrosnjaGoriva: IPotrosnjaGoriva = { id: 456 };

      activatedRoute.data = of({ potrosnjaGoriva });
      comp.ngOnInit();

      expect(comp.potrosnjaGoriva).toEqual(potrosnjaGoriva);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPotrosnjaGoriva>>();
      const potrosnjaGoriva = { id: 123 };
      jest.spyOn(potrosnjaGorivaFormService, 'getPotrosnjaGoriva').mockReturnValue(potrosnjaGoriva);
      jest.spyOn(potrosnjaGorivaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ potrosnjaGoriva });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: potrosnjaGoriva }));
      saveSubject.complete();

      // THEN
      expect(potrosnjaGorivaFormService.getPotrosnjaGoriva).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(potrosnjaGorivaService.update).toHaveBeenCalledWith(expect.objectContaining(potrosnjaGoriva));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPotrosnjaGoriva>>();
      const potrosnjaGoriva = { id: 123 };
      jest.spyOn(potrosnjaGorivaFormService, 'getPotrosnjaGoriva').mockReturnValue({ id: null });
      jest.spyOn(potrosnjaGorivaService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ potrosnjaGoriva: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: potrosnjaGoriva }));
      saveSubject.complete();

      // THEN
      expect(potrosnjaGorivaFormService.getPotrosnjaGoriva).toHaveBeenCalled();
      expect(potrosnjaGorivaService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IPotrosnjaGoriva>>();
      const potrosnjaGoriva = { id: 123 };
      jest.spyOn(potrosnjaGorivaService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ potrosnjaGoriva });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(potrosnjaGorivaService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
