import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  render() {
    return (
      <div class="TrackList">
        <Track song="Tiny Dancer" artist="Elton John" album="Madman Across The Water" />
        <Track song="Tiny Dancer" artist="Tim McGraw" album="Love Story" />
        <Track song="Tiny Dancer" artist="Rockabye Baby!" album="Lullaby Renditions of Elton John" />
        <Track song="Tiny Dancer" artist="The White Raven" album="Tiny Dancer" />
        <Track song="Tiny Dancer - Live Album Version" artist="Ben Folds" album="Ben Folds Live" />
      </div>
    );
  }
}

export default TrackList;
