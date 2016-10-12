import React, { Component } from 'react'
import MicrosoftStore from '../stores/MicrosoftStore'
import Lists from './Lists'
import SearchBar from './SearchBar'
import { Grid } from 'semantic-ui-react'
const { Column, Row } = Grid

export default class ImageAnalysePage extends Component {
  constructor () {
    super();

    this.state = {
      analysis: MicrosoftStore.getAnalysis(),
      image: MicrosoftStore.getImage()
    }
    this._onChange = this._onChange.bind(this);
  }
  componentWillMount() {
    MicrosoftStore.startListening(this._onChange)
  }

  componentWillUnmount(){
    MicrosoftStore.stopListening(this._onChange)
  }

  _onChange(){
    this.setState({
      analysis: MicrosoftStore.getAnalysis(),
      image: MicrosoftStore.getImage()
    })
  }

  render(){
    const {analysis, image} = this.state;
    return (
      <Grid>
        <Row color='yellow' textAlign='center'>
          <Column><SearchBar/></Column>
        </Row>
        <Row>
          <Column><Lists
            analysis ={analysis}
            image ={image}
                  /></Column>
        </Row>
      </Grid>
    )
  }
}
