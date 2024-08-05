import { useProfileContext } from '@/contexts';
import React, { memo } from 'react';

function ProfileInfo() {
  const { contact, occupation } = useProfileContext();
  return (
    <div className="profile-text">
      <h1 className="space-mono-bold app-name">nick&apos;s pod</h1>
      <div>
        <p className="space-mono-bold-italic">{occupation.role} @ {occupation.company}</p>
        <a href={`mailto:${contact.email}`} className="space-mono-bold">
          Contact: &lt; {contact.email} &gt;
        </a>
      </div>
      <div className="badge-container">
        <span className="badge green" aria-roledescription="Welcome Badge">
          Welcome to my pod!
        </span>
        <span className="badge red" aria-roledescription="Compliance Badge">
          <img src="https://solidproject.org/image/logo.svg" height="24px" width="24px" />
          Solid Compliant
        </span>
      </div>
    </div>
  );
}

export default memo(ProfileInfo);
