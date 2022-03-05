import * as React from 'react';
import {
  Button,
  Text,
  View,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Agenda,
  DateData,
  AgendaSchedule,
  AgendaEntry,
} from 'react-native-calendars';

import {RootStackParamList, styles as TemplateStyles} from './Routes';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

function timeToString(time: number) {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
}

const HomeScreen = ({navigation}: HomeProps) => {
  const [items, setItems] = React.useState<AgendaSchedule | undefined>(
    undefined,
  );

  function loadItems(day: DateData) {
    console.log(day);
    const itemsCopy: any = items || {};

    setTimeout(() => {
      for (let i = -5; i < 10; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!itemsCopy[strTime]) {
          itemsCopy[strTime] = [];

          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            itemsCopy[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime,
            });
          }
        }
      }

      const newItems: AgendaSchedule = {};
      Object.keys(itemsCopy).forEach(key => {
        newItems[key] = itemsCopy[key];
      });
      // setItems({
      //   items: newItems,
      // });
    }, 1000);
  }

  const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    console.log('iam here');
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';

    return (
      <TouchableOpacity
        style={[styles.item, {height: reservation.height}]}
        onPress={() => Alert.alert(reservation.name)}>
        <Text style={{fontSize, color}}>{reservation.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    console.log('iam empty');
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  };

  return (
    <View style={TemplateStyles.container}>
      <Text>test</Text>
      <Agenda
        testID="test"
        items={items}
        loadItemsForMonth={loadItems}
        markedDates={{}}
        showOnlySelectedDayItems
        onCalendarToggled={day => console.log(day, ' test')}
        onDayChange={day => console.log(day, ' test')}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        showClosingKnob={true}
      />
      <Button
        title="Go to Jane's profile"
        onPress={() => navigation.navigate('Profile', {name: 'Jane'})}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});

export default HomeScreen;
