export default theme => ({
  root: {
    width: '100%',
    flexGrow: 1,
    overflow: 'hidden',
    paddingBottom: 200,
    backgroundColor: '#f2f2f2'
  },
  grid: {
    width: '95%',
    margin: `0 ${theme.spacing.unit * 1}px`,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
  paper: {
    width: '95%',
    backgroundColor: '#ffffff',
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 25
    }
  },
  statistics: {
    height: 300
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit
  },
  legend: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  legendContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '50%'
  },
  legendColors: {
    height: 15,
    width: 15,
    borderRadius: '50%'
  },
  block: {
    padding: theme.spacing.unit * 2,
    paddingLeft: 0
  },
  topCards: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: {
    width: '30%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  invoicesCircle: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.light,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  usersCircle: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.light,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  middleInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '35%'
  },
  seeMore: {
    marginBottom: 25,
    alignSelf: 'flex-end'
  },
  spentSpan: {
    fontWeight: 'bolder',
    fontSize: '2rem',
    color: '#B91736',
    marginTop: '10px'
  },
  labelText: {
    marginTop: 5,
    fontWeight: 'bolder'
  },
  statsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  earnedSpan: {
    fontWeight: 'bolder',
    fontSize: '2rem',
    color: '#335B86',
    marginTop: '10px'
  },
  percentageComparison: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '30%'
  },
  percentagePos: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#8bc34a',
    marginTop: 5
  },
  percentageNeg: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#FF0000',
    marginTop: 5
  },
  topCardsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    margin: '40px 0',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  shortcuts: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px'
  },
  shortcutsCircle: {
    fontSize: 30,
    width: 65,
    height: 65,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.light,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    cursor: 'pointer'
  },
  tooltip: {
    backgroundColor: '#ffffff',
    color: theme.palette.primary.main,
    boxShadow: theme.shadows[1],
    fontSize: 12,
    fontWeight: 'bold',
    border: `1px solid ${theme.palette.primary.main}`
  }
});
