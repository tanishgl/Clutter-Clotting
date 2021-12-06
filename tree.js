/***** Imports ******/
const fs = require('fs');
const path = require('path');
const clc = require('cli-color');

/* Styling */
const folding = clc.redBright;
const filing = clc.greenBright;

function treeFn(targetDir){
  
  //Verify that the user provided the target directory.
  if(targetDir==undefined){

    console.log('Directory not specified!');
    return;

  } else {

    let doesExist = fs.existsSync(targetDir);

    if(doesExist){

      treeView(targetDir, " ");

    } else {
      console.log('Incorrect directory!');
    }

  }

}

function treeView(targetDir, indent){

  let isFile = fs.lstatSync(targetDir).isFile();

  if(isFile){
    //Print the filename.
    let filename = path.basename(targetDir);
    console.log(filing(indent + "├──" + filename));

  } else {
    //Print the folder name.
    let foldername = path.basename(targetDir);
    console.log(folding(indent + "└──" + foldername));

    //Read the directory contents
    let dir_contents = fs.readdirSync(targetDir);

    for(let i=0; i<dir_contents.length; i++){

      //Read the file content.
      let content = dir_contents[i];
      let contentPath = path.join(targetDir, content);
      treeView(contentPath, indent+"\t");
    }
  }

}


module.exports = {
  treeKey : treeFn
}