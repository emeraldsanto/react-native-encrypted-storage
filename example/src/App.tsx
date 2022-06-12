import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { getItem } from 'react-native-encrypted-storage';

export default function App() {
  const [result, setResult] = React.useState<Array<string>>([]);

  React.useEffect(() => {
    getItem('seul').then((v) => setResult([v]))
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
