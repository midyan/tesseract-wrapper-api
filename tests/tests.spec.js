const chai = require('chai')
const mainFile = require('../index.js')
const unirest = require('unirest')
const path = require('path')
const fs = require('fs')
const appDir = (path.resolve(__dirname) + '/').replace('tests/', '')

var expect = chai.expect

describe('First build and test', () => {
  it('should built without error', function (done) {
    done()
  })
})

describe('API testing', () => {
  it('should return test message', function (done) {
    unirest
      .get('http://127.0.0.1:7000/api/test')
      .end(result => {
        expect(result.body)
          .to.have.property('message')
          .and.to.equal('API Testing here')
        done()
      })
  })

  it('should OCR result specified', function (done) {
    fs.readFile(
      appDir + '/texts/clean_photo_test.jpg',
      (err, data) => {

        if (err) return done(err)

        var options = {
          data: new Buffer(data).toString('base64'),
          lang: 'eng'
        }

        unirest
          .post('http://127.0.0.1:7000/api/ocr')
          .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
          .send(options)
          .end(result => {
            if(result.status == 500) return done(result.body)
            console.log(result.body)
            expect(result.body)
              .to.be.an('object')
              .and.to.have.property('fileContent')
              .and.to.not.be.equal('')
            done()
          })
      }
    )
  })
})
