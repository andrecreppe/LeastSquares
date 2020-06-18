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
    fontSize: 32,
    fontFamily: 'Ubuntu_500Medium',
    maxWidth: 400,
    marginTop: '10%',
    alignSelf: "center"
  },

  logo: {
    alignSelf: 'center',
    marginTop: '5%',
    marginLeft: -5,
    marginBottom: '12.5%',
  },

  description: {
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Ubuntu_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {
    flexDirection: 'row'
  },

  buttonGo: {
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginRight: 10 //just to match the bottom
  },

  buttomBottom: {
    flex: 1,
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
    marginRight: 5
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
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 16
  }
});

export default styles;
