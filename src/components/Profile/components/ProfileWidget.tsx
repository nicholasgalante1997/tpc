import React, { memo } from 'react';
import ProfilePic from './ProfilePic';
import ProfileInfo from './ProfileInfo';

function ProfileWidget() {
  return (
    <div className="profile-container">
      <ProfilePic />
      <ProfileInfo />
    </div>
  );
}

export default memo(ProfileWidget);
