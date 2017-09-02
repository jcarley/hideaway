import crypto from 'crypto';
import fs from 'fs';
import zlib from 'zlib';

export default {

  // options.fileName
  // options.password
  // options.reader
  // options.writer
  encryptStream: (options, callback) => {

    if (options === null) {
      callback(new Error("options is required"), null);
      return;
    }

    if(options.reader === null) {
      callback(new Error("reader is required"), null);
      return;
    }

    if(options.writer === null) {
      callback(new Error("writer is required"), null);
      return;
    }

    if(typeof options.password === "undefined" || options.password === null || options.password === "") {
      callback(new Error("password is required"), null);
      return;
    }

    let algorithm = 'aes-256-ctr';

    // input file
    var r = options.reader;
    // zip content
    // var zip = zlib.createGzip();
    // encrypt content

    crypto.randomBytes(256, (err, buf) => {
      if (err) throw err;
    });

    crypto.pbkdf2(options.password, 'salt', 100000, 512, 'sha512', (err, key) => {
      if (err) throw err;
      console.log(key.toString('hex'));  // '3745e48...aa39b34'
    });

    var encrypt = crypto.createCipheriv(algorithm, options.password, iv);

    // write file
    var w = options.writer;

    r.on('error', (err) => {
      console.log("READER error");
      callback(err, null);
      return;
    });

    r.on('readable', function() {
      console.log("READER readable");
      callback(null, {});
      return;
    });

    w.on('error', (err) => {
      console.log("WRITER error");
      callback(err, null);
      return;
    });

    w.on('close', () => {
      console.log("WRITER close");
      callback(err, null);
      return;
    });

    // start pipe
    r.pipe(encrypt).pipe(w);
  },

  encrypt(options, callback) {
    return this.generateSalt(options)
      .then((o) => {
        callback(null, o)
      })
  },

  computeKey(password, cb) {
  },

  generateSalt(options) {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(256, (err, buf) => {
        if (err) {
          reject(err);
          return;
        }
        options.salt = buf;
        resolve(options);
      });
    });
  },

  generateIV(options) {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(256, (err, buf) => {
        if (err) {
          reject(err);
          return;
        }
        options.iv = buf;
        resolve(options);
      });
    });
  }

}
