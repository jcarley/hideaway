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
    var zip = zlib.createGzip();
    // encrypt content

    crypto.randomBytes(256, (err, buf) => {
      if (err) throw err;
    });

    crypto.pbkdf2(options.password, 'salt', 100000, 512, 'sha512', (err, key) => {
      if (err) throw err;
      console.log(key.toString('hex'));  // '3745e48...aa39b34'
    });

    var encrypt = crypto.createCipheriv(algorithm, key, iv);

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
        if (err) reject(err);
        options.iv = buf;
        resolve(options);
      });
    });
  }

}