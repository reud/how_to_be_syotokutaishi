import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  createStyles,
  Grid,
  LinearProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { selectCategories } from '../database';
import { Container } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Link from 'next/link';
import firebase from '../plugins/firebase';
import {
  getKANINextRank,
  getKANIString,
  initializeProgressBar,
  numToKANI,
} from '../utils/kani';
import { NewDatabase } from '../database/model';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    easy: {
      background: theme.palette.syochi.main,
      color: 'white',
      '&:hover': {
        backgroundColor: theme.palette.daichi.main,
      },
      titleLink: {
        color: 'white',
        background: theme.palette.syochi,
        textDecoration: 'none',
      },
    },
    normal: {
      background: theme.palette.syorei.main,
      color: `white`,
      '&:hover': {
        backgroundColor: theme.palette.dairei.main,
      },
      titleLink: {
        color: `white`,
        textDecoration: 'none',
      },
    },
    hard: {
      background: theme.palette.syotoku.main,
      color: 'white',
      '&:hover': {
        backgroundColor: theme.palette.daitoku.main,
      },
      titleLink: {
        color: 'white',
        background: theme.palette.syotoku,
        textDecoration: 'none',
      },
    },
    buttonCard: {
      margin: theme.spacing(4),
    },
    levelRest: {
      margin: theme.spacing(4),
    },
  }),
);

const Index = (props) => {
  const classes = useStyles();
  const [progressNowe, setprogressNowe] = useState(0);
  const [progressAfter, setProgressAfter] = useState(0);
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [nowRank, setNowRank] = useState(1);
  const [nextRank, setNextRank] = useState(1);
  const [exp, setExp] = useState(0);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setCurrentUser(user);
    }
  });

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    (async () => {
      const db = NewDatabase();
      const user = await db.fetchUserData(currentUser.uid);
      const progress = initializeProgressBar(user.exp, user.earnExp);
      setNowRank(progress.beforeRank);
      setNextRank(progress.afterRank);
      setprogressNowe(progress.beforePercentage);
      setProgressAfter(progress.afterPercentage);
      await db.updateUserData(currentUser.uid, user.earnExp + user.exp, 0);
      setExp(user.exp + user.earnExp);
    })();
  }, [currentUser]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setprogressNowe((oldProgress) => {
        if (nowRank === nextRank) {
          return Math.min(progressAfter, oldProgress + 5);
        } else {
          // 100%超えても良い気がしてきた。
          return Math.min(progressAfter + 100, oldProgress + 5);
        }
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [exp]);

  return (
    <Layout>
      <Card>
        {/* MEMO 画像とテキストを組み合わせてえ〜感じに表示したい*/}
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          width="100%"
          image="/static/top_image.svg"
          title="Contemplative Reptile"
        />
      </Card>
      <Container maxWidth="lg">
        {/* レート表示 */}
        <Grid container>
          <Grid item xs={12} md={12} lg={12} className={classes.buttonCard}>
            <Card>
              <CardContent className={classes.buttonCard}>
                <Typography variant="h5" component="h5">
                  現在の冠位:
                </Typography>
                <Typography
                  gutterBottom
                  variant="h2"
                  component="h2"
                  color="primary"
                  align="right"
                >
                  {getKANIString(numToKANI(nextRank))}
                </Typography>
                <LinearProgress variant="determinate" value={progressNowe} />
              </CardContent>
              <CardContent className={classes.levelRest}>
                <Typography
                  variant="h6"
                  component="h6"
                  align="right"
                  color="primary"
                >
                  {getKANIString(numToKANI(nextRank + 1))}まで {exp} /{' '}
                  {getKANINextRank(numToKANI(nextRank))} pts
                </Typography>
              </CardContent>
            </Card>
            <Grid container alignItems="center" justify="center"></Grid>
          </Grid>
        </Grid>
        {/* 級 */}
        <Grid container>
          <Grid item xs={12} md={6} lg={4}>
            <Card className={classes.buttonCard}>
              <Grid container alignItems="center" justify="center">
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  width="100%"
                  image="/static/imoko.svg"
                  title="Contemplative Reptile"
                />
                <Link href="/learning/1">
                  <Button
                    variant="contained"
                    className={classes.easy}
                    fullWidth={true}
                  >
                    初級
                  </Button>
                </Link>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card className={classes.buttonCard}>
              <Grid container alignItems="center" justify="center">
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  width="100%"
                  image="/static/umako.svg"
                  title="Contemplative Reptile"
                />
                <Link href="/learning/2">
                  <Button
                    variant="contained"
                    className={classes.normal}
                    fullWidth={true}
                  >
                    中級
                  </Button>
                </Link>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card className={classes.buttonCard}>
              <Grid container alignItems="center" justify="center">
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  width="100%"
                  image="/static/taishi.svg"
                  title="Contemplative Reptile"
                />
                <Link href="/learning/3">
                  <Button
                    variant="contained"
                    className={classes.hard}
                    fullWidth={true}
                  >
                    上級
                  </Button>
                </Link>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Index;
