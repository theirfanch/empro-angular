import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../core/services';
import { SharedService } from '../core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( 
    public electronService: ElectronService,
    private sharedService: SharedService
     ) { }

  ngOnInit(): void { 
    let response=this.sharedService.readSetting();
    console.log(response);
  }

}
