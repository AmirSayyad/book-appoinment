import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const ButtonN = ({ onPress, children, disabled }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle} disabled={disabled}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonStyle: {
      flex: 1,
      alignSelf: 'stretch',
      backgroundColor: '#0095ff',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#007aff',
      marginLeft: 5,
      marginRight: 5,
      padding: 4
  }
};

export { ButtonN };
