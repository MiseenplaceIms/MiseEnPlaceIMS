import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';

import styles from './styles';
import InvoicedCard from './InvoicedCard';
import TopCards from './TopCards';
import StatisticsCard from './StatisticsCard';
import TopBar from './TopBar';
import { Typography } from '@material-ui/core';
import NavBar from '../NavBar';

const Dashboard = props => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setTimeout(() => setChecked(true), 800);
  }, []);
  const { classes } = props;

  return (
    <>
      <CssBaseline />
      <NavBar history={props.history} />
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid
            spacing={24}
            alignItems="center"
            justify="center"
            container
            className={classes.grid}
          >
            <TopBar name="Jorge Osto" checked={checked} />

            <Grid container spacing={24} style={{ marginBottom: 12 }}>
              <div className={classes.topCardsContainer}>
                <Grid item xs={12} md={4}>
                  <TopCards checked={checked} timeout={1800}>
                    <div className={classes.shortcuts}>
                      <div className={classes.statsContainer}>
                        <Tooltip
                          title="Profits"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <Link to={`/user/invoice/create`}>
                            <div className={classes.shortcutsCircle}>
                              <AttachMoneyIcon
                                style={{
                                  color: 'rgba(255,255,255,0.9)',
                                  fontSize: 36
                                }}
                              />
                            </div>
                          </Link>
                        </Tooltip>
                        <Typography
                          className={classes.labelText}
                          variant="subtitle1"
                        >
                          Profits
                        </Typography>
                      </div>
                      <div className={classes.statsContainer}>
                        <Tooltip
                          title="Inventory"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <Link to={`/orders`}>
                            <div className={classes.shortcutsCircle}>
                              <ReceiptOutlinedIcon
                                style={{
                                  color: 'rgba(255,255,255,0.9)',
                                  fontSize: 36
                                }}
                              />
                            </div>
                          </Link>
                        </Tooltip>
                        <Typography
                          className={classes.labelText}
                          variant="subtitle1"
                        >
                          Inventory
                        </Typography>
                      </div>
                      <div className={classes.statsContainer}>
                        <Tooltip
                          title="Admin"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <div className={classes.shortcutsCircle}>
                            <PeopleAltOutlinedIcon
                              style={{
                                color: 'rgba(255,255,255,0.9)',
                                fontSize: 36
                              }}
                            />
                          </div>
                        </Tooltip>
                        <Typography
                          className={classes.labelText}
                          variant="subtitle1"
                        >
                          Admin
                        </Typography>
                      </div>
                    </div>
                  </TopCards>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TopCards checked={checked} timeout={1000}>
                    <div className={classes.statsContainer}>
                      <Typography variant="h4">Last Order's Cost</Typography>
                      <span className={classes.spentSpan}>{'$13089.12'}</span>
                      <Button className={classes.seeMore} size="small">
                        See more
                      </Button>
                    </div>
                  </TopCards>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TopCards checked={checked} timeout={1400}>
                    <div className={classes.statsContainer}>
                      <Typography variant="h4">Weekly Revenue</Typography>
                      <span className={classes.earnedSpan}>{'$22089.34'}</span>
                      <Button className={classes.seeMore} size="small">
                        See more
                      </Button>
                    </div>
                  </TopCards>
                </Grid>
              </div>
            </Grid>
            <Grid container spacing={24} justify="center">
              <Grid item xs={12} md={4}>
                <StatisticsCard checked={checked} />
              </Grid>
              <Grid item xs={12} md={8}>
                <InvoicedCard checked={checked} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default withRouter(withStyles(styles)(Dashboard));
