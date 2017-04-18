const chai = require('chai')
const mainFile = require('../index.js')

var expect = chai.expect

describe('First build and test', () => {
  it('should built without error', function(done) {
    console.log('built without error')
    done()
  })
})
