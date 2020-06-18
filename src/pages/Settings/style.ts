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
    fontSize: 30,
    fontFamily: 'Ubuntu_500Medium',
    maxWidth: 400,
  },

  subtitle: {
    marginLeft: 5,
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 24
  },

  box: {
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
  }
});

export default styles;
