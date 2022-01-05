import React, { useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity, Button, ActivityIndicator } from 'react-native';

export default class Loading extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  render() {

    return (
      <View style={styles.fullPage}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

let styles = StyleSheet.create({
  fullPage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center'
  },
});