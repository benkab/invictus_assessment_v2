import React from 'react';
import '../../App.css'
import SearchResultsContainer from './SearchResultsContainer'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { 
  setAlbums,
  setIsSearching,
  resetIsSearching,
  searchForArtists,
  setHasDoneSearching,
  setArtists,
  setSearchTerm,
  resetIsDisplayingList,
  resetIsSearchingForAlbums
} from './../../store/actions/appActions'

class SearchTopBar extends React.Component {

  constructor(props){
    super(props)
    this.searchTerm = React.createRef()
    this.state = {
      isTyping: false,
      editable: false
    }
  }

  search = async () => {
    if(this.searchTerm.current.value){
      this.setIsTyping()
      let term = this.searchTerm.current.value
      this.props.setSearchTerm(term)
      this.props.setIsSearching()
      this.props.setHasDoneSearching(false)
      let res = await this.props.searchForArtists(term)
      if(res){
        this.props.setHasDoneSearching(true)
        this.handleResponse(res)
      }
    } else {
      this.clearSearch()
    }
  }

  handleResponse = (response) => {
    var self = this
    let listOfArtists = []
    response.data.data.filter(function(item){
      let artist = {
        key: item.id,
        id: item.artist.id,
        name: item.artist.name
      }
      listOfArtists.push(artist)
    })
    self.filterArtists(listOfArtists)
  }

  filterArtists = async (listOfArtists) => {
    let allArtists = await listOfArtists
    let artists = await this.getArtists(allArtists, 'id')
    this.props.setArtists(artists)
  }

  getArtists = (arr, id) => {
    const list = arr
                  .map(e => e[id])
                  .map((e, i, final) => final.indexOf(e) === i && i)
                  .filter(e => arr[e]).map(e => arr[e]);
    return list;
  }

  clearSearch = () => {
    this.resetIsTyping()
    this.searchTerm.current.value = ''
    this.props.setAlbums([])
    this.props.setArtists([])
    this.props.setSearchTerm('')
    this.props.resetIsSearching()
    this.props.resetIsSearchingForAlbums()
    this.props.resetIsDisplayingList()
  }

  setIsTyping = () => {
    this.setState({isTyping: true})
  }

  resetIsTyping = () => {
    this.setState({isTyping: false})
  }
  
  render(props) {
    return (
      <div className="row">
        <div className="col-lg-11 col-md-10 col-sm-9 col-xs-9 search-input-container">
          <input 
            onChange={() => this.search()}
            className="form-control" 
            ref={this.searchTerm}
            placeholder="Search for an artist"
          />
          {
            this.props.isSearching === true &&
            <SearchResultsContainer />
          }
          {
            this.state.isTyping === true &&
            <span onClick={() => this.clearSearch()}>Clear</span>
          }
        </div>
        <div className="col-lg-1 col-md-2 col-sm-3 col-xs-3 search-button-container">
          <a 
            onClick={() => this.search()}
            className="btn btn-block 
            search-button">SEARCH</a>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    albums: state.appReducer.albums.albums,
    artists: state.appReducer.artists.artists,
    tracks: state.appReducer.tracks.tracks,
    isSearching: state.appReducer.isSearching.isSearching,
    isSearchingForAlbums: state.appReducer.isSearching.isSearching
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({
      setAlbums, 
      searchForArtists,
      setIsSearching,
      resetIsSearching,
      setHasDoneSearching,
      setArtists,
      setSearchTerm,
      resetIsDisplayingList,
      resetIsSearchingForAlbums
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchTopBar);
