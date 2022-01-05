import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, SafeAreaView, Image, StatusBar, ScrollView, Platform, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import {Text, View, TouchableOpacity} from '../elements/index'
import { Button, Paragraph, Dialog, Portal, Provider, RadioButton  } from 'react-native-paper';
import ThemeContext from '../context/ThemeContext';
import AuthContext from '../context/auth-context';
import next from '../../assets/next.png'

export default class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      checked: 'light'
    }
  }

  static contextType = ThemeContext;

  componentDidMount() {
    console.log(this.context)
  }

  ChangeTheme = (value) => {
    this.context.setMode(value)
    this.setState({checked: value})
  }

  render() {

    return (
      <SafeAreaView style={{flex: 1}}>
        <Provider>
        <View style={styles.profileContainer} isCard>
          <View style={styles.profileLeft}>
            <View style={styles.profilePicture}></View>
            <View style={styles.profileMain}>
              <Text style={{marginBottom: 3}} isBold>Jack Ladose</Text>
              <Text style={{color: this.context.theme.colors.third}}>Modifier mes information</Text>
            </View>
          </View>
          <Image style={styles.profileArrow} source={next} />
        </View>
        <TouchableOpacity style={styles.settingRows} onPress={() => this.setState({visible: true})}>
          <Text isBold>Modifier l'apparence</Text>
          <Image style={styles.profileArrow} source={next} />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.settingRows} onPress={() => console.log(this.context.theme.colors)}>
          <Text isBold>Theme</Text>
          <Image style={styles.profileArrow} source={next} />
        </TouchableOpacity> */}
        <AuthContext.Consumer>
        {
          context => {
            return (
              (
                <TouchableOpacity style={styles.settingRows} onPress={() => context.signOut()}>
                  <Text isBold>Se Déconnecter</Text>
                  <Image style={styles.profileArrow} source={next} />
                </TouchableOpacity>
              )
            )
          }
        }
        </AuthContext.Consumer>
        <Portal>
          <Dialog visible={this.state.visible} onDismiss={() => this.setState({visible: false})} style={{backgroundColor: this.context.theme.colors.card}}>
            <Dialog.Title style={{color: this.context.theme.colors.text}}>Modifier l'apparence</Dialog.Title>
            <Dialog.Content style={{padding: 0}}>
              <RadioButton.Group onValueChange={value => this.ChangeTheme(value)} value={this.state.checked}>
                <RadioButton.Item label="Clair" value="light" labelStyle={{color: this.context.theme.colors.text}} color='#4c34e0' />
                <RadioButton.Item label="Sombre" value="dark" labelStyle={{color: this.context.theme.colors.text}} color='#4c34e0' />
              </RadioButton.Group>
            </Dialog.Content>
            <Dialog.Actions>
              <Button color='#4c34e0' onPress={() => this.setState({visible: false})}>Terminé</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        </Provider>
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
  },
  profileContainer: {
    width: Dimensions.get('screen').width,
    height: 100,
    paddingHorizontal: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  profileLeft: {
    flexDirection: 'row',
    alignItems:'center'
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#bababa'
  },
  profileMain: {
    marginLeft: 15
  },
  profileArrow: {
    width: 10,
    height: 10
  },
  settingRows: {
    width: Dimensions.get('screen').width,
    padding: 10,
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});