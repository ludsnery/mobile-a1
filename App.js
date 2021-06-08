import { StatusBar } from 'expo-status-bar';
import React from 'react';

import Tab from './Tab';
import { LoadingProvider } from './contexts/Loading';
export default function App() {
  return (
    <LoadingProvider>
      <Tab />
      <StatusBar style='light'/>
    </LoadingProvider>
  );
}
