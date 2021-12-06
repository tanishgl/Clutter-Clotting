/***** Imports  *****/
const clc = require('cli-color');

/***** Styling *****/
const syntx = clc.yellowBright; 
const dirname = clc.green;

function helpFn(){
  console.log(clc.blackBright('List of all the commands :-'));
  console.log(clc.blackBright('1.') + clc.redBright(' Tree command :- ') + syntx('node fo.js tree ') + dirname('<DirName>'));
  console.log(clc.blackBright('2.') + clc.redBright(' Organize command :- ') + syntx('node fo.js organize ') + dirname('<DirName>'));
  console.log(clc.blackBright('1.') + clc.redBright(' Help command :- ') + syntx('node fo.js help'));
  
}

module.exports = {
  helpKey : helpFn
}