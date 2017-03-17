import crypto from 'crypto';
import fs from 'fs';
import zlib from 'zlib';

export default {

  // options.password
  // options.key
  // options.filePath
  // options.reader
  // options.writer
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
  },

  // (err, result)
  encryptStream: (options, callback) => {

    if (typeof options === "undefined" && options === null) {
      callback(new Error("options is required"), null);
    }

    // if(options.reader == null) {
      // let err = new Error("");
      // callback(someerror, null);
    // }

    // if(options.writer === null) {
      // callback(someerror, null);
    // }

    // if(options.password === null || options.password === "") {
      // callback(someerror, null);
    // }

    let algorithm = 'aes-256-ctr';

    // input file
    var r = options.reader;
    // zip content
    var zip = zlib.createGzip();
    // encrypt content
    var encrypt = crypto.createCipher(algorithm, options.password);

    // write file
    var w = options.writer;

    r.on('error', (err) => {
      callback(err, null);
      return;
    });

    w.on('error', (err) => {
      callback(err, null);
      return;
    });

    r.on('readable', function() {
      callback(null, {});
    });

    // start pipe
    r.pipe(zip).pipe(encrypt).pipe(w);
  }
}
