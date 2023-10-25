import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OptionService } from 'src/app/services/option.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit{

  showPrecisionModeInfo: boolean = false
  showRapidModeInfo: boolean = false

  isGameRunning$ = this.optionService.isGameRunning$;

  form = this.formBuilder.group({
    gamemode: 'precision',
    targetSize: 'normal',
    moving: false
  })

  constructor(
    private formBuilder: FormBuilder,
    private optionService: OptionService
  ){}

  ngOnInit(): void {
    this.setConfiguration()
  }

  setConfiguration(){
    this.optionService.setData(this.form.value)
  }

}
