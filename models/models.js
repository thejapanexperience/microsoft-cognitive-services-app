const fs = require('fs');
const path = require('path');
const filename = path.join(__dirname,'../data/data.json');
const uuid = require('uuid');
const axios = require('axios');
const util = require('util');
const https = require('https');
const connection = require('../config/db');

const squel = require('squel').useFlavour('mysql');

const tablename = 'imageAnalytics';

connection.query(`CREATE TABLE IF NOT EXISTS ${tablename} (
  analysis TEXT
)`, err => {
  if (err) throw err;
});

exports.write = function(newData,cb) {
  // let json = JSON.stringify(newData);
  // fs.writeFile(filename,json,cb);
}

exports.saveAnalysis = (analysis) => new Promise ((res, rej) => {
  let analysisStr = JSON.stringify(analysis);
  console.log('analysis in models', analysis)
  let sql = squel.insert()
    .into(tablename)
    .set('analysis', analysisStr)
    .toString();

  connection.query(sql, (err, result) => {
    if(err) return rej(err);
    res(result);
  });



  // fs.readFile(filename, (err, buffer) => {
  //   if (err) return rej(err)
  //   try {
  //     var data = JSON.parse(buffer)
  //   } catch (e) {
  //     var data = []
  //     return rej('failed')
  //   }
  //   data.push(analysis)
  //   const json = JSON.stringify(data)
  //   fs.writeFile(filename, json, (err) => {
  //     if (err) throw err
  //   })
  //   res(data)
  // })
})

exports.deleted = (id) => new Promise ((res, rej) => {
  // fs.readFile(filename, (err, buffer) => {
  //   if (err) return rej(err)
  //   try {
  //     var data = JSON.parse(buffer)
  //   } catch (e) {
  //     var data = []
  //     return rej('failed')
  //   }
  //   let NewData = data.filter( d => {
  //     return d.analysis.requestId != id})
  //     const json = JSON.stringify(NewData)
  //     fs.writeFile(filename, json, (err) => {
  //       if (err) throw err
  //     })
  //     res(NewData)
  //   })
}
);

exports.getSaved = () => new Promise ((res, rej) => {
  console.log('in models getSaved')
  connection.query(`SELECT * FROM ${tablename}`, (err, analysis) => {
    console.log('analysis: ', analysis);
    if (err) return rej(err);
      // try {
      //   var data = JSON.parse(analysis)
      // } catch (e) {
      //   var data = []
      //   return rej('failed')
      // }
    // let parsedAnalysis = JSON.parse(analysis);
    // console.log('data in models: ', analysis);
    res(analysis);
  });
  // fs.readFile(filename, (err, buffer) => {
  //   if (err) return rej(err)
  //   try {
  //     var data = JSON.parse(buffer)
  //   } catch (e) {
  //     var data = []
  //     return rej('failed')
  //   }
  //   const json = JSON.stringify(data)
  //   fs.writeFile(filename, json, (err) => {
  //     if (err) throw err
  //   })
  //   res(data)
  // })
})

exports.audioAnalyze = (str, cb) => {

  var ttsServiceUri = "https://speech.platform.bing.com/synthesize";

  var post_option = {
    hostname: 'speech.platform.bing.com',
    port: 443,
    path: '/synthesize',
    method: 'POST'
  };

  var SsmlTemplate = "<speak version='1.0' xml:lang='en-us'><voice xml:lang='%s' xml:gender='%s' name='%s'>%s</voice></speak>";
  var post_speak_data = util.format(SsmlTemplate, 'en-US', 'Female', 'Microsoft Server Speech Text to Speech Voice (en-US, ZiraRUS)', 'This is a demo to call microsoft text to speach service in javascript.');

  post_option.headers = {
    'content-type' : 'application/ssml+xml',
    'Content-Length' : post_speak_data.length,
    'X-Microsoft-OutputFormat' : 'riff-16khz-16bit-mono-pcm',
    'Authorization': 'Bearer ' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzY29wZSI6Imh0dHBzOi8vc3BlZWNoLnBsYXRmb3JtLmJpbmcuY29tIiwic3Vic2NyaXB0aW9uLWlkIjoiZGZlMmM0M2YwNGQ1NDljZGI1NGIxMTg0OWEzNjM5YjMiLCJwcm9kdWN0LWlkIjoiQmluZy5TcGVlY2guUHJldmlldyIsImNvZ25pdGl2ZS1zZXJ2aWNlcy1lbmRwb2ludCI6Imh0dHBzOi8vYXBpLmNvZ25pdGl2ZS5taWNyb3NvZnQuY29tL2ludGVybmFsL3YxLjAvIiwiYXp1cmUtcmVzb3VyY2UtaWQiOiIiLCJpc3MiOiJ1cm46bXMuY29nbml0aXZlc2VydmljZXMiLCJhdWQiOiJ1cm46bXMuc3BlZWNoIiwiZXhwIjoxNDc2MzQwNzQ5fQ.SoJBkrx2Ygner3cI5aRZeoQFN55dPO0vWBBDkZ_oBWg",
    'X-Search-AppId': '07D3234E49CE426DAA29772419F436CA',
    'X-Search-ClientID': '1ECFAE91408841A480F00935DC390960',
    "User-Agent": "TTSNodeJS"
  };

  var post_req = https.request(post_option, function(res){
    console.log(res._readableState);
    console.log('res: ', res.on);
    var _data="";
    res.on('data', (buffer) => {
      console.log('buffer: ', buffer);
      //get the wave
      _data += buffer;
    });

    // end callback
    res.on('end', function(){

      console.log('wave data.length: ' + _data.length);
    });

    post_req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });
  });

  console.log('\n\ntts post_speak_data: ' + post_speak_data + '\n');
  post_req.write(post_speak_data);
  post_req.end();

  post_req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
    accessToken = null;

  });
};


// 'X-Search-AppId': '07D3234E49CE426DAA29772419F436CA',
//         'X-Search-ClientID': '1ECFAE91408841A480F00935DC390960',
