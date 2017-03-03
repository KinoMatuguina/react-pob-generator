/**
* FileUtils
*/


import fileType from 'file-type';

export default class FileUtils {
  static validateFileType(file, accept, validTypeCB) {
    const fileReader = new FileReader();
    fileReader.onload = function(e) {
        const int32View = new Uint8Array(e.target.result);
        const type = fileType(int32View);

        const splittedType = type.mime.split('/');
        let validType = false;
        if (accept && typeof accept === 'string') {
          console.log(`TYPE of accept: ${typeof accept}`);

          let acceptedType = accept.split('/');

          if (acceptedType[1] === "*") {
            if (splittedType[0] === acceptedType[0]) {
              validType = true;
            }
          } else {
            if (type === accept) {
              validType = true;
            }
          }
        }

        if (validType) {
          validTypeCB && validTypeCB(type.mime);
        }
    };
  fileReader.readAsArrayBuffer(file);
  }
}
