import * as React from 'react';
import {Button, Text, View} from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Profile: {name: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type ProfileProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const HomeScreen = ({navigation}: HomeProps) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>test</Text>
      <Button
        title="Go to Jane's profile"
        onPress={() => navigation.navigate('Profile', {name: 'Jane'})}
      />
    </View>
  );
};

const ProfileScreen = ({navigation, route}: ProfileProps) => {
  console.log(navigation);
  return <Text>This is {route.params.name}'s profile</Text>;
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
