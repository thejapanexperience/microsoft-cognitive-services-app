import axios, { get, post, put } from 'axios';
import ServerActions from './actions/ServerActions';

const API ={
  imageAnalyse(url){
    console.log('in API');
    console.log('url: ', url)
    post(`https://api.projectoxford.ai/vision/v1.0/analyze?visualFeatures=Categories,Description,Faces,Tags,ImageType,Color,Adult`, {
      url: url
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': '72881be634df422b8b6ae1a1a1cb8055'
      }
    })
    .then( res => {
      ServerActions.gotAnalysis(res.data, url)
    })
    .catch(console.error)
  },

  audioAnalyse(string) {
    post(`api/saved/audio-analyze/`, {
      string
    })
    .then( res => {
      console.log('res in API ', res);
    })
    .catch(err => {throw new Error("Audio Analyze FAILED: ", err)});
  },

  // audioAnalyse(string){
  //   post(`https://api.cognitive.microsoft.com/sts/v1.0/issueToken`, {
  //     headers: {
  //       'Host': 'api.cognitive.microsoft.com',
  //       'Content-Length': '0',
  //       'Ocp-Apim-Subscription-Key': '04244833f73440528dcb7b21aa4bb48f',
  //       'Cache-Control': 'no-cache',
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //
  //       // 'Content-Length': '0',
  //       // // 'Access-Control-Allow-Origin': '*',
  //       // // 'Content-Type': 'text/plain; charset=utf-8',
  //       // 'Ocp-Apim-Subscription-Key': '04244833f73440528dcb7b21aa4bb48f'
  //     }
  //   })
  //   .then( res => {
  //     console.log('res: ', res)
  //     post(`https://speech.platform.bing.com/synthesize`,{
  //       string: string
  //     }, {
  //       headers: {
  //         'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzY29wZSI6Imh0dHBzOi8vc3BlZWNoLnBsYXRmb3JtLmJpbmcuY29tIiwic3Vic2NyaXB0aW9uLWlkIjoiYzdjYmRlZDk4MDBmNGE4YjgxYzlhZmI1YmQ1YmZkYWMiLCJwcm9kdWN0LWlkIjoiQmluZy5TcGVlY2guUHJldmlldyIsImNvZ25pdGl2ZS1zZXJ2aWNlcy1lbmRwb2ludCI6Imh0dHBzOi8vYXBpLmNvZ25pdGl2ZS5taWNyb3NvZnQuY29tL2ludGVybmFsL3YxLjAvIiwiYXp1cmUtcmVzb3VyY2UtaWQiOiIiLCJpc3MiOiJ1cm46bXMuY29nbml0aXZlc2VydmljZXMiLCJhdWQiOiJ1cm46bXMuc3BlZWNoIiwiZXhwIjoxNDc2MzM0MzQ2fQ.IJhVL8F3zgvloVahYKveewdssIzYOqDWv2hGACZngvk`,
  //         'Host': 'speech.platform.bing.com',
  //         'Content-Type': 'audio/wav; samplerate=8000',
  //         'X-Microsoft-OutputFormat': 'riff-8khz-8bit-mono-mulaw',
  //         // 'X-Search-AppId': '',
  //         // 'X-Search-ClientID':'',
  //         'User-Agent':'RichardAndDonovanMicrosoftAPI',
  //         'Content-Type': 'text/plain; charset=utf-8',
  //         'Content-Length': '197',
  //         // <speak version='1.0' xml:lang='en-US'><voice xml:lang='en-US' xml:gender='Female' name='Microsoft Server Speech Text to Speech Voice (en-US, ZiraRUS)'>`${string}`I</voice></speak>
  //
  //       }
  //     })
  //   })
  //   .then( res => {
  //     console.log('in response')
  //     console.log('res: ', res)
  //     // ServerActions.gotAnalysis(res.data, url)
  //   })
  //   .catch(console.error)
  // },


  saveImage(analysis){
    console.log('in API savedImage before post');
    post('/api/saved',{analysis})
    .then( res => {
      // ServerActions.gotSaved(res.data)
    })
    .catch(console.error)
  },

  deleteImage(id){
    axios.delete(`/api/saved/${id}`)
    .then(this.getSaved)
    .catch(console.error)
  },

  getSaved(){
    get('/api/saved')
    .then( res => {
      ServerActions.gotSaved(res.data)
    })
    .catch(console.error)
  }
}

export default API
