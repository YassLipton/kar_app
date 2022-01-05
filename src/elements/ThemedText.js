import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity, Button, SafeAreaView } from 'react-native';
import ThemeContext from '../context/ThemeContext';

const ThemedText = ({
  children,
  isPrimary,
  isSecondary,
  isWhite,
  isBold,
  isHeadingTitle,
  isCenter,
  hasMargin,
  style,
  ...rest
}) => {
  const {setMode, mode, theme} = React.useContext(ThemeContext);
  const {primary, secondary, text} = theme.colors;
  let color = text;
  let fontSize = 14;
  let marginTop = 0;
  let textAlign;

  if (isSecondary) {
    color = secondary;
    fontSize = 13;
  }

  if (isHeadingTitle) {
    fontSize = 20;
  }

  if (isPrimary) {
    color = primary;
  }

  if (isWhite) {
    color = 'white';
  }

  if (isCenter) {
    textAlign = 'center';
  }

  if (hasMargin) {
    marginTop = 10;
  }

  const fontWeight = isBold ? 'bold' : 'normal';
  return (
    <Text
      {...rest}
      style={[
        {
          color,
          fontWeight,
          fontSize,
          textAlign,
          marginTop,
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export default ThemedText;