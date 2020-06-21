import React from 'react';

import dataYaml from './data/data.yaml';

const Item = ({ titre, moyenne }) => (
  <div>
    <span>{titre}</span>
    <span>{moyenne}</span>
  </div>
);

const Home = () => (
  <div>
    {dataYaml.extraUrbains.map((transport) => (
      <Item key={transport.titre} titre={transport.titre} moyenne={transport.moyenne} />
    ))}
  </div>
);

export default Home;
