import React from 'react';
import Layout from '../components/layout';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  createStyles,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import ProgressBarWithValueLabel from '../components/progressbar';

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
                  小徳
                </Typography>
                <ProgressBarWithValueLabel prevExp={20} score={90} />
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
                <Button
                  variant="contained"
                  className={classes.easy}
                  fullWidth={true}
                >
                  初級
                </Button>
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
                <Button
                  variant="contained"
                  className={classes.normal}
                  fullWidth={true}
                >
                  中級
                </Button>
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
                <Button
                  variant="contained"
                  className={classes.hard}
                  fullWidth={true}
                >
                  上級
                </Button>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Index;
