import {
  View,
  Text,
  StyleSheet,
  PixelRatio,
  Animated,
  Image,
  Platform,
  SectionList,
  TouchableOpacity, Alert
} from 'react-native';

import React, { Component } from 'react';

import pinyin from 'js-pinyin';
import PropTypes from 'prop-types';
import { sTrim } from './utils';

import SearchService from './SearchService';

import { 
  SearchBar,
  Toolbar,
  SectionIndex,
  Theme,
  HighlightableText,
  Empty,
  EmptyResult,
  SectionHeader,
  SectionIndexItem,
} from './components';

export default class SearchList extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    searchCursor: PropTypes.string,
    itemOnPress: PropTypes.func,
    // use `renderRow` to get much more freedom
    rowHeight: PropTypes.number.isRequired,

    hideSectionList: PropTypes.bool,

    sectionHeaderHeight: PropTypes.number,

    colors: PropTypes.object,

    searchListBackgroundColor: PropTypes.string,

    toolbarBackgroundColor: PropTypes.string,

    searchBarToggleDuration: PropTypes.number,
    searchBarBackgroundColor: PropTypes.string,

    searchIconColor: PropTypes.string,
    searchInputBackgroundColor: PropTypes.string,
    searchInputBackgroundColorActive: PropTypes.string,
    // default state text color for the search input
    searchInputTextColor: PropTypes.string,
    // active state text color for the search input
    searchInputTextColorActive: PropTypes.string,
    searchInputPlaceholderColor: PropTypes.string,
    searchInputPlaceholder: PropTypes.string,
    searchInputDefaultValue: PropTypes.string,

    searchInputStyle: PropTypes.object,
    listContainerStyle: PropTypes.object,

    title: PropTypes.string,
    titleTextColor: PropTypes.string,

    cancelTitle: PropTypes.string,
    cancelTextColor: PropTypes.string,

    // use `renderSectionIndexItem` to get much more freedom
    renderSectionIndexItem: PropTypes.func,
    sectionIndexContainerStyle: PropTypes.object,

    sortFunc: PropTypes.func,
    resultSortFunc: PropTypes.func,

    onScrollToSection: PropTypes.func,

    toolbarHeight: PropTypes.number,
    renderToolbar: PropTypes.func,
    renderCancel: PropTypes.func,
    renderCancelWhileSearching: PropTypes.func,
    cancelContainerStyle: PropTypes.object,
    staticCancelButton: PropTypes.bool,
    showSearchIcon: PropTypes.bool,
    searchBarStyle: PropTypes.object,
    searchBarContainerStyle: PropTypes.object,

    displayMask: PropTypes.bool,
    searchOnDefaultValue: PropTypes.bool,

    renderBackButton: PropTypes.func,
    renderRightButton: PropTypes.func,
    renderEmpty: PropTypes.func,
    renderEmptyResult: PropTypes.func,
    renderItemSeparator: PropTypes.func,
    renderSectionHeader: PropTypes.func,
    renderHeader: PropTypes.func,
    renderFooter: PropTypes.func,
    renderStickyHeader: PropTypes.func,
    renderRow: PropTypes.func,

    onSearchStart: PropTypes.func,
    onSearchEnd: PropTypes.func
  };

  static defaultProps = {
    searchCursor: 'cursor',
    toolbarHeight: Theme.size.toolbarHeight,
    sectionHeaderHeight: Theme.size.sectionHeaderHeight,
    rowHeight: Theme.size.rowHeight,
    searchInputPlaceholder: 'Search',
    searchInputDefaultValue: '',
    colors: {
      cancelTextColor: Theme.color.white,
      searchIconColor: Theme.color.primaryDark,
      searchListBackgroundColor: Theme.color.primaryDark,
      searchInputBackgroundColor: Theme.color.white,
      searchInputBackgroundColorActive: Theme.color.white,
      searchInputPlaceholderColor: '#979797',
      searchInputTextColor: Theme.color.primaryDark,
      searchInputTextColorActive: Theme.color.primaryDark,
      sectionIndexTextColor: '#6ec6ff',
      searchBarBackgroundColor: Theme.color.primaryDark,
      toolbarBackgroundColor: Theme.color.primaryDark
    },
    searchBarContainerStyle: {},
    displayMask: true,
    searchOnDefaultValue: false
  };

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      isSearching: false,
      searchStr: '',
      originalListData: [],
      sectionListData: [],
      sectionIds: [],
      animatedValue: new Animated.Value(0)
    };

    this.search = this.search.bind(this);
    this.cancelSearch = this.cancelSearch.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
    this.scrollToSection = this.scrollToSection.bind(this);
    this.itemOnPress = this.itemOnPress.bind(this);

    pinyin.setOptions({ checkPolyphone: false, charCase: 2 });
  }

  componentDidMount() {
    this.initList(this.props.data, this.props.searchCursor).then(() => {
      if (this.props.searchOnDefaultValue && this.props.searchInputDefaultValue != '') {
        this.search(this.props.searchInputDefaultValue);
        this.enterSearchState();
      }
    });
  }

  initList(data = [], searchCursor) {
    return new Promise((resolve, reject) => {
      const copiedSource = Array.from(data);
      this.setState({ originalListData: copiedSource });
      this.parseInitList(
        SearchService.sortList(SearchService.initList(copiedSource, searchCursor), this.props.sortFunc)
      );
      resolve();
    });
  }

  parseInitList(srcList) {
    const { formattedData, sectionIds } = SearchService.parseList(srcList);
    this.setState({
      isReady: true,
      isSearching: false,
      sectionListData: formattedData,
      sectionIds
    });
  }

  search(input) {
    this.setState({ searchStr: input });
    const { originalListData } = this.state;
    const { searchCursor } = this.props;

    if (input) {
      input = sTrim(input);
      const tempResult = SearchService.search(originalListData, input.toLowerCase(), searchCursor);

      if (tempResult.length === 0) {
        this.setState({
          isSearching: true,
          sectionListData: Array.from(this.state.sectionListData)
        });
      } else {
        const { searchResultData } = SearchService.sortResultList(
          tempResult,
          this.props.resultSortFunc
        );
        this.setState({
          isSearching: false,
          sectionListData: searchResultData
        });
      }
    } else {
      this.parseInitList(originalListData);
    }
  }

  /**
   * default section header in ListView
   * @param sectionData
   * @param sectionID
   * @returns {XML}
   * @private
   */
  _renderSectionHeader({ section: { title } }) {
    const { sectionHeaderHeight } = this.props;
    return <SectionHeader title={title} sectionHeaderHeight={sectionHeaderHeight} />
  }

  /**
   * default section index item
   * @param sectionData
   * @param sectionID
   * @returns {XML}
   * @private
   */
  _renderSectionIndexItem(section) {
    const { colors: { sectionIndexTextColor } } = this.props;
    return <SectionIndexItem section={section} sectionIndexTextColor={sectionIndexTextColor} />
  }

  /**
   * default render Separator
   * @param sectionID
   * @param rowID
   * @param adjacentRowHighlighted
   * @returns {XML}
   */
  _renderItemSeparator({ section: { title }, highlighted, leadingSection, trailingSection }) {
    let style = styles.rowSeparator;
    if (highlighted) {
      style = [style, styles.rowSeparatorHide];
    }
    const randomKey = Math.random().toString(36).substring(2, 15);

    return (
      <View key={randomKey} style={style}>
        <View
          style={{
            height: 1 / PixelRatio.get(),
            backgroundColor: '#fafafa'
          }}
        />
      </View>
    );
  }

  /**
   * render default list view footer
   * @returns {XML}
   * @private
   */
  _renderFooter() {
    return <View style={styles.scrollSpinner} />;
  }

  /**
   * render default list view header
   * @returns {null}
   * @private
   */
  _renderHeader() {
    return null;
  }

  /**
   *
   * @param item
   * @param sectionID
   * @param rowID
   * @param highlightRowFunc
   * @returns {XML}
   * @private
   */
  _renderRow({ index, item, section }) {
    const { searchCursor, itemOnPress } = this.props;
    return (
    <TouchableOpacity
      onPress={() => typeof itemOnPress === 'undefined' ? this.itemOnPress(item) : itemOnPress(item)} >
      <View style={{ flex: 1, marginLeft: 20, height: 40, justifyContent: 'center' }}>
        {/* use `HighlightableText` to highlight the search result */}
        <HighlightableText
          matcher={item.matcher}
          text={item[searchCursor]}
          textColor="#000000"
          hightlightTextColor="#0069c0"
        />
      </View>
    </TouchableOpacity>
    );
  }

  enterSearchState() {
    this.setState({ isSearching: true });
    Animated.timing(this.state.animatedValue, {
      duration: this.props.searchBarToggleDuration || Theme.duration.toggleSearchBar,
      toValue: 1,
      useNativeDriver: true
    }).start(() => {});
  }

  exitSearchState() {
    Animated.timing(this.state.animatedValue, {
      duration: this.props.searchBarToggleDuration || Theme.duration.toggleSearchBar,
      toValue: 0,
      useNativeDriver: true
    }).start(() => {
      this.search('');
      this.setState({ isSearching: false });
    });
  }

  itemOnPress(item) {
    const { searchCursor } = this.props;
    Alert.alert(
      'Clicked!',
      `sectionID:${item.orderIndex}; item: ${item[searchCursor]}`,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: true }
    );
  }

  onFocus() {
    if (!this.state.isSearching) {
      this.enterSearchState();
    }
    this.props.onSearchStart && this.props.onSearchStart();
  }

  onBlur() {
    this.props.onSearchEnd && this.props.onSearchEnd();
  }

  onClickCancel() {
    this.exitSearchState();
    this.props.onSearchEnd && this.props.onSearchEnd();
  }

  cancelSearch() {
    this.refs.searchBar && this.refs.searchBar.cancelSearch && this.refs.searchBar.cancelSearch();
  }

  scrollToSection(sectionIndex) {
    const { sectionIds } = this.state;

    if (!sectionIds || sectionIds.length === 0) {
      return;
    }

    this.refs.searchListView.scrollToLocation({
      itemIndex: 0,
      sectionIndex,
      animated: false
    });

    this.props.onScrollToSection && this.props.onScrollToSection(sectionIndex);
  }

  render() {
    return (
      <Animated.View
        ref="view"
        style={[
          {
            // 考虑上动画以后页面要向上移动，这里必须拉长
            height: Theme.size.windowHeight + this.props.toolbarHeight,
            width: Theme.size.windowWidth,
            transform: [
              {
                translateY: this.state.animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -this.props.toolbarHeight]
                })
              }
            ]
          },
          this.props.style
        ]}>
        <View
          style={[
            {
              flex: 1,
              backgroundColor: this.props.colors.searchListBackgroundColor
            }
          ]}>
          {this._renderToolbar()}

          <View style={this.props.searchBarContainerStyle}>
            <SearchBar
              placeholder={this.props.searchInputPlaceholder}
              defaultValue={this.props.searchInputDefaultValue}
              onChange={this.search}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onClickCancel={this.onClickCancel}
              cancelTitle={this.props.cancelTitle}
              cancelTextColor={this.props.colors.cancelTextColor}
              searchBarBackgroundColor={this.props.colors.searchBarBackgroundColor}
              searchIconColor={this.props.colors.searchIconColor}
              searchInputBackgroundColor={this.props.colors.searchInputBackgroundColor}
              searchInputBackgroundColorActive={this.props.colors.searchInputBackgroundColorActive}
              searchInputPlaceholderColor={this.props.colors.searchInputPlaceholderColor}
              searchInputTextColor={this.props.colors.searchInputTextColor}
              searchInputTextColorActive={this.props.colors.searchInputTextColorActive}
              searchInputStyle={this.props.searchInputStyle}
              renderCancel={this.props.renderCancel}
              renderCancelWhileSearching={this.props.renderCancelWhileSearching}
              cancelContainerStyle={this.props.cancelContainerStyle}
              staticCancelButton={this.props.staticCancelButton}
              showSearchIcon={this.props.showSearchIcon}
              searchBarStyle={this.props.searchBarStyle}
              ref="searchBar"
            />
          </View>
          {this._renderStickyHeader()}

          <View
            shouldRasterizeIOS
            renderToHardwareTextureAndroid
            style={[styles.listContainer, this.props.listContainerStyle]}>
            {this._renderSearchBody.bind(this)()}
            {this._renderSectionIndex.bind(this)()}
          </View>
        </View>

        {this.props.displayMask ? this._renderMask.bind(this)() : null}
      </Animated.View>
    );
  }

  /**
   * render the main list view
   * @returns {*}
   * @private
   */
  _renderSearchBody() {
    const { isReady, isSearching, searchStr, sectionListData } = this.state;
    const { searchCursor, renderEmptyResult, renderEmpty, data } = this.props;

    if (isSearching && !isReady && searchStr !== '') {
      return typeof renderEmptyResult === 'undefined' ? <EmptyResult searchStr={searchStr} /> : renderEmptyResult(searchStr)
    }
    if (data && data.length > 0 && isReady) {
      return (
        <SectionList
          ref="searchListView"
          keyExtractor={(item, index) =>
            item[searchCursor] + index + Math.random().toString(36).substring(2, 15)
          }
          sections={sectionListData}
          initialNumToRender={15}
          onEndReachedThreshold={30}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator
          renderItem={this.props.renderRow || this._renderRow.bind(this)}
          ItemSeparatorComponent={
            this.props.renderItemSeparator || this._renderItemSeparator.bind(this)
          }
          renderSectionHeader={
            this.props.renderSectionHeader || this._renderSectionHeader.bind(this)
          }
          ListFooterComponent={this.props.renderFooter || this._renderFooter.bind(this)}
          ListHeaderComponent={this.props.renderHeader || this._renderHeader.bind(this)}
          onScrollToIndexFailed={() => {}}
        />
      );
    }
    {typeof renderEmpty === 'undefined' ? <Empty/> : renderEmpty()}
  }

  /**
   * render a custom sticky header, isSearching is pass to renderStickyHeader
   * @returns {*}
   * @private
   */
  _renderStickyHeader() {
    const { renderStickyHeader } = this.props;
    const { isSearching } = this.state;
    return renderStickyHeader ? renderStickyHeader(isSearching) : null;
  }

  /**
   * render the modal mask when searching
   * @returns {XML}
   * @private
   */
  _renderMask() {
    const { isSearching, searchStr } = this.state;
    if (isSearching && !searchStr) {
      return (
        <TouchableOpacity
          onPress={this.cancelSearch}
          underlayColor="rgba(0, 0, 0, 0.0)"
          style={[
            { top: this.props.toolbarHeight + Theme.size.searchInputHeight },
            styles.maskStyle
          ]}>
          <Animated.View />
        </TouchableOpacity>
      );
    }
  }

  /**
   * render back button on the Toolbar
   * @returns {XML}
   * @private
   */
  _renderBackButton() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={{ position: 'absolute' }}>
        <Text
          hitSlop={{ top: 10, left: 20, bottom: 10, right: 20 }}
          style={[
            {
              fontSize: 30,
              color: Theme.color.white,
              paddingLeft: 15,
              paddingRight: 15
            }
          ]}>
          &#10094;
        </Text>
      </TouchableOpacity>
    );
  }

  /**
   * render Toolbar
   * @returns {XML}
   * @private
   */
  _renderToolbar() {
    const {
      title,
      titleTextColor,
      renderBackButton,
      renderRightButton,
      renderToolbar,
      toolbarHeight,
      colors
    } = this.props;
    const { toolbarBackgroundColor } = colors;
    const { animatedValue } = this.state;

    return renderToolbar ? (
      renderToolbar()
    ) : (
      <Toolbar
        animatedValue={animatedValue}
        style={[
          {
            opacity: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0]
            }),
            backgroundColor: toolbarBackgroundColor,
            height: toolbarHeight
          }
        ]}
        title={title}
        textColor={titleTextColor}
        renderBackButton={renderBackButton || this._renderBackButton.bind(this)}
        renderRightButton={renderRightButton}
      />
    );
  }

  /**
   * render the alphabetical index
   * @returns {*}
   * @private
   */
  _renderSectionIndex() {
    const {
      hideSectionList,
      toolbarHeight,
      sectionIndexContainerStyle,
      renderSectionIndexItem
    } = this.props;
    const { isSearching, sectionIds, animatedValue } = this.state;

    if (isSearching) {
      return null;
    }

    if (hideSectionList) {
      return null;
    }
    return (
      <View
        pointerEvents="box-none"
        style={[
          {
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: toolbarHeight,
            flexDirection: 'column',
            justifyContent: 'center'
          },
          sectionIndexContainerStyle
        ]}>
        <SectionIndex
          style={{
            opacity: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0]
            })
          }}
          onSectionSelect={this.scrollToSection}
          sections={sectionIds}
          renderSectionItem={renderSectionIndexItem || this._renderSectionIndexItem.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Theme.color.white
  },
  rowSeparator: {
    backgroundColor: Theme.color.white,
    paddingLeft: 30
  },
  rowSeparatorHide: {
    opacity: 0.0
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
  },
  separator2: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1 / PixelRatio.get(),
    marginVertical: 1
  },
  maskStyle: {
    position: 'absolute',
    // top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Theme.color.maskColor,
    zIndex: 999
  },
  scrollSpinner: {
    ...Platform.select({
      android: {
        height: Theme.size.searchInputHeight
      },
      ios: {
        marginVertical: 40
      }
    })
  }
});
