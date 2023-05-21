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
        command: 'next',
        callback: () => setValue(prev => prev + 1),
      },
      {
        command: 'previous',
        callback: () => setValue(prev => prev - 1),
      },
      {
        command: 'show ingredients',
        callback: () => setShowIngredients(true)
      },
      {
        command: 'hide ingredients',
        callback: () => setShowIngredients(false)
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
      {showIngredients && <div>INGREDIENTS</div>}
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
