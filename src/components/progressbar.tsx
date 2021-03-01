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
  KANI_ZYUUNIKAI,
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
    syochi: {
      color: theme.palette.syochi.main,
    },
    daichi: {
      color: theme.palette.daichi.main,
    },
    syogi: {
      color: theme.palette.syogi.main,
    },
    daigi: {
      color: theme.palette.daigi.main,
    },
    syoshin: {
      color: theme.palette.syoshin.main,
    },
    daishin: {
      color: theme.palette.daishin.main,
    },
    syorei: {
      color: theme.palette.syorei.main,
    },
    dairei: {
      color: theme.palette.dairei.main,
    },
    syozin: {
      color: theme.palette.syozin.main,
    },
    daizin: {
      color: theme.palette.daizin.main,
    },
    syotoku: {
      color: theme.palette.syotoku.main,
    },
    daitoku: {
      color: theme.palette.daitoku.main,
    },
  }),
);

const ProgressBarWithValueLabel = (props: {
  prevExp: number;
  score: number;
}) => {
  const classes = useStyles();

  const getColorClass = (rank: KANI_ZYUUNIKAI): string => {
    switch (rank) {
      case 1:
        return classes.syochi;
      case 2:
        return classes.daichi;
      case 3:
        return classes.syogi;
      case 4:
        return classes.daigi;
      case 5:
        return classes.syoshin;
      case 6:
        return classes.daishin;
      case 7:
        return classes.syorei;
      case 8:
        return classes.dairei;
      case 9:
        return classes.syozin;
      case 10:
        return classes.daizin;
      case 11:
        return classes.syotoku;
      case 12:
        return classes.daitoku;
      default:
        return classes.syochi;
    }
  };

  const [progress, setProgress] = useState<number>(0);
  const [progressNext, setProgressNext] = useState<number>(0);
  const [currentRank, setCurrentRank] = useState<number>(1);
  const [nextRank, setNextRank] = useState<number>(1);
  const [moreThan100, setMoreThan100] = useState(false);

  useEffect(() => {
    const params = initializeProgressBarParameters(props.prevExp, props.score);
    console.log(params);
    setProgress(params.beforePercentage);
    setProgressNext(params.afterPercentage);
    setCurrentRank(params.beforeRank);
    setNextRank(params.afterRank);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (currentRank === nextRank || moreThan100) {
        setProgress(Math.min(progressNext, progress + 5));
      } else if (progress === 100) {
        setCurrentRank(nextRank);
        setNextRank(numToKANI(nextRank + 1));
        setMoreThan100(true);
        setProgress(0);
      } else {
        setProgress(Math.min(100, progress + 5));
      }
    }, 500);
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
          className={getColorClass(numToKANI(currentRank))}
        >
          {getKANIString(numToKANI(currentRank))}
          {/* レートの名前(小徳) */}
        </Typography>
        <div className={classes.root}>
          <ProgressBarWithLabel value={progress} />
        </div>
      </CardContent>
      <CardContent className={classes.levelRest}>
        <Typography
          variant="h6"
          component="h6"
          align="right"
          color="primary"
          className={getColorClass(numToKANI(currentRank + 1))}
        >
          {getKANIString(numToKANI(currentRank + 1))}まで{' '}
          {props.prevExp + props.score} /{' '}
          {getKANINextRank(numToKANI(currentRank))} pts
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProgressBarWithValueLabel;
