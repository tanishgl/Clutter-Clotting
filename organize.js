/***** Imports ******/
const fs = require('fs');
const path = require('path');
const clc = require('cli-color');

/***** Extension Types  *****/
let types = {
  media: ["mp4", "mkv","mp3"],
  archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
  documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex', 'js'],
  app: ['exe', 'dmg', 'pkg', "deb"]
}

/*3***** ORGANIZE FUNCTION *****3*/

function organizeFn(clutterDir){

  //Confirm if the application user passed something.
  if(clutterDir == undefined){

    console.log("Pathname not specified !");
    return;

  } else {

    //Confirm if the passed pathname is correct.
    let doesExist = fs.existsSync(clutterDir);

    if(doesExist){
      //Make subdirectory "organized_files" withing clutter directory.
      let organizedDir = path.join(clutterDir, 'organized_files');

      let doesOrganizeExist = fs.existsSync(organizedDir);

      //Make the directory.
      if(!doesOrganizeExist){
        fs.mkdirSync(organizedDir);
      }
      

      //Read the contents (files and folders) of the clutter directory.
      let files = fs.readdirSync(clutterDir);

      for(let i=0; i<files.length; i++){

        //file refers to each file.
        let file = files[i];

        //File Address
        let fileAddress = path.join(clutterDir, file);

        //check whether the file is actually a file or a folder.
        let isFile = fs.lstatSync(fileAddress).isFile();

        if(isFile){
          //It's a file.

          //Get the file type.
          let fileType = getFileType(files[i]);

          //Finally, cut it from clutteredDir and paste it to organizedDir.
          cutPaste(fileAddress, fileType, organizedDir);

        }
      }

    } else {
      console.log("Pathname specified is incorrect !")
    }

  }
}


function cutPaste(srcAddress, fileType, organizedDir) {

  //UltimateDir refers to sub directory (specific media type) within the organizedDir.
  ultimateDir = path.join(organizedDir, fileType);
  
  let doesExist = fs.existsSync(ultimateDir);

  if(!doesExist){
    fs.mkdirSync(ultimateDir);
  }

  let fileBaseName = path.basename(srcAddress);
  let ultimatePath = path.join(ultimateDir, fileBaseName);
  fs.copyFileSync(srcAddress, ultimatePath);
  fs.unlinkSync(srcAddress);

  console.log(clc.blackBright(fileBaseName) + clc.greenBright(" sent to ") + clc.redBright("organized_files/") + clc.redBright(fileType));
}


function getFileType(filepath) {

  //path.extname returns the extension with '.' prefix. So, slice the dot.
  let fileExtension = path.extname(filepath).slice(1);

  for(let type in types){
    typeArr = types[type];

    for(let i=0; i<typeArr.length; i++){
      if(typeArr[i]==fileExtension){
        return type;
      }
    }
  }

  return 'others';

}


module.exports = {
  organizeKey : organizeFn
}