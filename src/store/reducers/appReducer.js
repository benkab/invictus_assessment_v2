const initialState = {
  album: null,
  albums : [],
  isSearching: false,
  hasDoneSearching: false,
  searchTerm: '',
  artists: [],
  tracks: [],
  isSearchingForAlbums: false,
  hasDoneSearchingForAlbums: false,
  displyPlaylist: false,
}

const appReducer = function(state=initialState, action) {
  switch(action.type) {
      case "SETALBUMS": {
          state = {...state, albums: action.payload}
          break;
      }
      case "SETALBUM": {
        state = {...state, album: action.payload}
        break;
      }
      case "SETARTISTS": {
        state = {...state, artists: action.payload}
        break;
      }
      case "SETHASDONESEARCHING": {
        state = {...state, hasDoneSearching: action.payload}
        break;
      }
      case "SETTRACKS": {
        state = {...state, tracks: action.payload}
        break;
      }
      case "SEARCHFORARTISTS": {
        state = {...state, data: action.payload}
        break;
      }
      case "SEARCHFORALBUMS": {
        state = {...state, data: action.payload}
        break;
      }
      case "LOADALBUM": {
        state = {...state, data: action.payload}
        break;
      }
      case "SETISSEARCHING": {
        state = {...state, isSearching: action.payload}
        break;
      }
      case "RESETISSEARCHING": {
        state = {...state, isSearching: action.payload}
        break;
      }
      case "SETISSEARCHINGFORALBUMS": {
        state = {...state, isSearchingForAlbums: action.payload}
        break;
      }
      case "RESETISSEARCHINGFORALBUMS": {
        state = {...state, isSearchingForAlbums: action.payload}
        break;
      }
      case "SETHASDONESEARCHINGFORALBUMS": {
        state = {...state, hasDoneSearchingForAlbums: action.payload}
        break;
      }
      case "SETSEARCHTERM": {
        state = {...state, searchTerm: action.payload}
        break;
      }
      case "SETDISPLAYLIST": {
        state = {...state, displyPlaylist: action.payload}
        break;
      }
      case "RESETDISPLAYLIST": {
        state = {...state, displyPlaylist: action.payload}
        break;
      }
      default: return state
  }
  return state;
}

export default appReducer;
