import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPotrosnjaGoriva } from '../potrosnja-goriva.model';

@Component({
  selector: 'jhi-potrosnja-goriva-detail',
  templateUrl: './potrosnja-goriva-detail.component.html',
})
export class PotrosnjaGorivaDetailComponent implements OnInit {
  potrosnjaGoriva: IPotrosnjaGoriva | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ potrosnjaGoriva }) => {
      this.potrosnjaGoriva = potrosnjaGoriva;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
