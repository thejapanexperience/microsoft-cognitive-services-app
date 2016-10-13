import React, { Component } from 'react';
import ToAPIActions from '../actions/ToAPIActions'
import { Card, Icon, Image, Grid, Button, Label, Rating, List, Container, Header, Item } from 'semantic-ui-react'

// const { Content, Header, Description, Group, Image } = Item;
const { Column, Row } = Grid

export default class ImagePage extends Component {
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

      let {categories, color, description, faces, tags} = analysis;

      let tagList = '';

      description.tags.forEach((tag, i) => {
        tagList += tag + ', ';
      })

      let people = faces.map((face, i) => {
        return (
          <List animated key={i}>

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

      return (
        <Container>
          <Grid columns={1}>
            <Grid.Column>

              <Image
                src={image}
                fluid
                // label={{ as: 'a', color: 'yellow', content: description.captions[0].text, icon: 'Info Circle', ribbon: true }}
                label={{ as: 'a', color: 'yellow', content: 'Save', icon: 'save', ribbon: true }}
                />
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
