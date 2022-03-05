import * as React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Calendar, Mode, modeToNum} from 'react-native-big-calendar';
import {RootStackParamList} from './Routes';
import {SafeAreaView} from 'react-native-safe-area-context';
import dayjs from 'dayjs';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const events = [
  {
    title: 'BoulderKlub',
    start: new Date(2022, 2, 5, 6, 0),
    end: new Date(2022, 2, 5, 9, 0),
  },
  {
    title: 'Coffee break',
    start: new Date(2020, 1, 11, 15, 45),
    end: new Date(2020, 1, 11, 16, 30),
  },
];
export const styles = StyleSheet.create({
  container: {flex: 1},
});

const darkTheme = {
  palette: {
    primary: {
      main: '#6185d0',
      contrastText: '#000',
    },
    gray: {
      '100': '#333',
      '200': '#666',
      '300': '#888',
      '500': '#aaa',
      '800': '#ccc',
    },
  },
};

const today = new Date();

const HomeScreen = ({navigation}: HomeProps) => {
  const [date, setDate] = React.useState(today);
  const [mode, setMode] = React.useState<Mode>('week');
  const _onPrevDate = () => {
    if (mode === 'month') {
      setDate(
        dayjs(date)
          .add(dayjs(date).date() * -1, 'day')
          .toDate(),
      );
    } else {
      setDate(
        dayjs(date)
          .add(modeToNum(mode, date) * -1, 'day')
          .toDate(),
      );
    }
  };

  const _onNextDate = () => {
    setDate(dayjs(date).add(modeToNum(mode, date), 'day').toDate());
  };

  const _onToday = () => {
    setDate(today);
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <View style={{width: '50%', marginLeft: 'auto'}}>
            <Picker
              onValueChange={setMode}
              mode="dropdown"
              selectedValue={mode}>
              <Picker.Item value="day" label="day" />
              <Picker.Item value="3days" label="3days" />
              <Picker.Item value="week" label="week" />
              <Picker.Item value="month" label="month" />
            </Picker>
          </View>
          <Button
            onPress={() => navigation.navigate('Profile', {name: 'Jane'})}
            title="Profile"
          />
        </>
      ),
    });
  }, [navigation, mode]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={{height: 100, borderBottomWidth: 0.5}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Button title="Today" onPress={_onToday} />
            <Button title=" < " onPress={_onPrevDate} />
            <View style={{marginLeft: 16, width: '60%'}}>
              <Text>{dayjs(date).format('DD MMMM YYYY')}</Text>
            </View>

            <Button title=" > " onPress={_onNextDate} />
          </View>
        </View>
        <Calendar
          date={date}
          theme={darkTheme}
          events={events}
          height={600}
          mode={mode}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
