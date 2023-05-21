import styled from '@emotion/styled';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useEffect, useState } from 'react';

const StyledApp = styled.div`
  // Your style here
`;

const Recipie = () => {
  const [value, setValue] = useState(0);
  const [showIngredients, setShowIngredients] = useState(false);

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
  }, [value]);

  const commands = [
      {
        command: 'next step',
        callback: () => setValue(prev => prev + 1),
        isFuzzyMatch: true,
      },
      {
        command: 'previous step',
        callback: () => setValue(prev => prev - 1),
        isFuzzyMatch: true,
      },
      {
        command: 'show ingredients',
        callback: () => setShowIngredients(true),
        isFuzzyMatch: true,
      },
      {
        command: 'hide ingredients',
        callback: () => setShowIngredients(false),
        isFuzzyMatch: true,
      }
    ];

  const {
    browserSupportsSpeechRecognition,
    transcript
  } = useSpeechRecognition({ commands });

  

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={() => setValue(60)}>SET</button>
      <p><strong>VALUE: {value}</strong></p>
      <p>We Are Listening!</p>
      <p>{transcript}</p>
      {showIngredients &&
        <div>
          INGREDIENTS:
          <ul>
            <li>1 cup of sugar</li>
            <li>1 cup of flour</li>
            <li>1 cup of milk</li>
          </ul>
           </div>}
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
