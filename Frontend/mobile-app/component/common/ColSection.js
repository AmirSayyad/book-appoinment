import React from 'react';
import { View } from 'react-native'

const ColSection = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
      justifyContent: 'flex-start',
      flexDirection: 'column',
      position: 'relative',
  }
};

export { ColSection };
