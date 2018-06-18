export const REQUEST_PLAYERS = 'REQUEST_PLAYERS';
export const RECEIVE_PLAYERS = 'RECEIVE_PLAYERS';

const requestPlayers = () => ({
  type: REQUEST_PLAYERS,
});
const receivePlayers = json => ({
  type: RECEIVE_PLAYERS,
  players: json
});

export function fetchPlayers() {
  return dispatch => {
    dispatch(requestPlayers());
    fetch(`https://dynastyhub-api.herokuapp.com/api/v1/playerList`, {
      headers: new Headers({
        'Access-Control-Allow-Origin': '*'
      })
    })
      .then(response => response.json())
      .then(json => dispatch(receivePlayers(json)))
  };
}
