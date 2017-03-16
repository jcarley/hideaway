import { expect } from 'chai';
import encryptor from '../../app/lib/encrypt';

require('../sinon-setup.js');

describe('lib', () => {

  describe('encrypt', () => {

    it('should encrypt a file', (done) => {
      let options = {
        password: "secret",
        key: "/categories/documents/file.txt",
        filePath: "file.txt"
      };
      encryptor.encrypt(options, (err, result) => {
        expect(result.ID).to.be.eql("");
        expect(result.IV).to.be.eql("");
        done();
      });
    });

  });
});

