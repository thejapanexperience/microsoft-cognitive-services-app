import React, { Component } from 'react'
import MicrosoftStore from '../stores/MicrosoftStore'
import ImagePage from './ImagePage'
import SearchBar from './SearchBar'
import ToAPIActions from '../actions/ToAPIActions'
import { Button, Card, Image ,Grid } from 'semantic-ui-react'
const { Column, Row } = Grid


export default class SavedImages extends Component {
  constructor () {
    super();

    this.state = {
      saved: false,
      counter: MicrosoftStore.getCounter()
    }
    this._onChange = this._onChange.bind(this);
    this._audioAnalysis = this._audioAnalysis.bind(this);
  }
  componentWillMount() {
    MicrosoftStore.startListening(this._onChange)
    ToAPIActions.getSaved()
  }

  componentWillUnmount(){
    MicrosoftStore.stopListening(this._onChange)
  }

  _onChange(){
    this.setState({
      saved: MicrosoftStore.getSaved(),
      counter: MicrosoftStore.getCounter()
    })
  }

  _delete(id){
    ToAPIActions.deleteImage(id)
    // console.log('delete!', id)
  }

  _audioAnalysis(string, requestId){
    console.log('get Audio Analysis!', string)
    ToAPIActions.audioAnalyse(string, requestId)
  }

  render(){
    const { saved, counter } = this.state;
    console.log('saved', saved);
    console.log('rendering');
    console.log('counter: ', counter)

    if (saved === true) {
      forceUpdate()
      console.log('saved: ', saved)
      this.setState({
        counter: false
      })

    }

    {if(saved){
      return (
        <div className="container">

          <Card.Group>

            {saved.map( (image, i) => {
              // // let {created_at, id, text} = save.tweet;
              // // let image = save.tweet.user.profile_image_url;
              // // let name = save.tweet.user.name;
              let { description, requestId } = image.analysis;
              let audioLocation = `../${requestId}.wav`
              return (

                <Card key ={i}>
                  <Card.Content>
                    <Image
                      label={{ as: 'a', color: 'red', corner: 'right', icon: 'delete', onClick: () => this._delete(requestId) }}
                      src={image.analysis.Image}
                    />
                    <Card.Header>
                      {description.captions[0].text}
                    </Card.Header>
                    <Button basic color='green' onClick={() => this._audioAnalysis(image.analysis.String, requestId)}>Access Audio Analysis</Button>
                    {/*}<Card.Meta>
                      {created_at}
                      </Card.Meta>
                      <Card.Description>/
                      {text}
                      </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                      <div className='ui two buttons'>
                      <Button basic color='green'>Saved</Button>
                      <div onClick = {this._delete.bind(null,id)}><Button basic color='red'>Unsave</Button></div>
                    </div> */}
                    <audio preload="auto" controls type="audio/x-wav" src={audioLocation}/>

                  </Card.Content>
                </Card>

              )
            })}
          </Card.Group>
        </div>
          )
          } else {
            return (<div></div>)
    }
  }
}
}
