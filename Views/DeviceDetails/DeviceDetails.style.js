import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  table_container: {
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  wrapper: {
    backgroundColor: '#F2F6F7',
    flex: 1,
    paddingLeft: '10%',
    paddingRight: '10%',
    justifyContent: 'space-between',
  },
  title: {
    color: '#393B3B',
    fontSize: 25,
    fontFamily: 'Inter_700Bold',
  },
  tittleButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tableWrapper: {
    flexDirection: 'row',
    marginTop: 15,
  },
  chargingTitle: {
    fontSize: 25,
    color: '#393B3B',
    fontFamily: 'Inter_500Medium',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
  },
});
