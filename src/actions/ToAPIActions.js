import API from '../API'

const ToAPIActions = {
  imageAnalyse(url) {
    console.log('in ToAPIActions');
    API.imageAnalyse(url)
  },

  saveImage(analysis){
    console.log('in ToAPIActions');
    API.saveImage(analysis)
  },

  // deleteTweet(id) {
  //   API.deleteTweet(id)
  // },
  getSaved(){
    API.getSaved()
  }

}

export default ToAPIActions;
