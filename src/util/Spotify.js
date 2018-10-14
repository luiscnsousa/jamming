const clientId = "c16acb77a7a04305a2f224c85eb7e4d5";
const redirectUri = "http://localhost:3000/";
let accessToken = "";

const Spotify = {
  getAccessToken() {
    if (accessToken !== "") {
      console.log("returning stored accessToken!");
      return accessToken;
    }

    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expirationMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (tokenMatch && expirationMatch) {
      accessToken = tokenMatch[1];
      const expiresIn = expirationMatch[1];
      window.setTimeout(() => accessToken = '', expiresIn[1] * 1000);
      window.history.pushState('Access Token', null, '/');
      console.log("returning accessToken in URL!");
      return accessToken;
    }

    console.log("navigating to authorization Url!");
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    window.location = authUrl;

  },

  search(term) {
    const endpoint = `https://api.spotify.com/v1/search?q=${term}&type=track,album,artist&limit=10`;
    return fetch(
      endpoint,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        if (jsonResponse.tracks) {
          return jsonResponse.tracks.items.map(t => {
            return {
              id: t.id,
              name: t.name,
              artist: t.artists[0].name,
              album: t.album.name,
              uri: t.uri
            };
          });
        }

        return [];
      });
  }
};

export default Spotify;
