import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'
import Storage from '../Storage'

let _analysis = '';
let _image ='';
// let _saved = [];

class MicrosoftStore extends EventEmitter {
  constructor(){
    super();
    AppDispatcher.register(action => {
      switch(action.type) {
        case 'GOT_ANALYSIS':
        console.log('in MicrosoftStore GOT_ANALYSIS');
        _analysis = action.payload.data;
        _image = action.payload.url
        console.log('_analysis: ', _analysis)
        this.emit('CHANGE');
        break;

        // case 'GOT_SAVED':
        // _saved = action.payload.saved;
        // this.emit('CHANGE');
        // break;
      }
    })
  }

  startListening(cb){
    this.on('CHANGE',cb);
  }

  stopListening(cb){
    this.removeListener('CHANGE',cb)
  }

  getAnalysis(){
    return _analysis;
  }

  getImage(){
    return _image;
  }

  // getSaved(){
  //   return _saved;
  // }

}

export default new MicrosoftStore();
