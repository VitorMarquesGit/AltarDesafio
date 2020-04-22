import { Component, OnInit, Input } from "@angular/core";
import { ServiceObservableService } from "../service/service-observable.service";
import { Observable, interval } from "rxjs";
import * as moment from "moment";

@Component({
  selector: "app-generator",
  templateUrl: "./generator.component.html",
  styleUrls: ["./generator.component.scss"],
})
export class GeneratorComponent implements OnInit {
  varDate: string;
  secDate: string;
  polling: any;
  code: string;
  matrix = [];
  cols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",];
  arrayString = [];
  @Input() charInput: string;
  isDisabled: boolean = false;
  message: boolean = false;

  constructor(public data: ServiceObservableService) {}

  ngOnInit(): void {
    this.dateNow();
    this.polling = setInterval(() => {
      this.dateNow();
    }, 1000);
    this.populateTable();
    this.polling = setInterval(() => {
      this.populateTable();
    }, 2000);
  }

  dateNow() {
    this.varDate = moment().format("h:mm:ss a"); // 10:54:00 am
  }

  randomInt() {
    this.arrayString = [];
    do {
      const min = Math.ceil(0);
      const max = Math.floor(26);
      const randomValue = Math.floor(Math.random() * (max - min)) + min;
      const randomChar = this.alphabet[randomValue];
      this.arrayString.push(randomChar);
    } while (this.arrayString.length < 10);

    if (this.charInput != undefined) {
      this.arrayString[0] = this.charInput;
      this.arrayString[1] = this.charInput;
    }

    this.arrayString.sort(() => Math.random() - 0.5);
    return this.arrayString;
  }

  populateTable() {
    this.matrix = [];
    this.cols.forEach((elem) => {
      this.arrayString = this.randomInt();
      this.matrix.push(this.arrayString);
    });
    this.getCode();
  }

  getCode() {
    this.secDate = moment().format("ss");
    let secSplit = this.secDate.split("");
    let firstChar = this.matrix[secSplit[0]][secSplit[1]];
    let secondChar = this.matrix[secSplit[1]][secSplit[0]];

    let countFirst = 0;
    let countSecond = 0;
    let i = 0;
    let j = 0;
    let k = 0;
    let resultFirst = 0;
    let resultSecond = 0;
    let tempFirst = 0;
    let tempSecond = 0;

    this.matrix.forEach((element) => {
      for (i = 0; i < element.length; ++i) {
        if (element[i] == firstChar) {
          countFirst++;
        }
        if (element[i] == secondChar) {
          countSecond++;
        }
      }
    });

    if (countFirst > 9) {
      do {
        tempFirst = countFirst / j;
        resultFirst = Math.round(tempFirst);
        tempFirst = 0;
        j++;
      } while (resultFirst > 9);
    } else {
      resultFirst = countFirst;
    }

    if (countSecond > 9) {
      do {
        tempSecond = countSecond / k;
        resultSecond = Math.round(tempSecond);
        tempSecond = 0;
        k++;
      } while (resultSecond > 9);
    } else {
      resultSecond = countSecond;
    }

    this.code = resultFirst.toString().concat(resultSecond.toString());
    this.data.setCode(this.code);
    this.data.setMatrix(this.matrix);
  }
  disable(event) {
    if (
      event.key == 1 ||
      event.key == 2 ||
      event.key == 3 ||
      event.key == 4 ||
      event.key == 5 ||
      event.key == 6 ||
      event.key == 7 ||
      event.key == 8 ||
      event.key == 9 ||
      event.key == 0
    ) {
      event.preventDefault();
      this.charInput = undefined;
      this.message = true;
    } else {
      this.isDisabled = true;
      setTimeout(() => {
        this.isDisabled = false;
        this.charInput = "";
        this.charInput = undefined;
      }, 4000);
    }
  }
}
