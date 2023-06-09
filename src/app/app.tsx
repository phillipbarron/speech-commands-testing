import { Button } from '@mui/material';
import 'regenerator-runtime/runtime';
import { useState } from 'react';
import { ChefMode } from './chef-mode';

const App = () => {
  const [showChefMode, setShowChefMode] = useState(false);

  return (
    <div>
      <h1>Recipes 'n that</h1>
      <Button
        variant="contained"
        onClick={() => setShowChefMode(!showChefMode)}
        size='small'
        sx={{ borderRadius: 0 }}
      >
        {' '}
        {showChefMode ? 'Hide' : 'Show'} ChefMode
      </Button>
      {showChefMode && <ChefMode />}
    </div>
  );
};

export default App;
