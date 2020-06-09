import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
  },

  return: {
    marginTop: 20
  },

  box: {
    backgroundColor: '#C3C3C3',
    marginTop: 24,
    padding: 10,
    //marginLeft: 3,
    borderRadius: 10
  },

  title: {
    color: '#322153',
    fontSize: 26,
    fontFamily: 'Ubuntu_500Medium',
    maxWidth: 400
  },

  subtitle: {
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 18,
    marginTop: 15
  },

  lightBlue: {
    backgroundColor: '#B1F1F5'
  },

  blue: {
    backgroundColor: '#7EE6ED'
  },

  darkBlue: {
    backgroundColor: '#50CAD1'
  },

  contactText: {
    fontStyle: 'italic',
    color: '#001AFF'
  },

  footer: {
    flexDirection: 'row',
    alignSelf: 'center'
  },

  version: {
    //color: '#FFF',
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 20,
    textAlign: 'center',

    backgroundColor: '#34CB82',
    height: 30,
    width: 200,
    borderRadius: 10,
    marginTop: 8,
    marginRight: 15,

    justifyContent: 'center',
    alignContent: 'center'
  }
});

export default styles;
