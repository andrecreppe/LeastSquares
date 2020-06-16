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
    fontSize: 30,
    fontFamily: 'Ubuntu_500Medium',
    maxWidth: 400,
  },

  subtitle: {
    marginLeft: 5,
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 24,
    color: '#FFF'
  },

  box: {
    backgroundColor: '#F3F3F3',
    marginTop: 64,
    padding: 10,
    borderRadius: 10,

    height: 128
  },

  miniBox: {
    flexDirection: 'row'
  },

  flag: {
    width: 50,
    height: 50,
    marginTop: 5
  },
  
  upDown: {
    marginTop: 10
  },

  languageColor: {
    backgroundColor: '#FFDD00'
  },

  precisionColor: {
    backgroundColor: '#ffd500'
  },

  styleColor: {
    backgroundColor: '#ffbb00'
  }
});

export default styles;
