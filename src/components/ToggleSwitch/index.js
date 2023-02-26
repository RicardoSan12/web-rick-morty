import React from 'react';
import './style.css';
const ToggleSwitch = ({ theme, changeTheme }) => (
  <>
    <input type="checkbox" id="toggle-switch" checked={!theme} onChange={changeTheme} />
    <label for="toggle-switch"><div id="star"></div><div id="moon"></div></label>
  </>
);

export default ToggleSwitch;
