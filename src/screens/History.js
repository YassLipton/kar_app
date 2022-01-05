import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, SafeAreaView, Image, Button, StatusBar, ScrollView, Platform, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import {Text, View, TouchableOpacity} from '../elements/index'
import moment from 'moment';
import frLocale from 'moment/locale/fr'
import idPlace from '../../idPlace'
import AuthContext from '../context/auth-context'
import ThemeContext from '../context/ThemeContext'
import * as Font from 'expo-font'

export default class History extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      correctQuizList: [],
      historyLoaded: false
    }
  }

  static contextType = AuthContext;

  componentDidMount() {
    this.List_Corrected_Quiz()
    this.props.navigation.addListener('focus', () => this.List_Corrected_Quiz())
    this.loadFonts()
  }

  List_Corrected_Quiz = async () => {
    let fet = await fetch('http://192.168.1.26:3500/corrected-quiz-list', {
      method: "POST",
      body: JSON.stringify({
        idUser: this.props.userToken
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    let rep = await fet.json()
    this.setState({correctQuizList: rep, historyLoaded: true})
  }

  loadFonts = async () => {
    await Font.loadAsync({
      NotoSans: require('../../assets/fonts/NotoSans-Regular.ttf'),
      NotoSansBold: require('../../assets/fonts/NotoSans-Bold.ttf')
    });
    this.setState({ fontsLoaded: true });
  }

  render() {
    const buttons = ['Réservations', 'Commandes']
    const { selectedIndex } = this.state

    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView nestedScrollEnabled={true} style={{flex: 1}} contentContainerStyle={{flexGrow: 1, padding: 15}}>
        {
          this.state.correctQuizList.map((quiz, quizIndex) => {
            return (
              <TouchableOpacity style={styles.box} isCard onPress={() => this.props.navigation.navigate('QuizResult', {correctedQuiz: quiz})} key={`box${quizIndex}`}>
                <View style={[styles.boxIcon, {backgroundColor: '#f2f2f2', borderRadius: 32.5}]}></View>
                <View style={styles.boxInfos}>
                  <Text style={styles.boxInfosTitle}>{quiz.wrong.length} fautes sur {quiz.wrong.length + quiz.correct.length}</Text>
                  <Text style={styles.boxInfosText}>Série d'entraînement</Text>
                </View>
                <View style={styles.boxArrow}>
                  <Text>{'>'}</Text>
                </View>
              </TouchableOpacity>
            )
          })
        }
        </ScrollView>
      </SafeAreaView>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    width: Dimensions.get('screen').width,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 15
  },
  box: {
    width: '100%',
    height: 90,
    marginBottom: 15,
    padding: 12.5,
    borderRadius: 15,
    flexDirection: 'row'
  },
  boxIcon: {
    width: 65,
    height: 65,
    borderRadius: 15,
    backgroundColor: '#f4d3ce'
  },
  boxInfos: {
    width: Dimensions.get('window').width - 55 - 80 - 20,
    marginHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  boxInfosTitle: {
    fontFamily: 'NotoSansBold',
    fontSize: 16
  },
  boxInfosText: {
    color: '#737373',
    fontWeight: '400',
    fontSize: 16
  },
  boxArrow: {
    width: 10,
    height: 65,
    justifyContent: 'center'
  },
  lastQuizContainer: {
    marginTop: 20
  },
  lastQuizContainerTitle: {
    fontFamily: 'NotoSansBold',
    fontSize: 18,
    marginBottom: 15,
  }
});