import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import HomeScreen from './Home';

export type RootStackParamList = {
  Home: undefined;
  Profile: {name: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type ProfileProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

const ProfileScreen = ({route}: ProfileProps) => {
  return (
    <View style={styles.container}>
      <Text>This is {route.params.name}'s profile</Text>
    </View>
  );
};

const Routes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default Routes;
