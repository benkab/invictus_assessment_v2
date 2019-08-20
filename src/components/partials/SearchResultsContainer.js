import React from 'react';
import '../../App.css'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { 
  resetIsSearching,
  setIsSearchingForAlbums,
  setSearchTerm,
  setHasDoneSearchingForAlbums,
  resetIsDisplayingList,
  setAlbums,
  searchForAlbums,
  setTracks
} from './../../store/actions/appActions'

class SearchResultsContainer extends React.Component {

  searchForAlbums = async (artist) => {
    this.props.resetIsSearching()
    this.props.setIsSearchingForAlbums()
    this.props.setSearchTerm(artist.name)
    this.props.setHasDoneSearchingForAlbums(false)
    this.props.resetIsDisplayingList()
    this.props.setAlbums([])
    let res = await this.props.searchForAlbums(artist.id)
    if(res){
      this.handleAlbumsResponse(res)
    }
  }

  handleAlbumsResponse = (res) => {
    this.props.setHasDoneSearchingForAlbums(true)
    this.props.setAlbums(res.data.data)
    this.props.setTracks([])
  }

  render(props) {
    return (
      <div 
        className="row search-results-container">
        <p>Search results</p>
        {
          this.props.hasDoneSearching === false && this.props.artists.length === 0 &&
          <p>Searching...</p>
        }
        {
          this.props.hasDoneSearching === true && this.props.artists.length === 0 &&
          <p>No artist found.</p>
        }
        {
          this.props.hasDoneSearching === true && this.props.artists.length !== 0 &&
          <ul>
            {
              this.props.artists.artists.map(artist => {
                return (
                  <li
                    onClick={() => this.searchForAlbums(artist)}
                    key={artist.id}>{artist.name}</li>
              )
            })}
          </ul>
        }
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
      resetIsSearching,
      setIsSearchingForAlbums,
      setSearchTerm,
      setHasDoneSearchingForAlbums,
      resetIsDisplayingList,
      setAlbums,
      searchForAlbums,
      setTracks
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsContainer);
