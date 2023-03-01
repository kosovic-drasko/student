import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IPotrosnjaGoriva, NewPotrosnjaGoriva } from '../potrosnja-goriva.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPotrosnjaGoriva for edit and NewPotrosnjaGorivaFormGroupInput for create.
 */
type PotrosnjaGorivaFormGroupInput = IPotrosnjaGoriva | PartialWithRequiredKeyOf<NewPotrosnjaGoriva>;

type PotrosnjaGorivaFormDefaults = Pick<NewPotrosnjaGoriva, 'id'>;

type PotrosnjaGorivaFormGroupContent = {
  id: FormControl<IPotrosnjaGoriva['id'] | NewPotrosnjaGoriva['id']>;
  predjenoKm: FormControl<IPotrosnjaGoriva['predjenoKm']>;
  potrosnjaOtvoreno: FormControl<IPotrosnjaGoriva['potrosnjaOtvoreno']>;
};

export type PotrosnjaGorivaFormGroup = FormGroup<PotrosnjaGorivaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PotrosnjaGorivaFormService {
  createPotrosnjaGorivaFormGroup(potrosnjaGoriva: PotrosnjaGorivaFormGroupInput = { id: null }): PotrosnjaGorivaFormGroup {
    const potrosnjaGorivaRawValue = {
      ...this.getFormDefaults(),
      ...potrosnjaGoriva,
    };
    return new FormGroup<PotrosnjaGorivaFormGroupContent>({
      id: new FormControl(
        { value: potrosnjaGorivaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      predjenoKm: new FormControl(potrosnjaGorivaRawValue.predjenoKm, {
        validators: [Validators.required],
      }),
      potrosnjaOtvoreno: new FormControl(potrosnjaGorivaRawValue.potrosnjaOtvoreno),
    });
  }

  getPotrosnjaGoriva(form: PotrosnjaGorivaFormGroup): IPotrosnjaGoriva | NewPotrosnjaGoriva {
    return form.getRawValue() as IPotrosnjaGoriva | NewPotrosnjaGoriva;
  }

  resetForm(form: PotrosnjaGorivaFormGroup, potrosnjaGoriva: PotrosnjaGorivaFormGroupInput): void {
    const potrosnjaGorivaRawValue = { ...this.getFormDefaults(), ...potrosnjaGoriva };
    form.reset(
      {
        ...potrosnjaGorivaRawValue,
        id: { value: potrosnjaGorivaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): PotrosnjaGorivaFormDefaults {
    return {
      id: null,
    };
  }
}
