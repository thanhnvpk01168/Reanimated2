import TrackPlayer from 'react-native-track-player';
module.exports = async function () {
  TrackPlayer.addEventListener('remote-play', () => {
    TrackPlayer.play();
    console.log('play');
  });

  TrackPlayer.addEventListener('remote-pause', () => {
    TrackPlayer.pause();
    console.log('pause');
  });

  TrackPlayer.addEventListener('remote-stop', () => {
    TrackPlayer.destroy();
    console.log('desploy');
  });

  TrackPlayer.addEventListener('playback-track-changed', () => {});

  TrackPlayer.addEventListener('playback-state', (state) => {
    console.log('playback-state', state);
  });
};
