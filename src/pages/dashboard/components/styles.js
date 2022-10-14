import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  fullHeightBody: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  tableWidget: {
    overflowX: 'auto',
  },
  progressBarPrimary: {
    backgroundColor: theme.palette.primary.main,
  },
  progressBarWarning: {
    backgroundColor: theme.palette.warning.main,
  },
  performanceLegendWrapper: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  legendElement: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(2),
  },
  mainChartLegentElement: {
    fontSize: '18px !important',
    marginLeft: theme.spacing(1),
  },
  success: {
    backgroundColor: theme.palette.success.main,
    color: '#fff',
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
    color: '#fff',
  },
  secondary: {
    backgroundColor: theme.palette.secondary.main,
    color: '#fff',
  },
}));
