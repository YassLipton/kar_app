import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { LinearGradient } from 'expo-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import AuthContext from '../context/auth-context'
import idPlace from '../../idPlace'

const SignInScreen = ({ navigation }) => {
  const { userToken, signIn } = React.useContext(AuthContext)

  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  })

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true
      })
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false
      })
    }
  }

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        password: val,
        isValidPassword: true
      })
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false
      })
    }
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    })
  }

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true
      })
    } else {
      setData({
        ...data,
        isValidUser: false
      })
    }
  }

  const loginHandle = async (username, password) => {
    if (username.length == 0 || password.length == 0) {
      Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
        { text: 'Okay' }
      ])
      return
    } else {
      let fet = await fetch('http://192.168.1.26:3500/login', {
        method: "POST",
        body: JSON.stringify({
          username,
          password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      let rep = await fet.json()
      console.log(rep)
      if (rep.successfullyLogged) {
        signIn(rep.user._id.toString())
      } else {
        Alert.alert('Identifiants incorrects', 'Veuillez réessayer.', [
          { text: 'Okay' }
        ])
      }
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#4c34e0' barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Bienvenue !</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[styles.footer]}
      >
        <Text style={[styles.text_footer]}>Adresse Email</Text>
        <View style={styles.action}>
          <FontAwesome
            name="user-o"
            size={20}
          />
          <TextInput
            placeholder="Votre adresse email"
            placeholderTextColor="#666666"
            style={[styles.textInput]}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ?
            <Animatable.View
              animation="bounceIn"
            >
              <Feather
                name="check-circle"
                color="green"
                size={20}
              />
            </Animatable.View>
            : null}
        </View>
        {data.isValidUser ? null :
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Votre identifiant doit contenir plus 4 caractères.</Text>
          </Animatable.View>
        }


        <Text style={[styles.text_footer, {
          marginTop: 35
        }]}>Mot de passe</Text>
        <View style={styles.action}>
          <Feather
            name="lock"
            size={20}
          />
          <TextInput
            placeholder="Votre mot de passe"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[styles.textInput]}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity
            onPress={updateSecureTextEntry}
          >
            {data.secureTextEntry ?
              <Feather
                name="eye-off"
                color="grey"
                size={20}
              />
              :
              <Feather
                name="eye"
                color="grey"
                size={20}
              />
            }
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null :
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Votre mot de passe doit contenir plus 6 caractères.</Text>
          </Animatable.View>
        }


        <TouchableOpacity>
          <Text style={{ color: '#4c34e0', marginTop: 15 }}>Mot de passe oublié ?</Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => { loginHandle(data.username, data.password) }}
          >
            <LinearGradient
              colors={['#4c34e0', '#5a4119']}
              style={styles.signIn}
            >
              <Text style={[styles.textSign, {
                color: '#fff'
              }]}>Se Connecter</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // navigation.navigate('SignUpScreen')
              signIn('2')
            }}
            style={[styles.signIn, {
              borderColor: '#4c34e0',
              borderWidth: 1,
              marginTop: 15
            }]}
          >
            <Text style={[styles.textSign, {
              color: '#4c34e0'
            }]}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4c34e0'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  }
})
