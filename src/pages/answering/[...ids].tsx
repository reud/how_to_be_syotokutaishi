import firebase from '../../plugins/firebase';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NewDatabase, Problem } from '../../database/model';
import {
  CardContent,
  Container,
  Button,
  createStyles,
  Paper,
} from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import LinearProgress from '@material-ui/core/LinearProgress';
import Layout from '../../components/layout';
import Grid from '@material-ui/core/Grid';
import { Card } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
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

const Answering = (props) => {
  const classes = useStyles();

  const [currentUser, setCurrentUser] = useState(null);
  const [quizzes, setQuizzes] = useState<Array<Problem>>([]);
  const [idx, setidx] = useState(0);
  const [solved, setSolved] = useState(0);
  const [result, setResult] = useState('解こう！');

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
      const dataDocuments = await db.fetchAllDataDocuments();

      const problems = dataDocuments.flatMap((doc) => {
        return doc.problems;
      });

      setQuizzes(shuffle(problems));
    })();
  }, []);

  const scoring = async (ans: boolean) => {
    if (quizzes[idx].collectAnswer === ans) {
      setSolved(solved + 1);
      setResult('正解！');
    } else {
      setResult('不正解！');
    }
    setidx(idx + 1);

    // 最後の問題の場合
    if (idx + 1 >= quizzes.length) {
      setResult('お疲れ様でした！');
      const db = NewDatabase();
      const uid = (currentUser as firebase.User).uid;
      const userNowData = await db.fetchUserData(uid);
      await db.updateUserData(uid, userNowData.exp, solved);
      router.push('/');
    }
  };

  return (
    <Layout>
      <Container maxWidth="lg">
        <Grid item xs={12} md={12} lg={12} className={classes.buttonCard}>
          <Card>
            <CardContent className={classes.buttonCard}>
              <Typography
                gutterBottom
                variant="h2"
                component="h2"
                color="primary"
                align="center"
              >
                {result}
              </Typography>
              <LinearProgress variant="determinate" value={10} />
            </CardContent>
            <CardContent className={classes.levelRest}></CardContent>
          </Card>
          <Grid container alignItems="center" justify="center"></Grid>
        </Grid>
        {idx < quizzes.length && (
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h5"
                  align="center"
                >
                  Q{idx + 1}: {quizzes[idx]?.statement}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={async () => {
                  await scoring(true);
                }}
                variant="contained"
                color="primary"
                fullWidth={true}
              >
                <Typography style={{ fontWeight: 'bold' }}>◯</Typography>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={async () => {
                  await scoring(false);
                }}
                variant="contained"
                color="secondary"
                fullWidth={true}
              >
                <Typography style={{ fontWeight: 'bold' }}>×</Typography>
              </Button>
            </Grid>
          </Grid>
        )}
      </Container>
    </Layout>
  );
};

export default Answering;
