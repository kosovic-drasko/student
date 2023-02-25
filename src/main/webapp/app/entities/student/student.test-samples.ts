import { IStudent, NewStudent } from './student.model';

export const sampleWithRequiredData: IStudent = {
  id: 23105,
  name: 'Franc Division Regional',
};

export const sampleWithPartialData: IStudent = {
  id: 65321,
  name: 'PCI',
};

export const sampleWithFullData: IStudent = {
  id: 85104,
  name: 'revolutionary',
};

export const sampleWithNewData: NewStudent = {
  name: 'Ngultrum Comoros Hawaii',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
