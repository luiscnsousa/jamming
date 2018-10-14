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
    this.state = {
      searchResults: [
        { name:"Tiny Dancer", artist:"Elton John", album:"Madman Across The Water" , id:1 },
        { name:"Tiny Dancer", artist:"Tim McGraw", album:"Love Story" , id:2 },
        { name:"Tiny Dancer", artist:"Rockabye Baby!", album:"Lullaby Renditions of Elton John" , id:3 },
        { name:"Tiny Dancer", artist:"The White Raven", album:"Tiny Dancer" , id:4 },
        { name:"Tiny Dancer - Live Album Version", artist:"Ben Folds", album:"Ben Folds Live" , id:5 }
      ],
      playlistName: "New Playlist",
      playlistTracks: [
        { name:"Tiny Dancer", artist:"Elton John", album:"Madman Across The Water" , id:1 }
      ]
    };
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

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
