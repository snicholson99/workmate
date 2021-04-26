import Clock from "../Clock";
import './style.css';

// const openSettings = () => {
//   alert("coming soon!");
// }

const Header = (props) => {
  const { user, logout } = props;
  return (
    <header>
      <a href="/"><h1>Workmate</h1></a>
      <Clock type="analog" />
      <Clock />
      {user && (
        <div id="profile-container">
          <img src={user.photoURL} alt="Profile avatar" />
          <div className="display-flex flex-row">
            {/* <button onClick={openSettings} className="hover-to-show">Settings</button> */}
            <button id="logout-button" className="hover-to-show" onClick={logout}>Logout</button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;