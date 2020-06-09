import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_500Medium',
    maxWidth: 400,
    marginTop: 64,
    alignSelf: "center"
  },

  footer: {
    flexDirection: 'row',
    alignSelf: 'center'
  },

  version: {
    color: '#FFF',
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 20,
    textAlign: 'center',

    backgroundColor: '#34CBCB',
    height: 60,
    width: 200,
    borderRadius: 10,
    marginTop: 8,
    marginRight: 15,

    justifyContent: 'center',
    alignContent: 'center',
  }
});

export default styles;
