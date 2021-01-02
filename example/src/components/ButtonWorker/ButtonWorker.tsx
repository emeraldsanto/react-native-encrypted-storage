import React, { FC, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { ButtonWorkerProps } from './ButtonWorkerProps';
import { ButtonWorkerStyle } from './ButtonWorkerStyle';

export const ButtonWorker: FC<ButtonWorkerProps> = (props) => {
  const { title, onPress, children } = props;
  const [working, setWorking] = useState<boolean>(false);

  function onButtonPress() {
    if (working) {
      return;
    }

    setWorking(true);
    onPress?.(() => setWorking(false));
  }

  return (
    <TouchableOpacity
      disabled={working}
      activeOpacity={0.6}
      onPress={onButtonPress}
      style={ButtonWorkerStyle.button}
    >
      {working ? (
        <ActivityIndicator color={ButtonWorkerStyle.text.color} />
      ) : title ? (
        <Text style={ButtonWorkerStyle.text}>{title}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};
