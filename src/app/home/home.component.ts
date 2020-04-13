import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../core/services';
import { SharedService } from '../core/services';
import { KeyboardService } from '../core/services';
import * as fs from 'fs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  settings: any;

  constructor(
    public electronService: ElectronService,
    private sharedService: SharedService,
    private keyboardService: KeyboardService,
  ) { }

  ngOnInit(): void {
    this.settings = this.sharedService.readSetting();
    console.log(this.settings);

  }
  UpdateSetting() {
    try {
      fs.writeFileSync("src/app/Storage/Settings.json", JSON.stringify(this.settings));
      alert("Record Updated Successfully");
    }
    catch (e) {
      console.log(e);
      alert("Operation unsuccessfull");
    }

  }

}
