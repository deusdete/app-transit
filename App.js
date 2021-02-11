import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppStack from './src/routes/AppStack';

export default function App() {
  

  return (
    <PaperProvider>
      <AppStack/>
    </PaperProvider>
  );
}
