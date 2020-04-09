import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  constructor() {
    // Conditional imports
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;
      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
    }
  }

   decodeBase64Image = (dataString) => {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};
  
    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }
  
    // response.type = matches[1];
    // response.data = new Buffer(matches[2], 'base64');
  
    return response;
 }

  getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max)); 
 }
  readSetting=()=>{
  let jsonData = require('../../Storage/Settings.json');
  return jsonData;
 }
  GetKeyboardData=()=>{
   let jsonData = require('../../Storage/KeyboardStorage.json');
   return jsonData;
  }
  PostKeyboard=(data)=>{
  var fs = require('fs'); 
   let response=[];
   response = require('../../Storage/KeyboardStorage.json');
   console.log(response)
    response.push(data)

    fs.writeFileSync("../../Storage/KeyboardStorage.json",JSON.stringify(response));
 }
       fnPostData=(path,data)=>{
       //  services.print();
     // services.Post(path,data,messagehandler);
    }

    messagehandler=(err)=>{
    
    if(!!err)
    {
        // confirm.log(err);
    }else{
        console.log("success");
    }
    }
}
