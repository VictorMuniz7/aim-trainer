import { Component } from '@angular/core';

@Component({
  selector: 'app-aim-trainer',
  templateUrl: './aim-trainer.component.html',
  styleUrls: ['./aim-trainer.component.scss']
})
export class AimTrainerComponent {

  showPreStart: boolean = true;
  showTimer: boolean = false;
  startGame: boolean = false;
  showResultScreen: boolean = false;

  timer: number  = 3;

  leftPosition: string = `${Math.floor(Math.random() * 80)}%`;
  topPosition: string = `${Math.floor(Math.random() * 80)}%`;

  interval: any
  timeToFinish: number = 0

  points: number = 0;
  clickOnTarget: number = 30;

  start(){
    this.showTimer = true;
    this.showPreStart = false;
    let interval = setInterval(() => {
      this.timer--
    }, 1000)
    setTimeout(() => {
      clearInterval(interval)
      this.showTimer = false
      this.startGame = true
      this.interval = setInterval(() => {
        this.timeToFinish += 10;
      }, 10)
    }, 3000)

  }

  tryAgain(){
    this.showPreStart = true
    this.showResultScreen = false
    this.timer = 3;
    this.clickOnTarget = 30;
    this.timeToFinish = 0
  }

  targetClick(){
    if(this.clickOnTarget > 0){
      this.clickOnTarget--
    } else {
      clearInterval(this.interval)
      this.startGame = false
      this.showResultScreen = true
    }

    this.leftPosition = `${Math.floor(Math.random() * 80)}%`
    this.topPosition = `${Math.floor(Math.random() * 80)}%`
  }
}
