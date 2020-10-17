import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  contentContainer: {
    paddingVertical: 25
  },

  main: {
    flex: 1,
  },

  title: {
    fontSize: 26,
    fontFamily: 'Ubuntu_500Medium',
    maxWidth: 400,
    textAlign: "center"
  },

  subtitleTitle: {
    fontSize: 24,
    fontFamily: 'Ubuntu_500Medium',
    maxWidth: 400,
    margin: 5
  },

  subtitle: {
    marginLeft: 5,
    fontFamily: 'Ubuntu_400Regular',
    fontSize: 20
  },

  box: {
    marginTop: 12,
    padding: 10,
    borderRadius: 10,

    flexDirection: 'row',

    height: '44.5%'
  },

  resultsBox: {
    marginTop: 25,
    borderRadius: 10,
    height: 100,
  },
});

export default styles;
