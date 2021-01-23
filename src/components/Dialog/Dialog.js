import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { makeStyles } from '@material-ui/core/styles';
import firebase from '../../firebase'

const useStyles = makeStyles((theme) => ({
    button: {
      color: 'white',
    },
})); 


export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [smallName, setSmallNamen] = React.useState('');
  const [rashaz, setRashaz] = React.useState('');
  const [details, setDetails] = React.useState('');
  const [type, setType] = React.useState('');

  const classes = useStyles();

  function broofa() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}
  const handleOnChange= (item)=>{
    switch(item.target.id) {
        case "smallName":
            setSmallNamen(item.target.value)
          break;
        case "rashaz":
            setRashaz(item.target.value)
          break;
        case "details":
            setDetails(item.target.value)
          break;
        case "type":
            setType(item.target.value)
          break;
        default:
          // code block
      }
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleButton =()=>{
      var uniqId=broofa()
      var item = {}
      var content = {smallName,rashaz,details,type}
      item[uniqId]=content
      firebase.database().ref(`tasks/${uniqId}`).set(
        {...content}
      );
      setOpen(false);
  }
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button className={classes.button} onClick={handleClickOpen}>
      <PostAddIcon />
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">הוספה</DialogTitle>
        <DialogContent>
          <DialogContentText>
            תהליך הוספת משימה 
          </DialogContentText>
          <TextField
          onChange={handleOnChange}
            autoFocus
            margin="dense"
            id="smallName"
            label="שם מקוצר"
            type="string"
            fullWidth
          />
          <TextField
          onChange={handleOnChange}
            autoFocus
            margin="dense"
            id="rashaz"
            label="שם הרשצ"
            type="string"
            fullWidth
          />
          <TextField
          onChange={handleOnChange}
            autoFocus
            margin="dense"
            id="details"
            label="פרטים"
            type="string"
            fullWidth
          />
          <TextField
            onChange={handleOnChange}
            autoFocus
            margin="dense"
            id="type"
            label="תבנית"
            type="number"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            ביטול
          </Button>
          <Button onClick={handleButton} color="primary">
            הוספה
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
