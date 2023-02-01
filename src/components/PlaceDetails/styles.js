import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  chip: {
    margin: '5px 5px 5px 0',
  },
  subtitle: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px',
  },
  spacing: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  card:{
    display:'flex', flexWrap:"wrap",
  },
  cardcontent:{
    padding:"0px 5px 0 0",
    margin:"5px 5px 0px 5px",
    width:"70%",
   
  },
  rating:{
    margin:"0px 0px 0 8px"
  },
  placeTitle: {
    fontSize: '1.15rem',
    marginBottom:"5px",
    textAlign:"center",
    '@media (min-width:600px)': {
      fontSize: '1.3rem',
      textAlign:"left",
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2.4rem',
    },
  },
  description: {
    float:"right",
    fontSize: '0.8rem',
    '@media (min-width:600px)': {
      fontSize: '1rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.2rem',
    },
  },
}));