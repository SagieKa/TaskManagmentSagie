import React , {useEffect} from 'react';
import firebase from '../../firebase'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 400,
    height: 400,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function TransferList() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [item1, setItem1] = React.useState([]);
  const [item2, setItem2] = React.useState([]);
  const [item3, setItem3] = React.useState([]);
  const [item4, setItem4] = React.useState([]);
  const [item5, setItem5] = React.useState([]);
  const [user,setUser] =React.useState('')


useEffect(()=>{
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user)
    authDb()
    // ...
    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //       console.log(user.email)
    //       if(user.email==='sagieka@gmail.com') authDb()
    //   } else {
    //     // No user is signed in.
    //   }
    // });
  }).catch((error) => {
console.log(error)
  });
},[])  
const authDb=() => {
    setItem1([])
    setItem2([])
    setItem3([])
    setItem4([])
    setItem5([])
    var i1 = []
    var i2 = []
    var i3 = []
    var i4 = []
    var i5 = []
    const tasksRef = firebase.database().ref('tasks')
    tasksRef.on('value', (snapshot)=>{
      var tasksdB= snapshot.val()

      Object.keys(tasksdB).map(function(object, index) {
      
        var num = tasksdB[object].type
        switch(num) {
         case "1":
             i1.push({...tasksdB[object],object})
           break;
         case "2":
             i2.push({...tasksdB[object],object})
           break;
         case "3":
             i3.push({...tasksdB[object],object})
           break;
         case "4":
             i4.push({...tasksdB[object],object})
           break;
         case "5":
             i5.push({...tasksdB[object],object})
           break;
         default:
           // code block
       }
      });
    setItem1(i1)
    setItem2(i2)
    setItem3(i3)
    setItem4(i4)
    setItem5(i5)
     i1 = []
     i2 = []
     i3 = []
     i4 = []
     i5 = []
})}


  const item1Checked = intersection(checked, item1);
  const item2Checked = intersection(checked, item2);
  const item3Checked = intersection(checked, item3);
  const item4Checked = intersection(checked, item4);
  const item5Checked = intersection(checked, item5);
    const Add =(ListObjects)=>{
        ListObjects.map((o,i)=>{
          var num = Number(o.type)
          firebase.database().ref(`tasks/${o.object}/type`).set(
           String(num+1)
            
              );
            })
    }
    const Minus =(ListObjects)=>{
        ListObjects.map((o,i)=>{
          var num = Number(o.type)
          firebase.database().ref(`tasks/${o.object}/type`).set(
            String(num-1)
            
              );
            })
    }


  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };
  const handleChecked1 = () => {
    setItem2(item2.concat(item1Checked));
    setItem1(not(item1, item1Checked));
    setChecked(not(checked, item1Checked));
    Add(item1Checked)
  };

  const handleChecked2 = () => {
    setItem1(item1.concat(item2Checked));
    setItem2(not(item2, item2Checked));
    setChecked(not(checked, item2Checked));
    Minus(item2Checked)
  };

  const handleChecked3 = () => {
    setItem3(item3.concat(item2Checked));
    setItem2(not(item2, item2Checked));
    setChecked(not(checked, item2Checked));
    Add(item2Checked)
  };
  const handleChecked4 = () => {
    setItem2(item2.concat(item3Checked));
    setItem3(not(item3, item3Checked));
    setChecked(not(checked,item3Checked));
    Minus(item3Checked)
  };

  const handleChecked5 = () => {
    setItem4(item4.concat(item3Checked));
    setItem3(not(item3, item3Checked));
    setChecked(not(checked, item3Checked));
    Add(item3Checked)
  };
  const handleChecked6 = () => {
    setItem3(item3.concat(item4Checked));
    setItem4(not(item4, item4Checked));
    setChecked(not(checked,item4Checked));
    Minus(item4Checked)
  };

  const handleChecked7 = () => {
    setItem5(item5.concat(item4Checked));
    setItem4(not(item4, item4Checked));
    setChecked(not(checked, item4Checked));
    Add(item4Checked)
  };
  const handleChecked8 = () => {
    setItem4(item4.concat(item5Checked));
    setItem5(not(item5, item5Checked));
    setChecked(not(checked,item5Checked));
    Minus(item5Checked)
  };



  const customList = (title, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} נבחרו`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary=
              { `${value.rashaz}:${value.smallName}`}
               />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
      <Grid item>{customList('תוכנית עבודה', item1)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleChecked1}
            disabled={item1Checked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleChecked2}
            disabled={item2Checked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('בתכנון', item2)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleChecked3}
            disabled={item2Checked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleChecked4}
            disabled={item3Checked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('מעקב', item3)}</Grid>
      <Grid item/>
      <Grid item/>
      <Grid item/>

      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleChecked5}
            disabled={item3Checked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleChecked6}
            disabled={item4Checked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('בוצע', item4)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleChecked7}
            disabled={item4Checked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleChecked8}
            disabled={item5Checked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('נדחה', item5)}</Grid>
    </Grid>
  );
}
