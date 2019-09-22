import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';

import styles from './styles';
import StatisticsChart from './StatisticsChart';

const StatisticsCard = props => {
  const { checked, classes } = props;
  return (
    <Zoom
      in={checked}
      style={{
        transitionDelay: checked ? '1000ms' : '0ms'
      }}
    >
      <>
        <Paper className={classes.paper} style={{ position: 'relative' }}>
          <div className={classes.statistics}>
            <Typography variant="h4" gutterBottom>
              This Month's Profits
            </Typography>
            <StatisticsChart />
          </div>
        </Paper>
        <Paper className={classes.paper} style={{ marginTop: 30 }}>
          <div className={classes.legend}>
            <div className={classes.legendContainer}>
              <div
                className={classes.legendColors}
                style={{ backgroundColor: '#242555', alignSelf: 'flex-start' }}
              />
              <Typography variant="subtitle1">Revenue to Date</Typography>
            </div>
            <div className={classes.legendContainer}>
              <div
                className={classes.legendColors}
                style={{ backgroundColor: '#E84A68', alignSelf: 'flex-start' }}
              />
              <Typography variant="subtitle1">Salaries</Typography>
            </div>
            <div className={classes.legendContainer}>
              <div
                className={classes.legendColors}
                style={{ backgroundColor: '#873F4F', alignSelf: 'flex-start' }}
              />
              <Typography variant="subtitle1">Utilities</Typography>
            </div>
            <div className={classes.legendContainer}>
              <div
                className={classes.legendColors}
                style={{ backgroundColor: '#85838B', alignSelf: 'flex-start' }}
              />
              <Typography variant="subtitle1">Grocery</Typography>
            </div>
            <div className={classes.legendContainer}>
              <div
                className={classes.legendColors}
                style={{ backgroundColor: '#BFBFBF', alignSelf: 'flex-start' }}
              />
              <Typography variant="subtitle1">Maintenance</Typography>
            </div>
          </div>
        </Paper>
      </>
    </Zoom>
  );
};

export default withStyles(styles)(StatisticsCard);
