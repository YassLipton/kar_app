import React, { Fragment, useEffect } from 'react';
import { Dimensions, StyleSheet, SafeAreaView, Image, ActivityIndicator, Button, StatusBar, ScrollView, Platform, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import {Text, View, TouchableOpacity} from '../elements/index'
import Svg, { Path } from "react-native-svg"
import ThemedText from './../elements/ThemedText';
import ThemeContext from '../context/ThemeContext';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import * as Font from 'expo-font';
import Loading from './Loading';
import img from '../../assets/base64img';
import AuthContext from '../context/auth-context';

const alphabet = ['A', 'B', 'C', 'D']

const answersStyling = (type, choice) => {
  if (choice.selected) {
    if (choice.isSelectedCorrect === undefined) {
      return answersStyles[type].selected
    } else {
      if (choice.isSelectedCorrect) {
        return answersStyles[type].selectedCorrect
      } else {
        return answersStyles[type].selectedNotCorrect
      }
    }
  } else if (choice.isNotSelectedCorrect !== undefined) {
    if (choice.isNotSelectedCorrect) {
      return answersStyles[type].notSelectedCorrect
    } else {
      return answersStyles[type].notSelectedNotCorrect
    }
  }
}

export default class Quiz extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedContent: 'code',
      allQuestions: [],
      currentQuestion: 0,
      isSubmitable: false
    }
  }

  static contextType = AuthContext;

  componentDidMount() {
    this.All_Questions()
    this.loadFonts()
  }

  All_Questions = async () => {
    let fet = await fetch('http://192.168.1.26:3500/all-questions', {
      method: "POST",
      body: JSON.stringify({
        idQuiz: 3
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    let rep = await fet.json()
    this.setState({allQuestions: rep})
  }

  Finish_Quiz = async () => {
    let allQuestions = this.state.allQuestions
    for (let i = 0; i < allQuestions.length; i++) {
      allQuestions[i]._idUser = this.context.userToken
      allQuestions[i].img = undefined
    }
    let fet = await fetch('http://192.168.1.26:3500/add-quiz-corrected', {
      method: "POST",
      body: JSON.stringify({
        quizCorrected: allQuestions
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    let rep = await fet.json()
    if (rep.success) {
      this.props.navigation.navigate('QuizResult', {correctedQuiz: rep.correctedQuiz})
    }
  } 

  Choose_Answer = (questionIndex, choiceIndex) => {
    let allQuestions = this.state.allQuestions
    const currentQuestion = []
    const currentQuestionIndexes = []
    allQuestions.map((question, questionIndex) => {
      if (question.idQuestion == this.state.currentQuestion) {
        currentQuestion.push(question)
        currentQuestionIndexes.push(questionIndex)
      }
    })
    allQuestions[currentQuestionIndexes[questionIndex]].choices[choiceIndex].selected = !allQuestions[currentQuestionIndexes[questionIndex]].choices[choiceIndex].selected
    let isSubmitable = false
    for (let i = 0; i < currentQuestion.length; i++) {
      for (let j = 0; j < currentQuestion[i].choices.length; j++) {
        if (currentQuestion[i].choices[j].selected) {
          isSubmitable = true
          break
        }
      }
    }
    this.setState({allQuestions, isSubmitable})
  }

  Question_Correction = () => {
    let areChoicesCorrect = true
    let allQuestions = this.state.allQuestions
    allQuestions.map((question, questionIndex) => {
      if (question.idQuestion == this.state.currentQuestion) {
        question.choices.map((choice, choiceIndex) => {
          if (choice.selected) {
            if (choice.correct) {
              allQuestions[questionIndex].choices[choiceIndex].isSelectedCorrect = true
            } else {
              allQuestions[questionIndex].choices[choiceIndex].isSelectedCorrect = false
              areChoicesCorrect = false
            }
          } else if (!choice.selected) {
            if (choice.correct) {
              allQuestions[questionIndex].choices[choiceIndex].isNotSelectedCorrect = true
              areChoicesCorrect = false
            } else {
              allQuestions[questionIndex].choices[choiceIndex].isNotSelectedCorrect = false
            }
          } else {
            areChoicesCorrect = false
          }
        })
        allQuestions[questionIndex].isValidated = areChoicesCorrect
      }
    })
    this.setState({allQuestions})
  }

  Next_Question = () => {
    const isLastQuestion = !this.state.allQuestions.filter((r) => r.idQuestion == this.state.currentQuestion + 1).length > 0
    if (!isLastQuestion) {
      this.setState({
        currentQuestion: this.state.currentQuestion + 1,
        isSubmitable: this.state.isSubmitable
      })
    } else {
      this.Finish_Quiz()
    }
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
        if (this.state.fontsLoaded && this.state.allQuestions.length > 0) {
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
                this.state.allQuestions.filter((r) => r.idQuestion == this.state.currentQuestion).map((question, questionIndex) => {
                  if (questionIndex == 0 && question.img) {
                    return <Image style={styles.mainImg} source={{uri: question.img}} key={`img${questionIndex}`} />
                  }
                })
                }
                  </View>
                  <View style={styles.questionContainer}>
                  {
                    this.state.allQuestions.filter((r) => r.idQuestion == this.state.currentQuestion).map((question, questionIndex) => (
                    <Fragment key={`QI${questionIndex}`}>
                      <Text style={styles.questionTitle}>{question.text}</Text>
                      <View style={styles.answersContainer}>
                      {
                        question.choices.map((choice, choiceIndex) => (
                          <TouchableOpacity 
                            style={[{...answersStyles.box.default, borderColor: theme.colors.card}, answersStyling('box', choice)]}
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
              {
                this.state.allQuestions.filter((r) => r.idQuestion == this.state.currentQuestion).map((question, questionIndex) => {
                  let isCorrect = true
                  this.state.allQuestions.map(question => {
                    if (isCorrect && (question.idQuestion == this.state.currentQuestion)) {
                      isCorrect = question.isValidated
                    }
                  })
                  if (questionIndex == 0) {
                    return (
                      question.isValidated !== undefined
                      ?
                      <View style={styles.afterSubmitContainer} isSecondary key={`submit${questionIndex}`}>
                        <View style={styles.afterSubmitTitleContainer}>
                          <Text style={styles.afterSubmitTitle}>{isCorrect ? 'Bonne réponse' : 'Mauvaise réponse'}</Text>
                        </View>
                        <View style={styles.afterSubmitButtonsContainer}>
                          <TouchableOpacity 
                            style={styles.afterSubmitButton}
                            disabled={true}
                            isCard
                          >
                            <Text style={styles.afterSubmitButtonText}>Correction</Text>
                          </TouchableOpacity>
                          <TouchableOpacity 
                            style={styles.afterSubmitButton}
                            disabled={!this.state.isSubmitable}
                            isPrimary={this.state.isSubmitable}
                            onPress={() => this.Next_Question()}
                          >
                            <Text style={styles.afterSubmitButtonText}>Continuer</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      :
                      <View style={{...styles.beforeSubmitContainer, backgroundColor: theme.dark ? theme.colors.secondary : '#fff'}} key={`submit${questionIndex}`}>
                        <TouchableOpacity 
                          style={styles.beforeSubmitButton}
                          disabled={!this.state.isSubmitable}
                          isPrimary={this.state.isSubmitable}
                          onPress={() => this.Question_Correction()}
                        >
                          <Text style={{...styles.beforeSubmitButtonText, color: !this.state.isSubmitable ? theme.dark ? 'grey' : '#ececee' : '#fff'}}>Valider mes réponses</Text>
                        </TouchableOpacity>
                      </View>
                    )
                  }
                })
              }
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
    fontFamily: 'NotoSansBold',
    // fontSize: 16
  },
  afterSubmitContainer: {
    width: Dimensions.get('window').width,
    height: 110,
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