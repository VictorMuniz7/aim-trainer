import { Component, HostListener } from '@angular/core';
import { OptionService } from 'src/app/services/option.service';

@Component({
  selector: 'app-aim-trainer',
  templateUrl: './aim-trainer.component.html',
  styleUrls: ['./aim-trainer.component.scss']
})
export class AimTrainerComponent {

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    const confirmationMessage = 'Are you sure?';
    $event.returnValue = confirmationMessage;
  }

  //screens
  showPreStart: boolean = true;
  showTimer: boolean = false;
  startGame: boolean = false;
  showResultScreen: boolean = false;

  //pre-start timer
  timer: number  = 3;

  //first target generation
  leftPosition: string = `${Math.floor(Math.random() * 76)}%`;
  topPosition: string = `${Math.floor(Math.random() * 76)}%`;

  //precision gamemode configs
  precisionInterval: any;
  timeToFinish: number = 0;
  clickOnTarget: number = 30;

  //rapid fire gamemode configs
  points: number = 0;
  rapidFireInterval: any;
  remainingTime: number = 15;

  targetSizeMap: { [key: string]: string } = {
    'greater': '8em',
    'normal': '6em',
    'smaller': '3em',
    'all': 'all'
  };

  targetSizeName: string = '';
  targetSize: string = '';

  isRunning: boolean = false;
  currentGamemode: string = '';

  movingTargets: boolean = false;

  constructor(
    private optionService: OptionService
  ){}

  start(){
    this.optionService.data$.subscribe((data) => {
      this.targetSizeName = this.targetSizeMap[data.targetSize]
      this.targetSize = data.targetSize
      this.currentGamemode = data.gamemode
      this.movingTargets = data.moving
      if(data.gamemode === 'precision' && this.isRunning === true){
        this.startPrecisionGamemode()
      }
      if(data.gamemode === 'rapid' && this.isRunning === true){
        this.startRapidFireGamemode()
      }
    })
  }

  startTimer(){
    this.showPreStart = false;
    this.showTimer = true;
    this.optionService.setGameRunning(true)
    this.isRunning = true

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
    this.optionService.setGameRunning(false)
    this.isRunning = false
    this.remainingTime = 15
    this.points = 0
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

  targetClickRapidFire(){
    this.points++
    this.changePosition()
  }

  startPrecisionGamemode(){
    this.startGame = true
    this.precisionInterval = setInterval(() => {
      this.timeToFinish += 10;
    }, 10)
  }

  startRapidFireGamemode(){
    this.startGame = true
    this.rapidFireInterval = setInterval(() => {
      if(this.remainingTime === 0){
        this.showResultScreen = true
        this.startGame = false
      }
      this.remainingTime--
    }, 1000)
  }
}
