import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../potrosnja-goriva.test-samples';

import { PotrosnjaGorivaFormService } from './potrosnja-goriva-form.service';

describe('PotrosnjaGoriva Form Service', () => {
  let service: PotrosnjaGorivaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PotrosnjaGorivaFormService);
  });

  describe('Service methods', () => {
    describe('createPotrosnjaGorivaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPotrosnjaGorivaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            predjenoKm: expect.any(Object),
            potrosnjaOtvoreno: expect.any(Object),
          })
        );
      });

      it('passing IPotrosnjaGoriva should create a new form with FormGroup', () => {
        const formGroup = service.createPotrosnjaGorivaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            predjenoKm: expect.any(Object),
            potrosnjaOtvoreno: expect.any(Object),
          })
        );
      });
    });

    describe('getPotrosnjaGoriva', () => {
      it('should return NewPotrosnjaGoriva for default PotrosnjaGoriva initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createPotrosnjaGorivaFormGroup(sampleWithNewData);

        const potrosnjaGoriva = service.getPotrosnjaGoriva(formGroup) as any;

        expect(potrosnjaGoriva).toMatchObject(sampleWithNewData);
      });

      it('should return NewPotrosnjaGoriva for empty PotrosnjaGoriva initial value', () => {
        const formGroup = service.createPotrosnjaGorivaFormGroup();

        const potrosnjaGoriva = service.getPotrosnjaGoriva(formGroup) as any;

        expect(potrosnjaGoriva).toMatchObject({});
      });

      it('should return IPotrosnjaGoriva', () => {
        const formGroup = service.createPotrosnjaGorivaFormGroup(sampleWithRequiredData);

        const potrosnjaGoriva = service.getPotrosnjaGoriva(formGroup) as any;

        expect(potrosnjaGoriva).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPotrosnjaGoriva should not enable id FormControl', () => {
        const formGroup = service.createPotrosnjaGorivaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPotrosnjaGoriva should disable id FormControl', () => {
        const formGroup = service.createPotrosnjaGorivaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
