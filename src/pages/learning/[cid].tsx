import Layout from '../../components/layout';
import { Grid, Container, makeStyles, Button } from '@material-ui/core';
import YouTube, { Options } from 'react-youtube';
import { YouTubePlayer } from 'youtube-player/dist/types';
import { useState } from 'react';

const useStyles = makeStyles({
  container: {
    marginTop: '14px',
  },
  playersCard: {
    backgroundColor: 'white',
    padding: '14px',
  },
  playersCardFooter: {
    textAlign: 'center',
    margin: '22px',
  },
  player: {
    pointerEvents: 'none',
  },
});

const Learning = (props) => {
  const classes = useStyles();
  const [isReady, setIsReady] = useState(true);
  const [players, setPlayers] = useState<Array<YouTubePlayer>>([]);

  const opts: Options = {
    height: '350',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      controls: 0,
      disablekb: 0,
      fs: 0,
      modestbranding: 1,
    },
  };

  // TODO 外部から取得するようにする．
  const urls = ['2g811Eo7K8U', '2g811Eo7K8U'];

  const onReady = (event) => {
    setIsReady(true);
    setPlayers([...players, event.target]);
  };

  const onButtonClick = () => {
    players.forEach((player) => {
      player.playVideo();
    });
    setIsReady(false);
  };

  const onEnd = () => {
    // TODO 再生終了後の遷移処理
    alert('遷移する');
  };

  return (
    <Layout>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3} className={classes.playersCard}>
          {urls.map((url) => {
            return (
              <Grid item xs={12} md={6} lg={6}>
                <YouTube
                  className={classes.player}
                  videoId={url}
                  opts={opts}
                  onReady={onReady}
                  onEnd={onEnd}
                />
              </Grid>
            );
          })}

          <Grid item xs={12} className={classes.playersCardFooter}>
            <Button
              id="startButton"
              variant="contained"
              color="secondary"
              onClick={onButtonClick}
              disabled={!isReady}
            >
              はじめる
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Learning;
