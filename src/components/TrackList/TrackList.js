import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  render() {
    return (
      <div class="TrackList">
        {this.props.tracks.map(track => {
          return <Track key={track.id} track={track} isRemoval={true} />;
        })}
      </div>
    );
  }
}

export default TrackList;
