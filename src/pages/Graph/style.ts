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

  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  
});

export default styles;
