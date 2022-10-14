import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  pageTitleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(5),
  },
  typo: {
    color: theme.palette.text.hint,
  },
  button: {
    boxShadow:
      '0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
    textTransform: 'none',
    '&:active': {
      boxShadow: '0px 12px 33px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A',
    },
  },
}));
