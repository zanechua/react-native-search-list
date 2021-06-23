import { Dimensions } from 'react-native';

export default {
  color: {
    primary: '#171a23',
    textPrimary: '#171a23',

    primaryDark: '#171a23',
    primaryLight: '#171a23',

    white: '#ffffff',
    black: '#000000',
    secondaryBlack: '#171a23',

    // secondary: '',
    maskColor: 'rgba(0, 0, 0, 0.1)'
  },
  size: {
    sectionHeaderHeight: 24,
    rowHeight: 40,

    toolbarHeight: 44,
    headerHeight: 44,
    searchInputHeight: 44,

    windowWidth: Dimensions.get('window').width,
    windowHeight: Dimensions.get('window').height,

    searchIconWidth: 30,
    cancelButtonWidth: 70, // width for the cancel button area, should be a fix value at this moment
    searchBarHorizontalPadding: 8 // padding between the search input and the search bar
  },
  duration: {
    toggleSearchBar: 300
  }
};
