import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ServiceObservableService } from '../service/service-observable.service';
import { Observable, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit, OnDestroy {
  tableArray = [];
  code = [];
  grid = [];
  @Input() paymentInput: string;
  @Input() amountInput: number;
  public allDataCode$: Observable<any[]>;
  public allDataMatrix$: Observable<[]>;
  polling: any;
  subscriptions = [];



  constructor(
    public dataObserv: ServiceObservableService,
  ) { }

  ngOnInit(): void {
    this.allDataCode$ = this.dataObserv.getSubjectCode();
    let subscription = this.allDataCode$.subscribe(res => {
      console.log("res do code no payment: ",res);
      this.code = res;
    })
    this.subscriptions.push(subscription);

    this.allDataMatrix$ = this.dataObserv.getSubjectMatrix();
    subscription = this.allDataMatrix$.subscribe(res => {
      console.log("res Matrix no payment: ",res);
      this.grid = res;
    })
    this.subscriptions.push(subscription);
    this.tableArray = this.dataObserv.getPayments();
  }

  ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

  add() {
    this.tableArray.push({ name: this.paymentInput, amount: this.amountInput, code: this.code, grid: this.grid })
    this.dataObserv.setTable(this.tableArray);
  }
}
