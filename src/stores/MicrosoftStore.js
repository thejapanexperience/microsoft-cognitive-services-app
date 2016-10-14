import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'
import Storage from '../Storage'

let _analysis = '';
let _image ='';
let _saved =''
let _audiofiles = false

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

          case 'GOT_AUDIO':
          setTimeout(() => {
            console.log('in Store got new audio file')
            _audiofiles = true
            this.emit('CHANGE')
          }, 5000)
          break;

          case 'GOT_SAVED':
          console.log('action.payload.saved', action.payload)
          _saved = action.payload.saved.map(obj => {
            let data;
            try {
              data = JSON.parse(obj.analysis);
            } catch (e) {
              console.log('parse failed')
              data = {}
            }
            return data;
          })
          console.log('_saved', _saved)
          this.emit('CHANGE');
          break;
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

  getSaved(){
    return _saved;
  }

  getCounter(){
    return _audiofiles
  }

}

export default new MicrosoftStore();
