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
import React, { useState } from 'react';

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
  const [progress, setProgress] = useState(props.prevExp);
  const [rest, setRest] = useState(props.score);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= props.prevExp + rest) {
          return prevProgress;
        } else if (prevProgress + 10 > props.prevExp + rest) {
          return props.prevExp + rest;
        } else {
          return prevProgress + 10 >= 100 ? 100 : prevProgress + 10;
        }
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

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
          小徳
          {/* レートの名前(小徳) */}
        </Typography>
        <div className={classes.root}>
          <ProgressBarWithLabel value={progress} />
        </div>
      </CardContent>
      <CardContent className={classes.levelRest}>
        <Typography variant="h6" component="h6" align="right" color="primary">
          大徳まで 877 / 1200 pts
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProgressBarWithValueLabel;
