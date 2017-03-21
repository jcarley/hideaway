import fs from 'fs';
import path from 'path';
import streams from 'memory-streams';
import { expect } from 'chai';

import encryptor from '../../app/lib/encrypt';

require('../sinon-setup.js');

describe('lib', function() {

  describe('encrypt', function() {

    it('generates a salt', function() {
      let options = {}
      return encryptor.encrypt(options, function(err, result) {
        expect(err).to.be.null;
        expect(result.salt).to.not.be.null;
      });
    });
  });

  describe('encryptStream', () => {

    it('encrypts a file', (done) => {

      let fileToEncryptPath = path.join(process.cwd(), "test", "fixtures", "file.txt");

      let reader = fs.createReadStream(fileToEncryptPath);
      let writer = new streams.WritableStream();

      let options = {
        fileName: "file.txt",
        password: "secret",
        reader: reader,
        writer: writer
      };
      encryptor.encryptStream(options, (err, result) => {
        expect(err).to.be.null;
        expect(writer.toString()).to.not.be.eql("");
        // expect(result.ID).to.be.eql("");
        done();
      });
    });

    it('fails when no options supplied', (done) => {
      encryptor.encryptStream(null, (err, result) => {
        expect(err).to.be.an('error');
        expect(err.message).to.be.eql("options is required");
        done();
      });
    });

    it('requires a reader', (done) => {
      let options = {
        reader: null
      };
      encryptor.encryptStream(options, (err, result) => {
        expect(err).to.be.an('error');
        expect(err.message).to.be.eql("reader is required");
        done();
      });
    });

    it('requires a writer', (done) => {
      let options = {
        reader: new streams.ReadableStream('Hello World\n'),
        writer: null
      };
      encryptor.encryptStream(options, (err, result) => {
        expect(err).to.be.an('error');
        expect(err.message).to.be.eql("writer is required");
        done();
      });
    });

    it('requires a password', (done) => {
      let options = {
        password: null,
        reader: new streams.ReadableStream('Hello World\n'),
        writer: new streams.WritableStream()
      };
      encryptor.encryptStream(options, (err, result) => {
        expect(err).to.be.an('error');
        expect(err.message).to.be.eql("password is required");
        done();
      });
    });
  });
});

