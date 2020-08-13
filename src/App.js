import React, { Component } from 'react';
import classes from './App.css';
import Layout from './hoc/Layout/Layout';
import Landing from './containers/Landing/Landing';
class App extends Component {
  render() {
    return (
 
      <div className={classes.App}>
          <Layout>
            <Landing/>
          </Layout>

      </div>

    );
  }
}

export default App;
