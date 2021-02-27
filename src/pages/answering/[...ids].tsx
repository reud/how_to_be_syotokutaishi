import firebase from '../../plugins/firebase';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NewDatabase, Problem } from '../../database/model';
import {
  CardContent,
  Container,
  Card,
  GridList,
  Grid,
  Typography,
  Paper,
  Button,
  createStyles,
} from '@material-ui/core';
import Layout from '../../components/layout';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import LinearProgress from '@material-ui/core/LinearProgress';

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
  const [nowPlace, setNowPlace] = useState(0);
  const [initialRate, setInitialRate] = useState(0);
  const [nowRate, setNowRate] = useState(0);
  const [showStatement, setShowStatement] = useState('');

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
      setQuizzes([...problems]); // 4問更新されるはず
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!currentUser) {
        return;
      }
      const db = NewDatabase();
      const uid = (currentUser as firebase.User).uid;
      const user = await db.fetchUserData(uid);
      setInitialRate(user.point);
      setNowRate(user.point);
    })();
  }, [currentUser]);

  // 解答メソッド
  const scoring = async (answer: boolean) => {
    // 正解時に得られる経験値(とりあえず。)
    const exp = ids.length * 100;
    // 正解時
    if (quizzes[nowPlace].collectAnswer == answer) {
      const db = NewDatabase();
      const uid = (currentUser as firebase.User).uid;
      const newRate = nowRate + exp;

      setNowRate(newRate);
      // 新しいレートに更新
      await db.updateUserData(uid, newRate);
    } else {
      alert('残念！');
    }
    setNowPlace(nowPlace + 1);
    if (quizzes.length <= nowPlace) {
      alert('ゲーム終了！');
      // TODO 遷移先を変える。
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
                hoge huga
              </Typography>
              <LinearProgress variant="determinate" value={10} />
            </CardContent>
            <CardContent className={classes.levelRest}></CardContent>
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
              onClick={async () => {
                await scoring(true);
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
              onClick={async () => {
                await scoring(false);
              }}
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
