import * as React from 'react';
import { useMsal } from '@azure/msal-react';

const LandingPage: React.FC = () => {
  const { accounts } = useMsal();
  const user = accounts[0];

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Welcome, {user?.name || user?.username || 'User'}!</h1>
      <p>This is your personalized learning dashboard.</p>
      {/* Add more personalized content here */}
    </main>
  );
};

export default LandingPage;
