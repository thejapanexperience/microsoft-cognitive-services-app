import React from 'react'
import { render } from 'react-dom'
import {Router,Route,IndexRoute,browserHistory} from 'react-router'
import Layout from './components/Layout'
// import Home from './component/Home'
import ImageAnalysePage from './components/ImageAnalysePage'
import SavedImages from './components/SavedImages'


render(
  <Router history ={browserHistory}>
    <Route path ='/' component ={Layout}>
      <Route path ='/saved' component ={SavedImages}/>
      <Route path ='/imageanalyse' component={ImageAnalysePage}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
