import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.state = {};
  }

  search(evt) {
    this.props.onSearch(this.state.searchTerm);
  }

  handleTermChange(evt) {
    this.state.searchTerm = evt.target.value;
  }

  render() {
    return (
      <div class="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
