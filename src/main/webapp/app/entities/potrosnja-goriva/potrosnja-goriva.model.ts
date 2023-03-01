export interface IPotrosnjaGoriva {
  id: number;
  predjenoKm?: number | null;
  potrosnjaOtvoreno?: number | null;
}

export type NewPotrosnjaGoriva = Omit<IPotrosnjaGoriva, 'id'> & { id: null };
