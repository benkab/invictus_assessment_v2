import { baseUrl } from './../../base'

export function setAlbum(album) {
  return {
    type: 'SETALBUM',
    payload: {
      album: album
    }
  }
}

export function setAlbums(albums) {
  return {
    type: 'SETALBUMS',
    payload: {
      albums: albums
    }
  }
}

export function searchForArtists(searchTerm){
  return (dispatch) => {
    return fetch(baseUrl + 'search?q=artist:"' + searchTerm + '"')
        .then(response => response.json())
        .then(json => dispatch(
            { type: "SEARCHFORARTISTS", data: json }))
        .catch(err => dispatch(
            { type: "ERROR",msg: "Unable to fetch data" }))
  }
}

export function searchForAlbums(id){
  return (dispatch) => {
    return fetch(baseUrl + 'artist/' + id + '/albums')
        .then(response => response.json())
        .then(json => dispatch(
            { type: "SEARCHFORALBUMS", data: json }))
        .catch(err => dispatch(
            { type: "ERROR",msg: "Unable to fetch data" }))
  }
}

export function loadAlbum(id){
  return (dispatch) => {
    return fetch(baseUrl + 'album/' + id)
        .then(response => response.json())
        .then(json => dispatch(
            { type: "LOADALBUM", data: json }))
        .catch(err => dispatch(
            { type: "ERROR",msg: "Unable to fetch data" }))
  }
}

export function setArtists(artists) {
  return {
    type: 'SETARTISTS',
    payload: {
      artists: artists
    }
  }
}

export function setTracks(tracks) {
  return {
    type: 'SETTRACKS',
    payload: {
      tracks: tracks
    }
  }
}

export function setSearchTerm(searchTerm) {
  return {
    type: 'SETSEARCHTERM',
    payload: {
      searchTerm: searchTerm
    }
  }
}

export function setIsSearching() {
  return {
    type: 'SETISSEARCHING',
    payload: {
      isSearching: true
    }
  }
}

export function setHasDoneSearching(val){
  return {
    type: 'SETHASDONESEARCHING',
    payload: {
      hasDoneSearching: val
    }
  }
}

export function resetIsSearching() {
  return {
    type: 'RESETISSEARCHING',
    payload: {
      isSearching: false
    }
  }
}

export function setIsSearchingForAlbums() {
  return {
    type: 'SETISSEARCHINGFORALBUMS',
    payload: {
      isSearchingForAlbums: true
    }
  }
}

export function setHasDoneSearchingForAlbums(val){
  return {
    type: 'SETHASDONESEARCHINGFORALBUMS',
    payload: {
      hasDoneSearchingForAlbums: val
    }
  }
}

export function resetIsSearchingForAlbums() {
  return {
    type: 'RESETISSEARCHINGFORALBUMS',
    payload: {
      isSearchingForAlbums: false
    }
  }
}

export function setIsDisplayingList() {
  return {
    type: 'SETDISPLAYLIST',
    payload: {
      displyPlaylist: true
    }
  }
}

export function resetIsDisplayingList() {
  return {
    type: 'RESETDISPLAYLIST',
    payload: {
      displyPlaylist: false
    }
  }
}