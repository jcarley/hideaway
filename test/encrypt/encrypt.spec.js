import fs from 'fs';
import path from 'path';
import streams from 'memory-streams';
import { expect } from 'chai';

import encryptor from '../../app/lib/encrypt';

require('../sinon-setup.js');

describe('lib', () => {

  describe('encrypt', () => {

    it('should encrypt a file', (done) => {

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

  });
});

