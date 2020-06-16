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
    color: '#FFF',
    fontSize: 26,
    fontFamily: 'Ubuntu_500Medium',
    maxWidth: 400,
    marginTop: 12,
    textAlign: "center"
  },

  subtitleTitle: {
    color: '#FFF',
    fontSize: 24,
    fontFamily: 'Ubuntu_500Medium',
    maxWidth: 400,
    margin: 5
  },

  subtitle: {
    marginLeft: 5,
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 20,
    color: '#FFF'
  },

  box: {
    backgroundColor: '#F3F3F3',
    marginTop: 12,
    padding: 10,
    borderRadius: 10,

    flexDirection: 'row',

    height: 350
  },

  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  resultsBox: {
    marginBottom: 30,
    borderRadius: 10,
    height: 100,
  },

  colorCoeficient: {
    backgroundColor: '#3494CB',
  },

  colorUncertanty: {
    backgroundColor: '#CB7334',
  }
});

export default styles;
