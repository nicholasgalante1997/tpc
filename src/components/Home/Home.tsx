import React, { memo } from 'react';

import { useSolidAuthContext } from '@/contexts';
import { useFetchPodResourceList } from '@/hooks/useFetchPodFileList';
import ProfileWidget from './components/ProfileWidget';
import Card from '../Card/Card';

function Home() {
  const { isAuthenticated, session } = useSolidAuthContext();
  const { data } = useFetchPodResourceList(session, isAuthenticated);
  return (
    <div id="home-page-root">
      <ProfileWidget />
      <div className="description-container">
        <p className="space-mono-bold">You made it to my pod, that's awesome!</p>
      </div>
      <div className="suggestion-cards-container">
        <Card
          title="Learn About Solid Protocol"
          desc={`Solid is an open standard for structuring data, digital identities, and applications on the Web. Solid aims to support the creation of the Web as Sir Tim Berners-Lee originally envisioned it when he invented the Web at CERN in 1989. Tim sometimes refers to Solid as “the web - take 3" — or Web3.0 — because Solid integrates a new layer of standards into the Web we already have. The goal of Solid is for people to have more agency over their data.`}
          link="https://solidproject.org/about.html"
          img="https://solidproject.org/image/logo.svg"
        />
        <Card
          title="Pikachu Pod Project"
          desc="Our data is a representation of who we are. A lot of who we are, are the things that we care about."
          link="#"
          img="/assets/pokemon/gen1.jpg"
        />
        <Card
          title="Learn About Solid Protocol"
          desc="Solid Protocol "
          link="#"
          img="/assets/pokemon/gen1.jpg"
        />
        <Card
          title="Learn About Solid Protocol"
          desc="Solid Protocol "
          link="#"
          img="/assets/pfp/butters.jpg"
        />
        <Card
          title="Learn About Solid Protocol"
          desc="Solid Protocol "
          link="#"
          img="/assets/pfp/butters.jpg"
        />
      </div>
    </div>
  );
}

export default memo(Home);
