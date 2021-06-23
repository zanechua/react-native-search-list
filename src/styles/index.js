import { StyleSheet } from 'react-native';
import Theme from '../components/Theme';

export default StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 50
  },
  emptyText: {
    color: '#979797',
    fontSize: 18,
    paddingTop: 20
  },
  sectionHeader: {
    flex: 1,
    height: Theme.size.sectionHeaderHeight,
    justifyContent: 'center',
    paddingLeft: 25,
    backgroundColor: '#fafafa'
  },
  sectionTitle: {
    color: '#979797',
    fontSize: 14
  }
});
