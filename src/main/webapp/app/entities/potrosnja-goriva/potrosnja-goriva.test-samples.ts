import { IPotrosnjaGoriva, NewPotrosnjaGoriva } from './potrosnja-goriva.model';

export const sampleWithRequiredData: IPotrosnjaGoriva = {
  id: 3318,
  predjenoKm: 50969,
};

export const sampleWithPartialData: IPotrosnjaGoriva = {
  id: 40166,
  predjenoKm: 96224,
};

export const sampleWithFullData: IPotrosnjaGoriva = {
  id: 44443,
  predjenoKm: 30713,
  potrosnjaOtvoreno: 87414,
};

export const sampleWithNewData: NewPotrosnjaGoriva = {
  predjenoKm: 80282,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
