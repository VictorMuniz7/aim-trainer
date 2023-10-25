import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  private dataSubject = new BehaviorSubject<any>(null)
  data$ = this.dataSubject.asObservable()

  private isGameRunningSubject = new BehaviorSubject<boolean>(false);
  public isGameRunning$ = this.isGameRunningSubject.asObservable();

  setData(data: any){
    this.dataSubject.next(data)
  }

  setGameRunning(value: boolean) {
    this.isGameRunningSubject.next(value);
  }
}
