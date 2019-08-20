import React from 'react';
import '../../App.css'
import Album from './Album'
import { connect } from 'react-redux'

class Albums extends React.Component {

  refractorSearchTerm = (term) => {
    return 'Search results for "' + term + '"'
  }

  render() {
    return (
      <div 
        className="row albums-container">
        <p className="albums-container-title">{this.refractorSearchTerm(this.props.searchTerm.searchTerm)}</p>
        {
          this.props.albums &&
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <p className="albums-container-second-title">ALBUMS</p>
            </div>
            <div className="row albums-scroll-container">
              {
                this.props.albums.albums.map(album => {
                  return (
                    <Album
                      album={album}
                      key={album.id} />
                )
              })}
            </div>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchTerm: state.appReducer.searchTerm,
    albums: state.appReducer.albums
  }
}

export default connect(mapStateToProps)(Albums);