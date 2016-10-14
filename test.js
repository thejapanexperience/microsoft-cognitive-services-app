var util = require('util'),
https = require('https');


exports.Synthesize = function Synthesize(){

  // call tts service
  var https = require('https');

  var ttsServiceUri = "https://speech.platform.bing.com/synthesize";

  var post_option = {
    hostname: 'speech.platform.bing.com',
    port: 443,
    path: '/synthesize',
    method: 'POST'
  };

  var SsmlTemplate = "<speak version='1.0' xml:lang='en-us'><voice xml:lang='%s' xml:gender='%s' name='%s'>%s</voice></speak>";
  var post_speak_data = util.format(SsmlTemplate, 'en-US', 'Female', 'Microsoft Server Speech Text to Speech Voice (en-US, ZiraRUS)', 'THis is bollocks.');

  post_option.headers = {
    'content-type' : 'application/ssml+xml',
    'Content-Length' : post_speak_data.length,
    'X-Microsoft-OutputFormat' : 'riff-16khz-16bit-mono-pcm',
    'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzY29wZSI6Imh0dHBzOi8vc3BlZWNoLnBsYXRmb3JtLmJpbmcuY29tIiwic3Vic2NyaXB0aW9uLWlkIjoiZGZlMmM0M2YwNGQ1NDljZGI1NGIxMTg0OWEzNjM5YjMiLCJwcm9kdWN0LWlkIjoiQmluZy5TcGVlY2guUHJldmlldyIsImNvZ25pdGl2ZS1zZXJ2aWNlcy1lbmRwb2ludCI6Imh0dHBzOi8vYXBpLmNvZ25pdGl2ZS5taWNyb3NvZnQuY29tL2ludGVybmFsL3YxLjAvIiwiYXp1cmUtcmVzb3VyY2UtaWQiOiIiLCJpc3MiOiJ1cm46bXMuY29nbml0aXZlc2VydmljZXMiLCJhdWQiOiJ1cm46bXMuc3BlZWNoIiwiZXhwIjoxNDc2MzQwNzQ5fQ.SoJBkrx2Ygner3cI5aRZeoQFN55dPO0vWBBDkZ_oBWg",
    'X-Search-AppId': '07D3234E49CE426DAA29772419F436CA',
    'X-Search-ClientID': '1ECFAE91408841A480F00935DC390960',
    "User-Agent": "TTSNodeJS"
  };

  var post_req = https.request(post_option, function(res){
    var _data="";
    res.on('data', function(buffer){
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

});

post_req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
  accessToken = null;

});

post_req.write(post_data);
post_req.end();
}
Contact GitHub API Training Shop Blog About
© 2016 GitHub, Inc. Terms Privacy Security Status Help
