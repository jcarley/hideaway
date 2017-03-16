import crypto from 'crypto';
import fs from 'fs';
import zlib from 'zlib';

export default {

  // options.password
  // options.key
  // options.filePath
  encrypt: (options, callback) => {

    let algorithm = 'aes-256-ctr';

    // input file
    var r = fs.createReadStream(options.filePath);
    // zip content
    var zip = zlib.createGzip();
    // encrypt content
    var encrypt = crypto.createCipher(algorithm, options.password);

    // write file
    var w = fs.createWriteStream('file.out.txt');

    // start pipe
    r.pipe(zip).pipe(encrypt).pipe(w);

    callback();
  }
}
