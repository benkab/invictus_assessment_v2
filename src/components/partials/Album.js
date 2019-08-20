import React from 'react';
import '../../App.css'
import TextTruncate from 'react-text-truncate';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { 
  setAlbum,
  setTracks,
  loadAlbum,
  setIsDisplayingList,
  resetIsDisplayingList
} from './../../store/actions/appActions'

class Album extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      albumHovered: false
    }
  }

  refractorSearchTerm = (term) => {
    return 'Search results for "' + term + '"'
  }


  getArtistPlaylist = async () => {
    this.props.resetIsDisplayingList()
    let res = await this.props.loadAlbum(this.props.album.id)
    if(res){
      this.handlePlaylistResponse(res, this.props.album)
    }
  }

  handlePlaylistResponse = (response, album) => {
    let tracks = response.data.tracks.data
    this.props.setTracks(tracks)
    this.props.setIsDisplayingList()
    this.props.setAlbum(album)
  }

  render(props) {
    return (
      <div 
        onClick={() => this.getArtistPlaylist()}
        onMouseEnter={() => {this.setState({albumHovered: true})}}
        onMouseLeave={() => {this.setState({albumHovered: false})}}
        className={"col-lg-4 col-md-4 col-sm-4 col-xs-6 album " + (this.state.albumHovered === true ? 'album-hovered' : '')}>
        <div className="thumbnail">
          <img src={this.props.album.cover_big} alt="album-image-cover"/>
        </div>
        <TextTruncate
          line={1}
          className="albums-title"
          truncateText="…"
          text={this.props.album.title}
        />
        <small>(click for more info open section below)</small>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    artists: state.appReducer.artists,
    hasDoneSearching: state.appReducer.hasDoneSearching.hasDoneSearching
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({
      setAlbum,
      setTracks,
      loadAlbum,
      setIsDisplayingList,
      resetIsDisplayingList
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Album);
