import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import TransferPage from './components/TransferPage/TransferPage'
import AppBar from './components/AppBar/AppBar'
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const theme = createMuiTheme({
  direction: 'rtl', 
});

const useStyles = makeStyles((theme) => ({
  Appbar: {
    color:'red',
    paddingBottom:theme.spacing(10),
    marginButton:theme.spacing(2),
  }

}));

function App() {
  const classes = useStyles();
  return (
    <StylesProvider jss={jss}>
    <ThemeProvider theme={theme}> 
      <AppBar className={classes.Appbar}/>
      <TransferPage className={classes.Appbar}/>
    </ThemeProvider>
     </StylesProvider>
 
  );
}


export default App;
