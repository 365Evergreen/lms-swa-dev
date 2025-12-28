import React from 'react';
import { useParams } from 'react-router-dom';

const WPPage: React.FC = () => {
  const { parent, slug } = useParams();
  // You can fetch WordPress content by slug here if needed
  return (
    <div style={{ padding: '2rem' }}>
      <h2>WordPress Page</h2>
      <p>Parent: {parent}</p>
      <p>Slug: {slug}</p>
      {/* TODO: Fetch and render WordPress content by slug */}
    </div>
  );
};

export default WPPage;
