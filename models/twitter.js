const fs = require('fs');
const path = require('path');
const filename = path.join(__dirname,'../data/twitterList.json');
const uuid = require('uuid');


exports.write = function(newData,cb){
  let json = JSON.stringify(newData);
  fs.writeFile(filename,json,cb);
}

exports.saveTweet = (tweet) => new Promise ((res, rej) => {
  fs.readFile(filename, (err, buffer) => {
    if (err) return rej(err)
    try {
      var data = JSON.parse(buffer)
    } catch (e) {
      var data = []
      return rej('failed')
    }
    data.push(tweet)
    const json = JSON.stringify(data)
    fs.writeFile(filename, json, (err) => {
      if (err) throw err
    })
    res(data)
  })
})

exports.deleted = (id) => new Promise ((res, rej) => {
  fs.readFile(filename, (err, buffer) => {
    if (err) return rej(err)
    try {
      var data = JSON.parse(buffer)
    } catch (e) {
      var data = []
      return rej('failed')
    }
    let NewData =data.filter( d => {
      return d.tweet.id != id})
    const json = JSON.stringify(NewData)
    fs.writeFile(filename, json, (err) => {
      if (err) throw err
    })
    res(NewData)
  })
})

exports.getSaved = () => new Promise ((res, rej) => {
  fs.readFile(filename, (err, buffer) => {
    if (err) return rej(err)
    try {
      var data = JSON.parse(buffer)
    } catch (e) {
      var data = []
      return rej('failed')
    }
    const json = JSON.stringify(data)
    fs.writeFile(filename, json, (err) => {
      if (err) throw err
    })
    res(data)
  })
})
