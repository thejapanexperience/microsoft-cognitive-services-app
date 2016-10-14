const fs = require('fs');
const path = require('path');
const filename = path.join(__dirname,'../data/data.json');
const uuid = require('uuid');
const axios = require('axios');
const util = require('util');
const https = require('https');
const connection = require('../config/db');
var watson = require('watson-developer-cloud');

const squel = require('squel').useFlavour('mysql');

const tablename = 'imageAnalytics';

connection.query(`CREATE TABLE IF NOT EXISTS ${tablename} (
  analysis TEXT,
  id TEXT
)`, err => {
  if (err) throw err;
});

exports.write = function(newData,cb) {
  // let json = JSON.stringify(newData);
  // fs.writeFile(filename,json,cb);
}

exports.saveAnalysis = (analysis) => new Promise ((res, rej) => {
  console.log('analysis in models', analysis)
  let analysisStr = JSON.stringify(analysis);
  let analysisId = analysis.analysis.requestId
  let sql = squel.insert()
  .into(tablename)
  .set('analysis', analysisStr)
  .set('id', analysisId)
  .toString()

  connection.query(sql, (err, result) => {
    console.log('result: ', result)
    if(err) return rej(err);
    res(result);
  });
})

// exports.deleted = (idValue) => new Promise ((res, rej) => {
//   console.log('in models.js')
//   console.log('id: ', idValue)
//     let sql = squel.delete()
//       .from(tablename)
//       .where(`id = ${idValue}`)
//       .toString()
//
//       connection.query(sql, (err, result) => {
//         console.log('result: ', result)
//         if(err) return rej (err)
//         res(result)
//       })
//   })

exports.deleted = function(idValue) {
  return new Promise((resolve, reject) => {
    console.log('tablename: ', tablename)
    console.log('idValue: ', idValue)
    let sql = squel.delete()
    .from(tablename)
    .where(`id = '${idValue}'`)
    .toString()
    console.log('sql: ', sql)
    connection.query(sql, (err, result) => {
      console.log('result: ', result)
      if(err) return reject (err)
      resolve(result)
    })
  })
}

// }
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
// }
// );

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

exports.textToSpeech = (str, id) => new Promise ((res, rej) => {
  console.log('text-to-speech');
  console.log('str: ', str)
  // Micro.audioAnalyze(req.body.string, res.handle);
  // .then((data) => {res.send(data)})
  // .catch((err) => {res.status(400).send(err)})
  var text_to_speech = watson.text_to_speech({
    username: "d1b8b544-5195-4680-89e6-6c0fe3b9a2b1",
    password: "PsxqARuMoDHJ",
    version: 'v1'
  });

  var params = {
    text: str,
    voice: 'en-US_AllisonVoice',
    accept: 'audio/wav'
  };

  // Pipe the synthesized text to a file.
  text_to_speech.synthesize(params).pipe(fs.createWriteStream(`./build/${id}.wav`))
})
