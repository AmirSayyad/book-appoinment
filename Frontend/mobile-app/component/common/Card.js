import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
  return (
    <View style={styles.container}>
      {props.children}
    </View>
  );
};

const styles = {
  container:{
    flex:1,
    marginTop:10,
    marginLeft: 5,
    marginRight: 5,
    shadowColor: '#F0F3F8',
    borderColor: 'transperent',  
    borderWidth: 0,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    padding: 10,
  }
};

export { Card };
