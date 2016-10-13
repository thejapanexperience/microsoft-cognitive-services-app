import React, { Component } from 'react';
import ToAPIActions from '../actions/ToAPIActions'
import { Card, Icon, Image, Grid, Button, Label, Rating, List, Container, Header, Item } from 'semantic-ui-react'

// const { Content, Header, Description, Group, Image } = Item;
const { Column, Row } = Grid

export default class ImagePage extends Component {
  constructor(){
    super();
    this._saveImageData= this._saveImageData.bind(this);
  }

  // _like(tweet){
  //  ToAPIActions.save(tweet);
  // }

  _saveImageData(textToSpeechString){
    const {analysis, image} = this.props;
    analysis.Image = image
    analysis.Save = true
    analysis.String = textToSpeechString
    console.log('_saveImageData triggered');
    console.log('analysis: ', analysis)
    ToAPIActions.saveImage(analysis)
  }

  render(){
    const {analysis, image} = this.props;
    if(analysis){
      console.log('in Lists');
      console.log('analysis: ', analysis)
      console.log('image: ', image)

      let {categories, color, description, faces, tags} = analysis;

      let tagList = '';

      description.tags.forEach((tag, i) => {
        tagList += tag + ', ';
      })
      tagList = tagList.replace(/,\s*$/, "");

      let peopleList = faces.map((face, i) => {
        return `a ${face.age} year old ${face.gender}`
      }).join(', ')

      console.log('peopleList: ', peopleList)

      let people = faces.map((face, i) => {
        return (
          <List animated key={i}>

            <List.Item>
              <List.Content>
                <List.Header as='a'>Person: {i+1}</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header as='a'>Gender:</List.Header>
                <List.Description>{face.gender}</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header as='a'>Age:</List.Header>
                <List.Description>{face.age}</List.Description>
              </List.Content>
            </List.Item>
          </List>
        )
      })


      let textToSpeechString = `Hello! How are you today? Thank you for submitting this image to be analysed by our special analyser. This is an image of ${description.captions[0].text} We are quite confident of that. There is a ${description.captions[0].confidence} chance that we are right. There are ${faces.length} people in this image. There is ${peopleList}. Thank you. Have a nice day`
      console.log('textToSpeechString: ', textToSpeechString)
      return (
        <Container>
          <Grid columns={1}>
            <Grid.Column>

              <Image
                src={image}
                fluid
                // label={{ as: 'a', color: 'yellow', content: description.captions[0].text, icon: 'Info Circle', ribbon: true }}
                label={{ as: 'a', color: 'yellow', content: 'Save', icon: 'save', ribbon: true }} onClick={this._saveImageData.bind(null, textToSpeechString)}/>
              {/* <Label as='a' basic color='yellow' size='huge'>{description.captions[0].text}</Label> */}

              <List animated verticalAlign='middle' size='massive'>
                <List.Item>
                  <List.Content>
                    <List.Header>{description.captions[0].text}</List.Header>
                  </List.Content>
                </List.Item>
              </List>
              <List animated verticalAlign='middle' size='medium'>
                <List.Item>
                  <List.Content>
                    <List.Header>{`Confidence: ${description.captions[0].confidence}`}</List.Header>
                  </List.Content>
                </List.Item>
              </List>


              {people}

              <List animated verticalAlign='middle' size='large'>
                <List.Item>
                  <List.Content>
                    <List.Header>Tags:</List.Header>
                    <List.Description>{tagList}</List.Description>
                  </List.Content>
                </List.Item>
              </List>

              {/* <Description>
                {description.captions[0].confidence}
                </Description> */}
                {/* <Button
                  color='yellow'
                  content='Save Analysis'
                  icon='heart'
                  size ="mini"
                  /> */}
                </Grid.Column>
              </Grid>
            </Container>


          )
        } else {
          return(<Container textAlign='center'>
          <h1>Submit an image url to get your analysis</h1>
        </Container>)
      }

    }
  }
