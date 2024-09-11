const { SpotifyRPC } = require('discord.js-selfbot-v13');
const songs = require('../songs.json');
const { log, error } = require('../utils/logger');

function getRandomSong() {
  return songs[Math.floor(Math.random() * songs.length)];
}

function updateRPC(client) {
  const currentSong = getRandomSong();
  const spotify = new SpotifyRPC(client)
    .setAssetsLargeImage(currentSong.largeImageId)
    .setAssetsSmallImage(currentSong.smallImageId)
    .setAssetsLargeText(currentSong.albumName)
    .setState(currentSong.artists.join(", "))
    .setDetails(currentSong.name)
    .setStartTimestamp(Date.now())
    .setEndTimestamp(Date.now() + currentSong.duration)
    .setSongId(currentSong.songId)
    .setAlbumId(currentSong.albumId)
    .setArtistIds(currentSong.artistIds);

  client.user.setActivity(spotify)
  setTimeout(() => updateRPC(client), currentSong.duration);
}

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    log('login', `Logged in as ${client.user.tag}`);
    updateRPC(client);
  },
};
