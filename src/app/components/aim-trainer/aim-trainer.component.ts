import { Component } from '@angular/core';
import { OptionService } from 'src/app/services/option.service';

@Component({
  selector: 'app-aim-trainer',
  templateUrl: './aim-trainer.component.html',
  styleUrls: ['./aim-trainer.component.scss']
})
export class AimTrainerComponent {

  //screens
  showPreStart: boolean = true;
  showTimer: boolean = false;
  startGame: boolean = false;
  showResultScreen: boolean = false;

  //pre-start timer
  timer: number  = 3;

  //first target generation
  leftPosition: string = `${Math.floor(Math.random() * 80)}%`;
  topPosition: string = `${Math.floor(Math.random() * 80)}%`;

  //fast clicks gamemode configs
  precisionInterval: any
  timeToFinish: number = 0
  clickOnTarget: number = 30;

  //time clicks gamemode configs
  points: number = 0;

  targetSizeMap: { [key: string]: string } = {
    'greater': '8em',
    'normal': '6em',
    'smaller': '3em',
    'all': 'all'
  };

  targetSizeName: string = ''
  targetSize: string = ''

  constructor(
    private optionService: OptionService
  ){}

  start(){
    this.optionService.data$.subscribe((data) => {
      this.targetSizeName = this.targetSizeMap[data.targetSize]
      this.targetSize = data.targetSize
      if(data.gamemode === 'precision'){
        this.startPrecisionGamemode(data.targetSize, data.moving)
      }
    })
  }

  startTimer(){
    this.showPreStart = false;
    this.showTimer = true;
    let timerInterval = setInterval(() => {
      this.timer--
    }, 1000)
    setTimeout(() => {
      clearInterval(timerInterval)
      this.showTimer = false
      this.start()
    }, 3000)
  }

  tryAgain(){
    this.showPreStart = true
    this.showResultScreen = false
    this.timer = 3;
    this.clickOnTarget = 30;
    this.timeToFinish = 0
  }

  changePosition(){
    if(this.targetSize === 'all'){
      this.targetSizeName = `${Math.floor(Math.random() * (5 + 1) + 3)}em`
    }
    this.leftPosition = `${Math.floor(Math.random() * 80)}%`
    this.topPosition = `${Math.floor(Math.random() * 80)}%`
  }

  targetClickPrecision(){
    if(this.clickOnTarget > 0){
      this.clickOnTarget--
    } else {
      clearInterval(this.precisionInterval)
      this.startGame = false
      this.showResultScreen = true
    }

    this.changePosition()
  }

  startPrecisionGamemode(targetSize: string, moving: boolean){
    this.startGame = true
    this.precisionInterval = setInterval(() => {
      this.timeToFinish += 10;
    }, 10)

  }
}
