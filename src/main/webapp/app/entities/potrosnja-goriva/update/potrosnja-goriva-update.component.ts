import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { PotrosnjaGorivaFormService, PotrosnjaGorivaFormGroup } from './potrosnja-goriva-form.service';
import { IPotrosnjaGoriva } from '../potrosnja-goriva.model';
import { PotrosnjaGorivaService } from '../service/potrosnja-goriva.service';

@Component({
  selector: 'jhi-potrosnja-goriva-update',
  templateUrl: './potrosnja-goriva-update.component.html',
})
export class PotrosnjaGorivaUpdateComponent implements OnInit {
  isSaving = false;
  potrosnjaGoriva: IPotrosnjaGoriva | null = null;

  editForm: PotrosnjaGorivaFormGroup = this.potrosnjaGorivaFormService.createPotrosnjaGorivaFormGroup();

  constructor(
    protected potrosnjaGorivaService: PotrosnjaGorivaService,
    protected potrosnjaGorivaFormService: PotrosnjaGorivaFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ potrosnjaGoriva }) => {
      this.potrosnjaGoriva = potrosnjaGoriva;
      if (potrosnjaGoriva) {
        this.updateForm(potrosnjaGoriva);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const potrosnjaGoriva = this.potrosnjaGorivaFormService.getPotrosnjaGoriva(this.editForm);
    if (potrosnjaGoriva.id !== null) {
      this.subscribeToSaveResponse(this.potrosnjaGorivaService.update(potrosnjaGoriva));
    } else {
      this.subscribeToSaveResponse(this.potrosnjaGorivaService.create(potrosnjaGoriva));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPotrosnjaGoriva>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(potrosnjaGoriva: IPotrosnjaGoriva): void {
    this.potrosnjaGoriva = potrosnjaGoriva;
    this.potrosnjaGorivaFormService.resetForm(this.editForm, potrosnjaGoriva);
  }
}
