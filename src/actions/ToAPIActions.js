import API from '../API'

const ToAPIActions = {
  imageAnalyse(url) {
    console.log('in ToAPIActions');
    API.imageAnalyse(url)
  },

  audioAnalyse(string) {
    console.log('in ToAPIActions');
    API.audioAnalyse(string)
  },

  saveImage(analysis){
    console.log('in ToAPIActions');
    API.saveImage(analysis)
  },

  deleteImage(id) {
    API.deleteImage(id)
  },

  getSaved(){
    API.getSaved()
  }

}

export default ToAPIActions;
