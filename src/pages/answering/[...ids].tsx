import firebase from '../../plugins/firebase';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NewDatabase, Problem } from '../../database/model';
import {
  CardContent,
  Container,
  GridList,
  Grid,
  Typography,
  Paper,
  Button,
} from '@material-ui/core';
import Layout from '../../components/layout';
import { typeAlias } from '@babel/types';
import { util } from 'protobufjs';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  makeStyles({}),
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  drawerPaper: { background: 'blue' },
}));

const Answering = (props) => {
  const classes = useStyles();

  const [currentUser, setCurrentUser] = useState(null);
  const [quizzes, setQuizzes] = useState<Array<Problem>>([]);
  const [nowPlace, setNowPlace] = useState(0);

  const router = useRouter();
  const ids = router.query.ids;

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      router.push(`/`);
    }
  });

  const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    (async () => {
      if (typeof ids === 'string') {
        throw new Error('hogehoge');
      }
      const db = NewDatabase();
      const pbs = await db.fetchAllProblems();

      const problemses = pbs.map((pb) => {
        return pb.problems;
      });

      for (const pbs of problemses) {
        for (const pb of pbs) {
          console.log(pb);
          setQuizzes([...quizzes, pb]);
        }
      }
    })();
    console.log(quizzes); // => [] ,
  }, []);

  // 解答メソッド
  const scoring = async (idx: number, answer: boolean) => {
    // 正解時に得られる経験値(とりあえず。)
    const exp = ids.length * 100;
    // 正解時
    if (quizzes[idx].collectAnswer == answer) {
      const db = NewDatabase();
      const uid = (currentUser as firebase.User).uid;
      const nowScore;
      db.updateUserData(uid);
    }
  };

  return (
    <Layout>
      <Container maxWidth="lg">
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
                小徳
              </Typography>
              <LinearProgress variant="determinate" value={10} />
            </CardContent>
            <CardContent className={classes.levelRest}>
              <Typography
                variant="h6"
                component="h6"
                align="right"
                color="primary"
              >
                大徳まで 877 / 1200 pts
              </Typography>
            </CardContent>
          </Card>
          <Grid container alignItems="center" justify="center"></Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              Q{nowPlace + 1}: {quizzes[nowPlace]?.statement}
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={() => {
                alert('clicked');
              }}
              variant="contained"
              color="primary"
              fullWidth={true}
            >
              ○
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={() => {}}
              variant="contained"
              color="secondary"
              fullWidth={true}
            >
              ✗
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Answering;
