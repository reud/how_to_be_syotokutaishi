import {
  Box,
  LinearProgress,
  LinearProgressProps,
  makeStyles,
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

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

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
    <div className={classes.root}>
      <ProgressBarWithLabel value={progress} />
    </div>
  );
};

export default ProgressBarWithValueLabel;
