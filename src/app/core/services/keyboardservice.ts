import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import {SharedService} from './Sharedservice';
//import {SharedService} from 'src/app/core/services/Sharedservice';
//import {iohook} from 'iohook'

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;
  ioHook: any;
  main_key: any;
  response:any;

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  constructor(private sharedservice:  SharedService) {
    
    // Conditional imports
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;
      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
    }
    this.ioHook = window.require('iohook');
    this.response= this.sharedservice.readSetting();
 //   main_key=0;
   setInterval(()=>{
     this.response = this.sharedservice.readSetting();
   if(this.main_key!=0)
     {
   let object={'Type':"Keyboard",'Out':this.main_key};
      this.sharedservice.PostKeyboard(object);
     }
    this.main_key="";
   },this.response.Keyboard)
   this.ioHook.on('keydown', function(e)
   {
   
    if(this.response.KeyboardEnable==true)
    {
     
         this.main_key++;
    }
   });
   
   this.ioHook.start();
   
   this.ioHook.start(true);
  }
   
//  this.response= this.sharedservice.readSetting();
//  //   main_key=0;
//    setInterval(()=>{
//      this.response = this.sharedservice.readSetting();
//    if(this.main_key!=0)
//      {
//    let object={'Type':"Keyboard",'Out':this.main_key};
//       this.sharedservice.PostKeyboard(object);
//      }
//     this.main_key="";
//    },this.response.Keyboard)


}

///////
// module.exports = function() {
//     let shared=require("../../shared/Shared.js");
  
//   const ioHook = require('../../../../node_modules/iohook');
//   let response= shared.readSetting();
  
//   let main_key=0;
//   setInterval(function(){
//     response= shared.readSetting();
//   if(main_key!=0)
//     {
//   let object={'Type':"Keyboard",'Out':main_key};
//      shared.PostKeyboard(object);
//     }
//    main_key="";
//   },response.Keyboard)
    
//   ioHook.on('keydown', function(e)
//   {
  
//    if(response.KeyboardEnable==true)
//    {
    
//         main_key++;
//    }
//   });
  
//   ioHook.start();
  
//   ioHook.start(true);
//   }
