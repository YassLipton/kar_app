import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, SafeAreaView, Image, Button, StatusBar, ScrollView, Platform, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import {Text, View, TouchableOpacity} from '../elements/index'
import ThemeContext from '../context/ThemeContext';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import * as Font from 'expo-font';
import Loading from './Loading'
import AuthContext from '../context/auth-context';

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedContent: 'code',
      correctQuizList: [],
      historyLoaded: false
    }
  }

  static contextType = AuthContext;

  componentDidMount() {
    this.List_Corrected_Quiz()
    this.props.navigation.addListener('focus', () => this.List_Corrected_Quiz())
    this.loadFonts()
    console.log(this.props)
  }

  List_Corrected_Quiz = async () => {
    let fet = await fetch('http://192.168.1.26:3500/home-corrected-quiz-list', {
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
    if (this.state.fontsLoaded && this.state.historyLoaded) {
      return (
        <SafeAreaView style={styles.container}>
          <ScrollView>
          <Text style={styles.headerTitle}>Code de la route</Text>
          <View style={styles.headerChoose}>
            <TouchableOpacity onPress={() => this.setState({selectedContent: 'code'})} style={[styles.headerChooseBox, this.state.selectedContent == 'code' ? {borderBottomWidth: 2, borderBottomColor: '#4c34e0'} : undefined]}>
              <Text style={styles.headerChooseBoxText} isPrimary={this.state.selectedContent == 'code'}>Séries de code</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({selectedContent: 'leçons'})} style={[styles.headerChooseBox, this.state.selectedContent == 'leçons' ? {borderBottomWidth: 2, borderBottomColor: '#4c34e0'} : undefined]}>
              <Text style={styles.headerChooseBoxText} isPrimary={this.state.selectedContent == 'leçons'}>Leçons et lives</Text>
            </TouchableOpacity>
          </View>
        {
          this.state.selectedContent == 'code'
          ?
          <View style={styles.mainContainer}>
            <TouchableOpacity style={{...styles.box, backgroundColor: '#ffede6',}} onPress={() => this.props.navigation.navigate('Quiz')}>
              <View style={styles.boxIcon}></View>
              <View style={styles.boxInfos}>
                <Text style={styles.boxInfosTitle} isBlack>Entraînement</Text>
                <Text style={styles.boxInfosText}>40 questions avec correction</Text>
              </View>
              <View style={styles.boxArrow}>
                <Text isBlack>{'>'}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.lastQuizContainer}>
              <Text style={styles.lastQuizContainerTitle}>Dernières séries</Text>
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
            </View>
          </View>
          :
          <View style={{...styles.mainContainer, height: Dimensions.get('window').height / 2, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 28, color: '#cccccc'}}>Bientôt disponible</Text>
          </View>
        }
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
    marginVertical: 15,
    paddingTop: 15
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
  mainContainer: {
    width: Dimensions.get('window').width,
    padding: 15
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
})