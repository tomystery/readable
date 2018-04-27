import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Route, withRouter } from 'react-router-dom'
import { receiveCategories, receivePosts } from './actions'

import Default from './components/Default'
import PostDetail from './components/PostDetail'
import * as readableAPI from './ReadableAPI'





class App extends Component {



  componentDidMount() {


    this.props.getPostes();
    this.props.getCtgry();
  }






  render() {


    return (
      <div className="App">
        <Route path='/post/:id' render={({ match }) => {
          return (
            <PostDetail postId={match.params.id} />
          );
        }} />
        <Route path='/category/:id' render={({ match }) => {
          return (
            <Default categoryId={match.params.id} />
          );
        }} />
        <Route exact path='/' render={() => (
          <Default />
        )} />



      </div>

    );
  }
}

function mapStateToProps({ categoryReducer, postReducer }) {
  return {
    categoryReducer: categoryReducer,
    postReducer: postReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCtgry: () => (dispatch((dispatch, getState) => (
      readableAPI
        .fetchCategories()
        .then(data => dispatch(receiveCategories(data.categories)))
    ))),
    getPostes: () => (dispatch((dispatch, getState) => (
      readableAPI
        .fetchPosts()
        .then(data => dispatch(receivePosts(data)))
    )))
  }
}

export default withRouter(connect(
  mapStateToProps, mapDispatchToProps
)(App))