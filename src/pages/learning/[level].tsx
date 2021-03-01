import Layout from '../../components/layout';
import { Grid, Container, makeStyles, Button } from '@material-ui/core';
import YouTube, { Options } from 'react-youtube';
import { YouTubePlayer } from 'youtube-player/dist/types';
import React, { useEffect, useState } from 'react';
import { NewDatabase } from '../../database/model';
import { useRouter } from 'next/router';

// レベルに対応した最大動画再生数．TODO DBで保持するようにする
const LEVEL_NUMS = {
  1: 2,
  2: 3,
  3: 6,
};

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
    // margin: '22px',
  },
  player: {
    pointerEvents: 'none',
  },
});

const Learning = (props) => {
  const classes = useStyles();

  const [isReady, setIsReady] = useState(true);
  const [videos, setVideos] = useState([]);
  const [players, setPlayers] = useState<Array<YouTubePlayer>>([]);
  const router = useRouter();
  const level = router.query.level;
  const videoNum = LEVEL_NUMS[String(level)];

  const opts: Options = {
    height: '330',
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

  useEffect(() => {
    (async () => {
      const db = NewDatabase();
      const dataDocuments = await db.fetchAllDataDocuments();

      // 一旦レベルでフィルターしない(テスト動画では動かない)
      // const levelVideos = dataDocuments.filter(
      //   (video) => video.level === Number(level),
      // );

      const fetchedVideos = shuffle(dataDocuments).slice(0, videoNum);

      setVideos(fetchedVideos);
    })();
  }, [level]);

  // TODO answeringからコピペした．後で，共通処理にする．
  const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

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

  let finishedVideoCount = 0;
  const onEnd = () => {
    finishedVideoCount += 1;
    // 全ての動画が再生終了するまで発火させない
    if (finishedVideoCount === videoNum) {
      const videoIdsStr = videos.map((video) => video.id).join('/');
      const nextUrl = '/answering/' + videoIdsStr;
      router.push(nextUrl);
    }
  };

  return (
    <Layout>
      <Container maxWidth={false} className={classes.container}>
        <Grid container spacing={3} className={classes.playersCard}>
          {videos.map((video, index) => (
            <Grid key={index} item xs={12} md={4} lg={4}>
              <YouTube
                className={classes.player}
                videoId={video.id}
                opts={opts}
                onReady={onReady}
                onEnd={onEnd}
              />
            </Grid>
          ))}

          <Grid item xs={12} className={classes.playersCardFooter}>
            <Button
              id="startButton"
              variant="contained"
              color="primary"
              size="large"
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
