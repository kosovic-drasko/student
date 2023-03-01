import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPotrosnjaGoriva } from '../potrosnja-goriva.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../potrosnja-goriva.test-samples';

import { PotrosnjaGorivaService } from './potrosnja-goriva.service';

const requireRestSample: IPotrosnjaGoriva = {
  ...sampleWithRequiredData,
};

describe('PotrosnjaGoriva Service', () => {
  let service: PotrosnjaGorivaService;
  let httpMock: HttpTestingController;
  let expectedResult: IPotrosnjaGoriva | IPotrosnjaGoriva[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PotrosnjaGorivaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a PotrosnjaGoriva', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const potrosnjaGoriva = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(potrosnjaGoriva).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PotrosnjaGoriva', () => {
      const potrosnjaGoriva = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(potrosnjaGoriva).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PotrosnjaGoriva', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PotrosnjaGoriva', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a PotrosnjaGoriva', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addPotrosnjaGorivaToCollectionIfMissing', () => {
      it('should add a PotrosnjaGoriva to an empty array', () => {
        const potrosnjaGoriva: IPotrosnjaGoriva = sampleWithRequiredData;
        expectedResult = service.addPotrosnjaGorivaToCollectionIfMissing([], potrosnjaGoriva);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(potrosnjaGoriva);
      });

      it('should not add a PotrosnjaGoriva to an array that contains it', () => {
        const potrosnjaGoriva: IPotrosnjaGoriva = sampleWithRequiredData;
        const potrosnjaGorivaCollection: IPotrosnjaGoriva[] = [
          {
            ...potrosnjaGoriva,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addPotrosnjaGorivaToCollectionIfMissing(potrosnjaGorivaCollection, potrosnjaGoriva);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PotrosnjaGoriva to an array that doesn't contain it", () => {
        const potrosnjaGoriva: IPotrosnjaGoriva = sampleWithRequiredData;
        const potrosnjaGorivaCollection: IPotrosnjaGoriva[] = [sampleWithPartialData];
        expectedResult = service.addPotrosnjaGorivaToCollectionIfMissing(potrosnjaGorivaCollection, potrosnjaGoriva);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(potrosnjaGoriva);
      });

      it('should add only unique PotrosnjaGoriva to an array', () => {
        const potrosnjaGorivaArray: IPotrosnjaGoriva[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const potrosnjaGorivaCollection: IPotrosnjaGoriva[] = [sampleWithRequiredData];
        expectedResult = service.addPotrosnjaGorivaToCollectionIfMissing(potrosnjaGorivaCollection, ...potrosnjaGorivaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const potrosnjaGoriva: IPotrosnjaGoriva = sampleWithRequiredData;
        const potrosnjaGoriva2: IPotrosnjaGoriva = sampleWithPartialData;
        expectedResult = service.addPotrosnjaGorivaToCollectionIfMissing([], potrosnjaGoriva, potrosnjaGoriva2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(potrosnjaGoriva);
        expect(expectedResult).toContain(potrosnjaGoriva2);
      });

      it('should accept null and undefined values', () => {
        const potrosnjaGoriva: IPotrosnjaGoriva = sampleWithRequiredData;
        expectedResult = service.addPotrosnjaGorivaToCollectionIfMissing([], null, potrosnjaGoriva, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(potrosnjaGoriva);
      });

      it('should return initial array if no PotrosnjaGoriva is added', () => {
        const potrosnjaGorivaCollection: IPotrosnjaGoriva[] = [sampleWithRequiredData];
        expectedResult = service.addPotrosnjaGorivaToCollectionIfMissing(potrosnjaGorivaCollection, undefined, null);
        expect(expectedResult).toEqual(potrosnjaGorivaCollection);
      });
    });

    describe('comparePotrosnjaGoriva', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.comparePotrosnjaGoriva(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.comparePotrosnjaGoriva(entity1, entity2);
        const compareResult2 = service.comparePotrosnjaGoriva(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.comparePotrosnjaGoriva(entity1, entity2);
        const compareResult2 = service.comparePotrosnjaGoriva(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.comparePotrosnjaGoriva(entity1, entity2);
        const compareResult2 = service.comparePotrosnjaGoriva(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
