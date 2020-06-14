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
    marginTop: 12,
    textAlign: "center"
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
});

export default styles;
