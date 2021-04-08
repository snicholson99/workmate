import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '20px 60px'
  }
});

const Header = (props) => {
  const { user, logout } = props;
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.root}>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" width="100%">
        <h1>Workmate</h1>
        {user && (
          <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="center" className={classes.profileContainer}>
            <Avatar src={user.photoURL} alt="Profile avatar" />
            <Button onClick={logout}>Logout</Button>
          </Box>
        )}
      </Box>
    </AppBar>
  );
}

export default Header;