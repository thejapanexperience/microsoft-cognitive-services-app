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
      saved: MicrosoftStore.getSaved()
    }
    this._onChange = this._onChange.bind(this);
    // this._getAllSaved = this._getAllSaved.bind(this);
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
      saved: MicrosoftStore.getSaved()
    })
  }

  _delete(id){
    ToAPIActions.deleteImage(id)
    // console.log('delete!', id)
  }

  // _getAllSaved(){
  //   ToAPIActions.getSaved()
  //   this.setState ({
  //   })
  // }

  render(){
    const { saved } = this.state;
    console.log('saved', saved);
    // if(!bool){
    //   this._getAllSaved()
    //   return (<div></div>)
    // }
    {if(saved){
      return (
        <Card.Group>
          {saved.map( (image, i) => {
            // // let {created_at, id, text} = save.tweet;
            // // let image = save.tweet.user.profile_image_url;
            // // let name = save.tweet.user.name;
            let { description, requestId } = image.analysis;
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
                  {/*}<Card.Meta>
                    {created_at}
                  </Card.Meta>
                  <Card.Description>
                    {text}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui two buttons'>
                    <Button basic color='green'>Saved</Button>
                    <div onClick = {this._delete.bind(null,id)}><Button basic color='red'>Unsave</Button></div>
                  </div> */}
                </Card.Content>
              </Card>
            )
          })}
        </Card.Group>
      )
    } else {
      return (<div></div>)
    }
  }
}
}
