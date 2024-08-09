import React, { memo } from 'react';

function ProfilePic() {
  return (
    <div className="pfp-container">
      <img src="/assets/pfp/butters.jpg" style={{ borderRadius: '2px' }} height="200px" width="190px" />
    </div>
  );
}

export default memo(ProfilePic);