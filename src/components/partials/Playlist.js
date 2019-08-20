import React, { Fragment } from 'react';
import '../../App.css'
import { connect } from 'react-redux'

class Playlist extends React.Component {

  handleIndex = (index) => {
    return parseInt(index) + 1
  }

  handleTrackYear = (the_date) => {
    return the_date.toString().substring(0, 4);
  }

  handleDuration = (duration) => {
    let right_format = Math.floor(duration / 60)+':'+('0'+Math.floor(duration % 60)).slice(-2);
    return right_format
  }

  render() {
    return (
      <div className="row playlist">
        {
          this.props.album &&
          <Fragment>
            <div className="row">
              <div className="col-lg-3 small-column"></div>
              <div className="col-lg-9 large-column">
                <p className="album-title-in-playlist">{this.props.album.title}</p>
                <table className="table">
                  <tr>
                    <th className="col-lg-1">#</th>
                    <th className="col-lg-4">Title</th>
                    <th className="col-lg-3">Artist</th>
                    <th className="col-lg-2">Time</th>
                    <th className="col-lg-2">Released</th>
                  </tr>
                </table>
              </div>
            </div>
            <div className="row inner-table-container">
              <div className="col-lg-3 small-column">
                <div className="thumbnail">
                  <img src={this.props.album.album.cover_big} alt="album-image-cover"/>
                </div>
              </div>
              <div className="col-lg-9">
                <table className="table">
                  {
                    this.props.tracks.tracks.map((track, index) => {
                      return (
                        <tr key={track.id} className={'' + (index !== (this.props.tracks.length - 1) ? "not-last-item": '')}>
                          <td className="col-lg-1">{this.handleIndex(index)}</td>
                          <td className="col-lg-4">{track.title}</td>
                          <td className="col-lg-3">{track.artist.name}</td>
                          <td className="col-lg-2">{this.handleDuration(track.duration)}</td>
                          <td className="col-lg-2">{this.handleTrackYear(this.props.album.album.release_date)}</td>
                        </tr>
                    )
                  })}
                </table>
              </div>
            </div>
          </Fragment>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    album: state.appReducer.album,
    tracks: state.appReducer.tracks
  }
}

export default connect(mapStateToProps)(Playlist);
