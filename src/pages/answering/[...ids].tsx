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
} from '@material-ui/core';
import Layout from '../../components/layout';
import { typeAlias } from '@babel/types';
import { util } from 'protobufjs';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
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

  return (
    <Layout>
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              Q{nowPlace + 1}: {quizzes[nowPlace]?.statement}
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>○</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>✗</Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Answering;
