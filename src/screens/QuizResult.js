import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, SafeAreaView, Image, Button, StatusBar, ScrollView, Platform, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import {Text, View, TouchableOpacity} from '../elements/index'
import Svg, { Path } from "react-native-svg"
import ThemedText from './../elements/ThemedText';
import ThemeContext from '../context/ThemeContext';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import * as Font from 'expo-font';
import Loading from './Loading'
import { color } from 'react-native-elements/dist/helpers';

export default class QuizResult extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allCorrectedQuestions: [],
      selectedQuestionsDisplay: 'wrong'
    }
  }

  static contextType = ThemeContext;

  componentDidMount() {
    this.All_Corrected_Questions()
    this.loadFonts()
    console.log(this.props)
  }

  All_Corrected_Questions = async () => {
    let fet = await fetch('http://192.168.1.26:3500/all-corrected-questions', {
      method: "POST",
      body: JSON.stringify({
        idCorrectedQuiz: this.props.route.params.correctedQuiz.idCorrectedQuiz
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    let rep = await fet.json()
    this.setState({allCorrectedQuestions: rep})
    console.log(rep.filter(q => q.isValidated == true))
  }

  loadFonts = async () => {
    await Font.loadAsync({
      NotoSans: require('../../assets/fonts/NotoSans-Regular.ttf'),
      NotoSansBold: require('../../assets/fonts/NotoSans-Bold.ttf')
    });
    this.setState({ fontsLoaded: true });
  }

  render() {
    const theme = this.context.theme
    if (this.state.fontsLoaded) {
      return (
        <SafeAreaView style={styles.container}>
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
            <Text style={styles.headerText}>Résultats de la série</Text>
            <View style={styles.headerIcon}></View>
          </View>
          <ScrollView>
            <View style={styles.headerLinksContainer}>
              <Text style={styles.headerFaults}>{this.props.route.params.correctedQuiz.wrong.length} fautes sur {this.props.route.params.correctedQuiz.wrong.length + this.props.route.params.correctedQuiz.correct.length}</Text>
              <Text style={styles.headerInstruction}>Entraînez-vous pour faire 5 fautes ou moins.</Text>
              <TouchableOpacity style={styles.headerLinkButton}>
                <Text style={styles.headerLinkButtonText}>Nouvelle série</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.headerLinkButton, {backgroundColor: '#ececee'}]}>
                <Text style={[styles.headerLinkButtonText, {color: '#000'}]}>Relancer</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.mainContainer}>
              <View style={styles.questionHeader}>
                <Text style={styles.questionHeaderTitle}>Questions</Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity style={styles.questionHeaderLink} onPress={() => this.setState({selectedQuestionsDisplay: 'wrong'})}>
                    <Text style={{...styles.questionHeaderLinkText, color: this.state.selectedQuestionsDisplay == 'wrong' ? theme.colors.primary : theme.colors.third || theme.colors.secondary}}>À revoir ({this.props.route.params.correctedQuiz.wrong.length})</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.questionHeaderLink} onPress={() => this.setState({selectedQuestionsDisplay: 'correct'})}>
                    <Text style={{...styles.questionHeaderLinkText, color: this.state.selectedQuestionsDisplay == 'correct' ? theme.colors.primary : theme.colors.third || theme.colors.secondary}}>Réussis ({this.props.route.params.correctedQuiz.correct.length})</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.questionContainer}>
              {
                this.props.route.params.correctedQuiz[this.state.selectedQuestionsDisplay].map((question, questionIndex) => {
                  return (
                    <TouchableOpacity style={styles.questionBox} isCard onPress={() => this.props.navigation.navigate('QuizCorrected', {allCorrectedQuestions: this.state.allCorrectedQuestions, idQuestion: question.idQuestion})} key={questionIndex}>
                      <Text style={styles.questionBoxInfosTitle}>Question {question.idQuestion + 1}</Text>
                      <View style={styles.questionBoxArrow}>
                        <Text>{'>'}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                })
              }
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )
    } else {
      return <Loading />
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  headerTitle: {
    fontFamily: 'NotoSansBold',
    fontSize: 24,
    marginHorizontal: 35,
    marginVertical: 15
  },
  headerLinksContainer: {
    width: Dimensions.get('window').width,
    flexDirection: 'column',
    alignItems: 'center'
  },
  headerFaults: {
    fontFamily: 'NotoSansBold',
    fontSize: 26,
    marginTop: 40,
    marginBottom: 25,
    textAlign: 'center',
    color: '#4c34e0'
  },
  headerInstruction: {
    marginBottom: 20,
    fontSize: 16
  },
  headerLinkButton: {
    width: Dimensions.get('window').width * 0.8,
    marginBottom: 15,
    backgroundColor: '#4c34e0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 25
  },
  headerLinkButtonText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#fff'
  },
  headerChoose: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
  },
  headerChooseBox: {
    width: Dimensions.get('window').width / 2,
    height: '100%',
    paddingTop: 10,
    paddingBottom: 22,
    alignItems: 'center',
  },
  headerChooseBoxText: {
    fontFamily: 'NotoSansBold',
    fontSize: 15
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
    borderRadius: 25,
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
  mainContainer: {
    width: Dimensions.get('window').width,
    padding: 15
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  questionHeaderTitle: {
    fontFamily: 'NotoSansBold',
    fontSize: 18,
    marginBottom: 15,
  },
  questionHeaderLink: {
    marginLeft: 15
  },
  questionHeaderLinkText: {
    fontSize: 15,
    fontWeight: '500'
  },
  questionBox: {
    width: '100%',
    height: 80,
    marginBottom: 15,
    padding: 12.5,
    paddingLeft: 15,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  questionBoxInfosTitle: {
    fontFamily: 'NotoSansBold',
    fontSize: 16
  },
  questionBoxInfosText: {
    color: '#737373',
    fontWeight: '400',
    fontSize: 16
  },
  questionBoxArrow: {
    width: 10,
    height: 65,
    justifyContent: 'center'
  },
})