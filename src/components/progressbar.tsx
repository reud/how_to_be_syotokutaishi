import {
  Box,
  Card,
  CardContent,
  createStyles,
  LinearProgress,
  LinearProgressProps,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
  getKANINextRank,
  getKANIString,
  initializeProgressBarParameters,
  numToKANI,
} from '../utils/kani';

const ProgressBarWithLabel = (
  props: LinearProgressProps & { value: number },
) => {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    buttonCard: {
      margin: theme.spacing(4),
    },
    levelRest: {
      margin: theme.spacing(4),
    },
  }),
);

const ProgressBarWithValueLabel = (props: {
  prevExp: number;
  score: number;
}) => {
  const classes = useStyles();
  const params = initializeProgressBarParameters(props.prevExp, props.score);
  const [progress, setProgress] = useState<number>(0);
  const [progressNext, setProgressNext] = useState<number>(0);
  const [currentRank, setCurrentRank] = useState(params.beforeRank);
  const [nextRank, setNextRank] = useState(params.afterRank);
  const [rest, setRest] = useState(props.score);

  useEffect(() => {
    console.log(params);
    setProgress(params.beforePercentage);
    setProgressNext(params.afterPercentage);
    //console.log('progress: ', progress);
    //console.log('progressNext: ', progressNext);
  }, []);

  useEffect(() => {
    if (!(progress === 0 && progressNext === 0)) {
      setTimeout(() => {
        console.log('progress: ', progress);
        console.log('progressNext: ', progressNext);

        if (currentRank === nextRank) {
          setProgress(Math.min(progressNext, progress + 5));
        } else if (progress === 100) {
          setCurrentRank(nextRank);
          setNextRank(numToKANI(nextRank + 1));
          setProgress(0);
        } else {
          setProgress(Math.min(100, progress + 5));
        }
      }, 500);
    }
  }, [progress]);

  return (
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
          {getKANIString(currentRank)}
          {/* レートの名前(小徳) */}
        </Typography>
        <div className={classes.root}>
          <ProgressBarWithLabel value={progress} />
        </div>
      </CardContent>
      <CardContent className={classes.levelRest}>
        <Typography variant="h6" component="h6" align="right" color="primary">
          {getKANIString(numToKANI(currentRank + 1))}まで{' '}
          {props.prevExp + props.score} / {getKANINextRank(currentRank)} pts
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProgressBarWithValueLabel;
