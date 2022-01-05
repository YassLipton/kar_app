import React, { Fragment, useEffect } from 'react';
import { Dimensions, StyleSheet, SafeAreaView, Image, ActivityIndicator, Button, StatusBar, ScrollView, Platform, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import {Text, View, TouchableOpacity} from '../elements/index'
import Svg, { Path } from "react-native-svg"
import ThemeContext from '../context/ThemeContext';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import * as Font from 'expo-font';
import Loading from './Loading';
import img from '../../assets/base64img';

const alphabet = ['A', 'B', 'C', 'D']

const answersStyling = (type, choice) => {
  if (choice.selected) {
    if (choice.correct) {
      return answersStyles[type].selectedCorrect
    } else {
      return answersStyles[type].selectedNotCorrect
    }
  } else {
    if (choice.correct) {
      return answersStyles[type].notSelectedCorrect
    } else {
      return answersStyles[type].notSelectedNotCorrect
    }
  }
}

export default class QuizCorrected extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedContent: 'code',
      allCorrectedQuestions: this.props.route.params.allCorrectedQuestions,
      currentQuestion: this.props.route.params.idQuestion,
      isSubmitable: false
    }
  }

  static contextType = ThemeContext;

  componentDidMount() {
    this.loadFonts()
  }

  Previous_Question = () => {
    this.setState({
      currentQuestion: this.state.currentQuestion - 1
    })
  }

  Next_Question = () => {
    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    })
  }

  Bottom_Buttons = ({theme}) => {
    const isFirstQuestion = !this.state.allCorrectedQuestions.filter((r) => r.idQuestion == this.state.currentQuestion - 1).length > 0
    const isLastQuestion = !this.state.allCorrectedQuestions.filter((r) => r.idQuestion == this.state.currentQuestion + 1).length > 0
    return (
      <View style={{...styles.beforeSubmitContainer, backgroundColor: theme.dark ? theme.colors.secondary : '#fff'}}>
        <View style={styles.afterSubmitButtonsContainer}>
          <TouchableOpacity 
            style={[styles.afterSubmitButton, {backgroundColor: !isFirstQuestion ? '#4c34e0' : '#f2f2f2'}]}
            disabled={isFirstQuestion}
            onPress={() => this.Previous_Question()}
          >
            <Text style={styles.afterSubmitButtonText}>Précédent</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.afterSubmitButton, {backgroundColor: !isLastQuestion ? '#4c34e0' : '#f2f2f2'}]}
            disabled={isLastQuestion}
            onPress={() => this.Next_Question()}
          >
            <Text style={styles.afterSubmitButtonText}>Suivant</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  loadFonts = async () => {
    await Font.loadAsync({
      NotoSans: require('../../assets/fonts/NotoSans-Regular.ttf'),
      NotoSansBold: require('../../assets/fonts/NotoSans-Bold.ttf')
    });
    this.setState({ fontsLoaded: true });
  }

  render() {
    return (
      <ThemeContext.Consumer>
      {themeContext => {
        const theme = themeContext.theme
        if (this.state.fontsLoaded && this.state.allCorrectedQuestions.length > 0) {
          return (
        <BottomTabBarHeightContext.Consumer>{tabBarHeight => (
          <SafeAreaView style={[styles.container, {height: Dimensions.get('window').height - tabBarHeight}]}>
          <View style={[styles.header, {backgroundColor: theme.dark ? '#121212' : '#fff', borderBottomColor: theme.colors.card}]}>
              <TouchableOpacity style={styles.headerIcon} onPress={() => this.props.navigation.goBack()}>
                <Svg
                  viewBox="0 0 443.52 443.52"
                  style={styles.headerIconSVG}
                  fill={theme.colors.text}
                >
                  <Path d="M143.492 221.863 336.226 29.129c6.663-6.664 6.663-17.468 0-24.132-6.665-6.662-17.468-6.662-24.132 0l-204.8 204.8c-6.662 6.664-6.662 17.468 0 24.132l204.8 204.8c6.78 6.548 17.584 6.36 24.132-.42 6.387-6.614 6.387-17.099 0-23.712L143.492 221.863z" />
                </Svg>
              </TouchableOpacity>
              <Text style={styles.headerText}>Question {this.state.currentQuestion + 1}/40</Text>
              <View style={styles.headerIcon}></View>
            </View>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <View style={styles.imgContainer}>
          {
            this.state.allCorrectedQuestions.filter((r) => r.idQuestion == this.state.currentQuestion).map((question, questionIndex) => {
              if (questionIndex == 0 && question.img) {
                return <Image style={styles.mainImg} source={{uri: question.img}} key={`img${questionIndex}`} />
              }
            })
            }
              </View>
              <View style={styles.questionContainer}>
              {
                this.state.allCorrectedQuestions.filter((r) => r.idQuestion == this.state.currentQuestion).map((question, questionIndex) => (
                <Fragment key={`QI${questionIndex}`}>
                  <Text style={styles.questionTitle}>{question.text}</Text>
                  <View style={styles.answersContainer}>
                  {
                    question.choices.map((choice, choiceIndex) => (
                      <TouchableOpacity 
                        style={[{...answersStyles.box.default, borderColor: theme.dark ? theme.colors.secondary : '#ececee'}, answersStyling('box', choice)]}
                        onPress={() => this.Choose_Answer(questionIndex, choiceIndex)} 
                        disabled={question.isValidated !== undefined}
                        key={choiceIndex}
                      >
                        <Text style={[answersStyles.boxLetter.default, answersStyling('boxLetter', choice)]}>{alphabet[choice.key]}</Text>
                        <Text style={[answersStyles.boxText.default, answersStyling('boxText', choice)]} numberOfLines={2}>{choice.text}</Text>
                      </TouchableOpacity>
                    ))
                  }
                  </View>
                </Fragment>
                ))
              }
              {/* <Text style={styles.questionTitle}>{question.text}</Text>
              <View style={styles.answersContainer}>
                <TouchableOpacity style={[styles.answersBox, styles.answersBoxSelected]}>
                  <Text style={[styles.answersBoxLetter, styles.answersBoxLetterSelected]}>A</Text>
                  <Text style={[styles.answersBoxText, styles.answersBoxTextSelected]}>Je peux passer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.answersBox}>
                  <Text style={styles.answersBoxLetter}>B</Text>
                  <Text style={styles.answersBoxText}>Je peux passer</Text>
                </TouchableOpacity>
              </View> */}
              </View>
            </ScrollView>
            {<this.Bottom_Buttons theme={theme} />}
          </SafeAreaView>
        )}</BottomTabBarHeightContext.Consumer>
      )
    } else {
      return (
        <View style={styles.fullPage}>
          <ActivityIndicator size="large" color='#4c34e0' />
        </View>
      )
    }}}
    </ThemeContext.Consumer>
  )}
}
        
