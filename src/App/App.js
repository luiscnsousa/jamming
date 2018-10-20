import React, { Component } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import SearchResults from '../components/SearchResults/SearchResults';
import Playlist from '../components/Playlist/Playlist';
import Spotify from '../util/Spotify';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.saveStateToLocalStorage = this.saveStateToLocalStorage.bind(this);
    this.restoreStateWithLocalStorage = this.restoreStateWithLocalStorage.bind(this);
    this.state = {
      searchTerm: null,
      searchResults: [],
      pendingSearch: false,
      playlistName: "New Playlist",
      playlistTracks: [],
      pendingSave: false
    };
  }

  componentWillMount() {
    window.addEventListener("beforeunload", this.saveStateToLocalStorage);
    this.restoreStateWithLocalStorage();
  }

  componentDidMount() {
    if (this.state.pendingSearch) {
      console.log("performing a pendingSearch");
      this.search();
    }

    if (this.state.pendingSave) {
      console.log("performing a pendingSave");
      this.savePlaylist();
    }
  }

  componentWillUnmount() {
    this.saveStateToLocalStorage();
    window.removeEventListener("beforeunload", this.saveStateToLocalStorage);
  }

  saveStateToLocalStorage() {
    for (let key in this.state) {
      const value = JSON.stringify(this.state[key]);
      localStorage.setItem(key, value);
      console.log(`saved ${key} to local storage`);
    }
  }

  restoreStateWithLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
          console.log(`loaded ${key} from local storage`);
        } catch (e) {
          console.log(`failed to load ${key} from local storage`);
        }
      }
    }
  }

  addTrack(track) {
    const tracks = this.state.playlistTracks;
    const i = tracks.indexOf(track);
    if (i < 0) {
      tracks.push(track);
      this.setState({ playlistTracks: tracks });
    }
  }

  removeTrack(track) {
    const tracks = this.state.playlistTracks;
    const i = tracks.indexOf(track);
    if (i >= 0) {
      tracks.splice(i, 1);
      this.setState({ playlistTracks: tracks });
    }
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  updateSearchTerm(term) {
    this.setState({ searchTerm: term });
  }

  savePlaylist() {
    this.setState({ pendingSave: true });
    const trackURIs = this.state.playlistTracks.map(t => t.uri);
    Spotify.savePlaylist(
      this.state.playlistName,
      trackURIs).then(() => {
        console.log("playlist saved successfully");
        this.setState({
          playlistName: "New Playlist",
          playlistTracks: [],
          pendingSave: false
        });
      }, error => {
        console.log(`Spotify.savePlaylist call: ${error}`);
      });
  }

  search() {
    this.setState({ pendingSearch: true });
    Spotify.search(this.state.searchTerm).then(tracks => {
      console.log("search done successfully");
      this.setState({
        searchResults: tracks,
        pendingSearch: false
      });
    }, error => {
      console.log(`Spotify.search call: ${error}`);
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar
            searchTerm={this.state.searchTerm}
            onSearch={this.search}
            onTermChange={this.updateSearchTerm} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack} />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
