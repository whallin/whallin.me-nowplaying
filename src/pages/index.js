export async function get({ request }) {
    const refreshOauth = await fetch(`https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=${import.meta.env.SPOTIFY_REFRESH_TOKEN}`,{
        method: 'POST',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization':`Basic ${import.meta.env.SPOTIFY_CLIENT}`,
        },
    })
    const refreshOauthJSON = await refreshOauth.json();

    const nowPlaying = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1",{
    method: 'GET',
    headers: {
        'Content-Type':'application/json',
        'Authorization':`Bearer ${refreshOauthJSON.access_token}`,
    }
    })
    const nowPlayingJSON = await nowPlaying.json();

    return new Response(JSON.stringify(nowPlayingJSON), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
    });
}