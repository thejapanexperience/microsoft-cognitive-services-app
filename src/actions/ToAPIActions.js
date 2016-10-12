import API from '../API'

const ToAPIActions = {
  imageAnalyse(url) {
    console.log('in ToAPIActions');
    API.imageAnalyse(url)
  },
  // save(tweet) {
  //   API.save(tweet)
  // },
  // deleteTweet(id) {
  //   API.deleteTweet(id)
  // },
  // getSaved(){
  //   API.getSaved()
  // }

}

export default ToAPIActions;
