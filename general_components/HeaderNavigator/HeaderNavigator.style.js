import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  backAndArrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    fontSize: 10,
    color: '#FFFFFF',
    fontFamily: 'Inter_400Regular',
    position: 'absolute',
    left: 16,
  },
  leftText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontFamily: 'Inter_400Regular',
  },
  backImage: {
    width: 72,
    height: 35,
    resizeMode: 'contain',
  },
  chargerImage: {
    width: 100,
    height: 20,
    resizeMode: 'contain',
  },
  titleWhite: {
    width: 50,
    height: 30,
    resizeMode: 'contain',
  },
  nameText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontFamily: 'Inter_700Bold',
  },
});
