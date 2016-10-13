import React, { Component } from 'react'
import ToAPIActions from '../actions/ToAPIActions'


export default class SearchBar extends Component {
  constructor() {
    super();
    this._submitForm = this._submitForm.bind(this);
  }
  _submitForm(e){
    e.preventDefault();
    console.log('in SearchBar _submitForm')
    let {input} = this.refs;
    let url  = input.value;
    console.log('url: ', url)
    input.value ='';
    ToAPIActions.imageAnalyse(url);
  }

  render() {
    return (
      <form className="form-inline" onSubmit = {this._submitForm}>
        <div className="form-group">
          <label className="sr-only" >Tweet Topic</label>
          <input ref ='input' type="text" className="form-control"  defaultValue="http://imgview.info/download/20150811/group-of-people-men-women-blonde-smiling-happy-dog-hat-1920x1280.jpg"/>
        </div>
        <span>  </span>
        <button type="submit" className="btn btn-default">Submit Image URL</button>
      </form>
    )
  }
}
