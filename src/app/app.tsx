import styled from '@emotion/styled';
import 'regenerator-runtime/runtime';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import React, { useCallback, useEffect, useState } from 'react';

const TestApp = styled.div`
  text-align: center;
  font-family: sans-serif;
  padding: 2rem;
`;

const Recipie = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showIngredients, setShowIngredients] = useState(false);

  const keyPressHandler = useCallback(({ key }: KeyboardEvent) => {
    switch (key) {
      case 'ArrowUp':
      case 'ArrowRight':
        stepForward();
        break;
      case 'ArrowDown':
      case 'ArrowLeft':
        stepBackward();
        break;
      default:
        break;
    }
  }, []);

  const stepForward = () => {
    //todo: add check for last step
    setCurrentStep((prev) => prev + 1);
  };

  const stepBackward = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : 0));
  };

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
    window.addEventListener('keydown', keyPressHandler);
    return () => {
      SpeechRecognition.stopListening();
      window.removeEventListener('keydown', keyPressHandler);
    };
  }, [keyPressHandler]);

  const commands = [
    {
      command: ['next step', 'forward'],
      callback: () => stepForward(),
      isFuzzyMatch: true,
    },
    {
      command: ['previous step', 'step back', 'back', 'go back'],
      callback: () => stepBackward(), 
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
        <strong>VALUE: {currentStep}</strong>
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
    <TestApp>
      <Recipie />
    </TestApp>
  );
}

export default App;
