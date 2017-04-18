# **tesseract-wrapper-api**
  Simple API with a post endpoint to send a image to be OCRed

# PLEASE NOTE
  This module is open for public usage, but I have developed it solely for creating an API endpoint on a private VPS. It has a hard dependency of [tesseract](https://github.com/tesseract-ocr). You need to have it compiled and its CLI working to use this module. Please read [this](https://github.com/tesseract-ocr/tesseract/wiki/Compiling).
  This is why there is no TravisCI for the module for now, I plan creating a complex deployment later on. If you wanna help, I'd be more than glad to work with you.

## Installation and usage:
  ```
  $ git clone https://github.com/midyan/tesseract-wrapper-api.git
  $ npm install
  $ node index.js
  ```

# The API
  Simple API with a GET endpoint for testing connection and a POST endpoint for sending the image data and OCR language as a JSON object.

## Endpoints
  - [/api/test](#/api/test): Simple test GET method to get response object
  - [/api/ocr](#/api/ocr): POST method to send and JSON object with the image data and the language to be OCRed


### /api/test

  ```javascript
  unirest
    .get('http://127.0.0.1:7000/api/test')
    .end(result => {
      console.log(result.body)
    })
  ```

  The log would be:

  ```javascript
    { message: 'API Testing here' }
  ```


### /api/ocr

  ```javascript
  var options = {
    data: new Buffer(data).toString('base64'),
    lang: 'eng'
  }

  unirest
    .post('http://127.0.0.1:7000/api/ocr')
    .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
    .send(options)
    .end(result => {
      if(result.status == 500) return new Error(result.body)
      console.log(result.body)
    })
  ```

  The log would be:
  ```javascript
    { fileContent: '2x" -7x +3 = 0\n(2x -1) (x -3)= 0\n\n' }
  ```

# How to test it?
  To run all unit testing simply do:
  ```
  npm test
  ```
