import React, { useEffect, useState } from 'react'
import { View as DefaultView, Text as DefaultText, TouchableOpacity as DefaultTouchableOpacity } from 'react-native'
import ThemeContext from '../context/ThemeContext'

export const View = ({
  children,
  isBackgrounded,
  isPrimary,
  isSecondary,
  isWhite,
  isCard,
  style,
  ...rest
}) => {
  const {setMode, mode, theme} = React.useContext(ThemeContext)
  const {primary, secondary, card, background} = theme.colors
  let backgroundColor

  if (isBackgrounded) {
    backgroundColor = background
  }

  if (isPrimary) {
    backgroundColor = primary
  }

  if (isSecondary) {
    backgroundColor = secondary
  }

  if (isWhite) {
    backgroundColor = 'white'
  }

  if (isCard) {
    backgroundColor = card
  }

  return (
    <DefaultView
      {...rest}
      style={[
        {
          backgroundColor
        },
        style,
      ]}>
      {children}
    </DefaultView>
  )
}

export const TouchableOpacity = ({
  children,
  isBackgrounded,
  isPrimary,
  isSecondary,
  isWhite,
  isCard,
  style,
  ...rest
}) => {
  const {setMode, mode, theme} = React.useContext(ThemeContext)
  const {primary, secondary, card, background} = theme.colors
  let backgroundColor = style.backgroundColor

  if (isBackgrounded) {
    backgroundColor = background
  }

  if (isPrimary) {
    backgroundColor = primary
  }

  if (isSecondary) {
    backgroundColor = secondary
  }

  if (isWhite) {
    backgroundColor = 'white'
  }

  if (isCard) {
    backgroundColor = card
  }

  return (
    <DefaultTouchableOpacity
      {...rest}
      style={[
        {
          backgroundColor
        },
        style,
      ]}>
      {children}
    </DefaultTouchableOpacity>
  )
}

export const Text = ({
  children,
  isPrimary,
  isSecondary,
  isWhite,
  isBlack,
  isBold,
  isHeadingTitle,
  isCenter,
  hasMargin,
  style,
  ...rest
}) => {
  const {setMode, mode, theme} = React.useContext(ThemeContext)
  const {primary, secondary, text} = theme.colors
  let color = text
  let fontSize = 14
  let marginTop = 0
  let textAlign

  if (isSecondary) {
    color = secondary
  }

  if (isHeadingTitle) {
    fontSize = 20
  }

  if (isPrimary) {
    color = primary
  }

  if (isWhite) {
    color = 'white'
  }

  if (isBlack) {
    color = 'black'
  }

  if (isCenter) {
    textAlign = 'center'
  }

  if (hasMargin) {
    marginTop = 10
  }

  const fontWeight = isBold ? 'bold' : 'normal'
  return (
    <DefaultText
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
    </DefaultText>
  )
}