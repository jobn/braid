import React from 'react';

const Profile = ({ name, onLogout }) => (
  <div>
    Signed in as {name}
    <button onClick={onLogout}>Sign out</button>
  </div>
);

export default Profile;