const styles = StyleSheet.create({
  container: {},
  fullPage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    width: Dimensions.get('window').width,
    height: 60,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerIcon: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: '#00000005',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerIconSVG: {
    width: 18,
    height: 18
  },
  headerText: {
    fontFamily: 'NotoSansBold',
    fontSize: 16
  },
  imgContainer: {
    width: Dimensions.get('window').width,
    height: 180,
    backgroundColor: '#ececee'
  },
  mainImg: {
    width: '100%',
    height: '100%'
  },
  questionContainer: {
    width: Dimensions.get('window').width,
    padding: 25
  },
  questionTitle: {
    fontFamily: 'NotoSansBold',
    fontSize: 16
  },
  answersContainer: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'column',
  },
  beforeSubmitContainer: {
    width: Dimensions.get('window').width,
    height: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  beforeSubmitButton: {
    width: Dimensions.get('window').width * 0.8,
    height: 40,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  beforeSubmitButtonText: {
    color: '#fff',
    fontFamily: 'NotoSansBold',
    // fontSize: 16
  },
  afterSubmitContainer: {
    width: Dimensions.get('window').width,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  afterSubmitTitleContainer: {
    width: Dimensions.get('window').width,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  afterSubmitTitle: {
    fontFamily: 'NotoSansBold',
    fontSize: 18
  },
  afterSubmitButtonsContainer: {
    width: Dimensions.get('window').width * 0.8,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  afterSubmitButton: {
    width: Dimensions.get('window').width * 0.4 - 10,
    height: 40,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  afterSubmitButtonText: {
    color: '#fff',
    fontFamily: 'NotoSansBold',
    // fontSize: 16
  }
})

const answersStyles = {
  box: StyleSheet.create({
    default: {
      width: '100%',
      borderWidth: 3,
      borderColor: '#ececee',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 13
    },
    selected: {
      borderColor: '#4c34e0',
      borderRadius: 15,
      position: 'relative',
      right: 10,
      width: Dimensions.get('window').width - 30
    },
    selectedCorrect: {
      backgroundColor: '#38836d',
      borderColor: '#38836d',
      borderRadius: 15,
      position: 'relative',
      right: 10,
      width: Dimensions.get('window').width - 30
    },
    selectedNotCorrect: {
      backgroundColor: '#d8d8d8'
    },
    notSelectedCorrect: {
      borderColor: '#38836d',
    },
  }),
  boxLetter: StyleSheet.create({
    default: {
      fontFamily: 'NotoSansBold',
      fontSize: 25,
      marginRight: 20
    },
    selected: {
      color: '#4c34e0'
    },
    selectedCorrect: {
      color: '#fff'
    },
    selectedNotCorrect: {},
    notSelectedCorrect: {
      color: '#38836d',
    },
    notSelectedNotCorrect: {},
  }),
  boxText: StyleSheet.create({
    default: {
      fontFamily: 'NotoSans',
      fontSize: 16,
      flex: 1,
      flexWrap: 'wrap'
    },
    selected: {
      color: '#4c34e0'
    },
    selectedCorrect: {
      color: '#fff'
    },
    selectedNotCorrect: {
      textDecorationLine: 'line-through'
    },
    notSelectedCorrect: {
      color: '#38836d',
    },
    notSelectedNotCorrect: {
      textDecorationLine: 'line-through'
    },
  })
}