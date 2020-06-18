import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
  },

  box: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10
  },

  title: {
    fontSize: 26,
    fontFamily: 'Ubuntu_500Medium',
    maxWidth: 400
  },

  subtitle: {
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 18,
    marginTop: 15
  },

  contactText: {
    fontStyle: 'italic',
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
