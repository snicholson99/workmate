import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import Clock from "../Clock";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 60px'
  }
});

// const openSettings = () => {
//   alert("coming soon!");
// }

const Header = (props) => {
  const { user, logout } = props;
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.root}>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" width="100%">
      <Typography variant="h5" component="h1">Workmate</Typography>
        <Clock type="analog" />
        <Clock />
        {user && (
          <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="center" className={classes.profileContainer}>
            <Avatar src={user.photoURL} alt="Profile avatar" />
            {/* <Settings /> */}
            {/* <Button onClick={openSettings}>Settings</Button> */}
            <Button onClick={logout}>Logout</Button>
          </Box>
        )}
      </Box>
    </AppBar>
  );
}

export default Header;