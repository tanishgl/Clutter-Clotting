//File System organizer
//Working :- In the command line, enter the command to perform the required function and the target directory which needs to be organized.
/* There are 3 commands available 
   1. organize :- which will organize the target directory.
   2. tree     :- which will print the tree-like view of the target directory.
   3. help     :- which will print the help menu.
*/

/***** Imports ******/
const fs = require('fs');
const path = require('path');
const organizeModule = require('./organize.js');
const treeModule = require('./tree.js');
const helpModule = require('./help.js');

/*1***** Obtain the command and the target directory *****1*/
inputArr = process.argv.slice(2);

let command = inputArr[0];

//clutterDir is our target directory. It refers to the full pathname of the target directory.
let clutterDir = inputArr[1];

/*2***** Call the desired functions *****2*/
switch(command){
  case 'tree':
    treeModule.treeKey(clutterDir);
    break;
  case 'organize':
    organizeModule.organizeKey(clutterDir);
    break;
  case 'help':
    helpModule.helpKey();
    break;
  default:
    console.log("Command Not Identified!");
}
