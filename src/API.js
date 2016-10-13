import axios, { get, post, put } from 'axios';
import ServerActions from './actions/ServerActions';

const API ={
  imageAnalyse(url){
    console.log('in API');
    console.log('url: ', url)
    post(`https://api.projectoxford.ai/vision/v1.0/analyze?visualFeatures=Categories,Description,Faces,Tags,ImageType,Color,Adult`,{
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

  saveImage(analysis){
    post('/api/saved',{analysis})
    .then( res => {
      ServerActions.gotSaved(res.data)
    })
    .catch(console.error)
  },

  deleteImage(id){
    axios.delete(`/api/saved/${id}`)
    .then( res => {
      ServerActions.gotSaved(res.data)
    })
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
