const clientId = "c16acb77a7a04305a2f224c85eb7e4d5";
const redirectUri = "http://jamming-luiscnsousa.surge.sh/";
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
      console.log(`token:${accessToken} expires in ${expiresIn} seconds`);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      console.log("returning accessToken in URL!");
      return accessToken;
    }

    console.log("navigating to authorization URL!");
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    window.location = authUrl;
  },

  search(term) {
    const token = Spotify.getAccessToken();
    const endpoint = `https://api.spotify.com/v1/search?q=${term}&type=track,album,artist&limit=10`;
    console.log(`searching for ${term} on Spotify`);
    return fetch(
      endpoint,
      {
        headers: { Authorization: `Bearer ${token}` }
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        if (!jsonResponse.tracks) {
          return [];
        }

        return jsonResponse.tracks.items.map(t => {
          return {
            id: t.id,
            name: t.name,
            artist: t.artists[0].name,
            album: t.album.name,
            uri: t.uri
          };
        });
      });
  },

  savePlaylist(name, trackURIs) {
    if (!name || !trackURIs) {
      return;
    }

    const baseURL = "https://api.spotify.com/v1";
    const token = Spotify.getAccessToken();
    const authHeaderValue = `Bearer ${token}`;
    let userId = "";
    let playlistId = "";
    console.log("gettting Spotify userId");
    return fetch(
      `${baseURL}/me`,
      {
        headers: { Authorization: authHeaderValue }
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        userId = jsonResponse.id;
        console.log(`userId: ${userId}, creating playlist ${name}`);
        return fetch(
          `${baseURL}/users/${userId}/playlists`,
          {
            method: "POST",
            body: JSON.stringify({ name }),
            headers: {
              Authorization: authHeaderValue,
              "Content-Type": "application/json"
            }
          }).then(response => {
            return response.json();
          }).then(jsonResponse => {
            playlistId = jsonResponse.id;
            console.log(`playlistId: ${playlistId}, adding tracks: ${trackURIs.join(",")}`);
            return fetch(
              `${baseURL}/users/${userId}/playlists/${playlistId}/tracks`,
              {
                method: "POST",
                body: JSON.stringify({ uris: trackURIs}),
                headers: {
                  Authorization: authHeaderValue,
                  "Content-Type": "application/json"
                }
              }).then(response => {
                return response.json();
              }).then(jsonResponse => {
                playlistId = jsonResponse.id;
                return playlistId;
              });
          });
      });
  }
};

export default Spotify;
