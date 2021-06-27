import { useState } from 'react';

import './App.scss';
import Home from './Components/Home';
import { TriggerContext } from './Context/ButtonTriggerContext';

const App: React.FC = () => {
  const [trigger, setTrigger] = useState<string>('');
  return (
    <div className="App">
      <TriggerContext.Provider value={{ trigger, setTrigger }}>
        <Home />
      </TriggerContext.Provider>
    </div>
  );
};

export default App;
