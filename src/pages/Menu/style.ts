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
    marginTop: 36,
    alignSelf: "center"
  },

  logo: {
    alignSelf: 'center',
    marginTop: 72,
    marginBottom: 128,
  },

  description: {
    color: '#6C6C80',
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
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttomBottom: {
    height: 60,
    width: 170,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
    marginRight: 15
  },

  buttonAbout: {
    backgroundColor: '#34CBCB',
  },

  buttonConfigs: {
    backgroundColor: '#e6c210',
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
    marginLeft: -10
  }
});

export default styles;
