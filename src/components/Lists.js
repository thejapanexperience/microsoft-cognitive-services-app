import React, { Component } from 'react';
import ToAPIActions from '../actions/ToAPIActions'
import { Card, Icon, Image ,Grid ,Button , Label ,Rating ,List, Container} from 'semantic-ui-react'
const { Column, Row } = Grid

export default class Lists extends Component {
  constructor(){
    super();
    // this._like= this._like.bind(this);
  }

 // _like(tweet){
 //  ToAPIActions.save(tweet);
 // }

  render(){
    const {analysis, image} = this.props;
    if(analysis){
      console.log('in Lists');
      console.log('analysis: ', analysis)
      console.log('image: ', image)

      let {categories, color, description, faces, tags} = analysis

      return (
        <Container textAlign='center'>
          <Card color='yellow' textAlign='center'>
            <Image src={image} />
            <Card.Header>{description.captions[0].text}</Card.Header>
            <Card.Content>
              <Card.Description>
                {description.captions[0].confidence}
              </Card.Description>
              <Button
                color='yellow'
                content='Save Analysis'
                icon='heart'
                size ="mini"
              />
            </Card.Content>

          </Card>
        </Container>
        )
      } else {
        return(<Container textAlign='center'>
          <h1>Submit an image url to get your analysis</h1>
        </Container>)
      }

  }
}
