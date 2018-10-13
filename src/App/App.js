import React, { Component } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import SearchResults from '../components/SearchResults/SearchResults';
import Playlist from '../components/Playlist/Playlist';
import Spotify from '../util/Spotify';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
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
        { name:"Tiny Dancer", artist:"Elton John", album:"Madman Across The Water" , id:1 },
        { name:"Tiny Dancer", artist:"Tim McGraw", album:"Love Story" , id:2 },
        { name:"Tiny Dancer", artist:"Rockabye Baby!", album:"Lullaby Renditions of Elton John" , id:3 },
        { name:"Tiny Dancer", artist:"The White Raven", album:"Tiny Dancer" , id:4 },
        { name:"Tiny Dancer - Live Album Version", artist:"Ben Folds", album:"Ben Folds Live" , id:5 }
      ]
    };
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
