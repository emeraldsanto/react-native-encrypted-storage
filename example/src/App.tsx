import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { getAllKeys, getItem, multiGet, multiRemove } from 'react-native-encrypted-storage';

export default function App() {
  const [result, setResult] = React.useState<Array<string>>([]);

  React.useEffect(() => {
    getAllKeys().then((keys) => {
      console.log('All keys', keys);
      multiGet(keys).then((values) => {
        console.log(values);
        multiRemove(keys).then(() => {
          getAllKeys().then((remaining) => {
            console.log('Remaining keys after deletion', remaining)
          })
        })
      })
    })
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {JSON.stringify(result)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
