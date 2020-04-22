import { Injectable } from "@angular/core";
import { of, Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ServiceObservableService {

  simpleSubjectCode = new Subject();
  simpleSubjectTable = new Subject();
  simpleSubjectMatrix = new Subject();
  private paymentArray = [];
  private matrixArray = [];

  constructor() {
    this.getSubjectObservTable().subscribe((res) => {
      this.paymentArray = res;
    });

    this.getSubjectMatrix().subscribe((res) => {
      this.matrixArray = res;
    });
  }

  public getSubjectCode(): Observable<any> {
    return this.simpleSubjectCode.asObservable();
  }

  public setCode(code) {
    this.simpleSubjectCode.next(code);
  }

  public getSubjectObservTable(): Observable<any> {
    return this.simpleSubjectTable.asObservable();
  }

  public setTable(objectTable: any) {
    this.simpleSubjectTable.next(objectTable);
  }

  public getPayments() {
    return this.paymentArray;
  }

  public getSubjectMatrix(): Observable<any> {
    return this.simpleSubjectMatrix.asObservable();
  }

  public setMatrix(matrix: Array<any>) {
    return this.simpleSubjectMatrix.next(matrix);
  }

  public getMatrix() {
    return this.matrixArray;
  }
}
