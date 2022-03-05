import React from 'react';
import {useColorScheme} from 'react-native';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';

import Routes from './app/Routes';

const App = () => {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Routes />
    </NavigationContainer>
  );
};

export default App;
