import AppDispatcher from '../AppDispatcher'

const ServerActions ={
  gotAnalysis(data, url){
    console.log('in ServerActions');
    AppDispatcher.dispatch({
      type:'GOT_ANALYSIS',
      payload:{data, url}
    })
  },

  gotSaved(saved){
    AppDispatcher.dispatch({
      type:'GOT_SAVED',
      payload:{saved}
    })
  },

  gotAudio(){
    AppDispatcher.dispatch({
      type:'GOT_AUDIO',
    })
  }
}
export default ServerActions;
