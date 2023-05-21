import styled from '@emotion/styled';
import 'regenerator-runtime/runtime';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import React, { useEffect, useState } from 'react';

const StyledApp = styled.div`
  text-align: center;
  font-family: sans-serif;
  padding: 2rem;
`;

const Recipie = () => {
  const [value, setValue] = useState(0);
  const [showIngredients, setShowIngredients] = useState(false);

  const keyPressHandler = ({ key }: KeyboardEvent) => {
    switch (key) {
      case 'ArrowUp':
      case 'ArrowRight':
        setValue((prev) => prev + 1);
        break;
      case 'ArrowDown':
      case 'ArrowLeft':
        setValue((prev) => prev - 1);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
    window.addEventListener('keydown', keyPressHandler);
    return () => {
      SpeechRecognition.stopListening();
      window.removeEventListener('keydown', keyPressHandler);
    };
  }, []);

  const commands = [
    {
      command: 'next step',
      callback: () => setValue((prev) => prev + 1),
      isFuzzyMatch: true,
    },
    {
      command: 'previous step',
      callback: () => setValue((prev) => prev - 1),
      isFuzzyMatch: true,
    },
    {
      command: ['show ingredients', 'show recipe', 'open recipe'],
      callback: () => setShowIngredients(true),
      isFuzzyMatch: true,
    },
    {
      command: ['hide ingredients', 'hide recipe', 'close recipe'],
      callback: () => setShowIngredients(false),
      isFuzzyMatch: true,
    },
  ];

  const { browserSupportsSpeechRecognition, transcript } = useSpeechRecognition(
    { commands }
  );

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <p>
        <strong>VALUE: {value}</strong>
      </p>
      <p>Use arrow keys or voice</p>
      <p>{transcript}</p>
      {showIngredients && (
        <div
          style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3>Ingredients:</h3>
            <p>1 cup of sugar</p> 
            <p>1 cup of flour</p>
            <p>1 cup of milk</p>
          </div>
        </div>
      )}
    </div>
  );
};

export function App() {
  return (
    <StyledApp>
      <Recipie />
    </StyledApp>
  );
}

export default App;
