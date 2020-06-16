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
    fontSize: 26,
    fontFamily: 'Ubuntu_500Medium',
    maxWidth: 400,
    marginTop: 12
  },

  subtitle: {
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 18,
  },

  box: {
    backgroundColor: '#F3F3F3',
    marginTop: 12,
    padding: 10,
    borderRadius: 10,

    flexDirection: 'row'
  },

  boxClear: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row'
  },

  bigBox: {
    height: 350
  },

  reset: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1
  },

  dataInput: {
    textAlign: 'center',
    height: 40,
    maxWidth: 125,
    borderRadius: 10,
    borderWidth: .5,
    borderColor: '#F3F3F3',
    fontSize: 18
  },

  dataInputFormat: {
    flexDirection: 'row'
  },

  dataInputText:{
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 28,
  },

  savePoint: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1
  },

  scroll: {
    width: 325,
  },

  points: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10
  },

  point: {
    flexDirection: 'row',
    width: 300,
    fontSize: 18
  },

  pointOptions: {
    alignItems: 'flex-end',
  },

  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  buttonCalculate: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 16,
    marginLeft: -30
  },

  darkMode: {
    //you know the name: gambiarra
  }
});

export default styles;
