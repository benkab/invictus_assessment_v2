import React from 'react';
import './App.css';
import SearchTopBar from './components/partials/SearchTopBar'
import Albums from './components/partials/Albums'
import Playlist from './components/partials/Playlist'
import { connect } from 'react-redux'

class App extends React.Component {

  render(){
    return (
      <div className="row app">
        <div className="container">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <SearchTopBar />
            {
              this.props.isSearchingForAlbums === true &&
              <Albums />
            }
            {
              this.props.displyPlaylist &&
              <Playlist />
            }
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    displyPlaylist: state.appReducer.displyPlaylist.displyPlaylist,
    isSearchingForAlbums: state.appReducer.isSearchingForAlbums.isSearchingForAlbums
  }
}

export default connect(mapStateToProps)(App);

