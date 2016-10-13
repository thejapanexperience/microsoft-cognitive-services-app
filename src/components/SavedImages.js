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
      saved: MicrosoftStore.getSaved(),
      bool: false
    }
    this._onChange = this._onChange.bind(this);
    this._getAllSaved = this._getAllSaved.bind(this);
  }
  componentWillMount() {
    MicrosoftStore.startListening(this._onChange)
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
  }

  _getAllSaved(){
    ToAPIActions.getSaved()
    this.setState ({
     bool: true
   })
  }

  render(){
    const {saved,bool} = this.state;
    if(!bool){
      this._getAllSaved()
      return (<div></div>)
    }
    {if(saved){
      return (
     <Card.Group>
       {saved.map( save => {
         let {created_at, id, text} = save.tweet;
         let image = save.tweet.user.profile_image_url;
         let name = save.tweet.user.name;
         return (
           <Card key ={id}>
             <Card.Content>
               <Image floated='right' size='mini' src={image} />
               <Card.Header>
                 {name}
               </Card.Header>
               <Card.Meta>
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
               </div>
             </Card.Content>
           </Card>
         )
       })}
     </Card.Group>
   )
 }
 }
}
  }
}
