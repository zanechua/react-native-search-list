# React Native Search List

<p align="center">
<a href="https://www.npmjs.com/package/react-native-search-list"><img src="https://img.shields.io/npm/v/react-native-search-list.svg?style=flat-square" alt="Release"></a>
<a href="https://www.npmjs.com/package/react-native-search-list"><img src="https://img.shields.io/npm/dm/react-native-search-list.svg?style=flat-square" alt="Release"></a>
<a href="https://github.com/zanechua/react-native-search-list/releases"><img src="https://img.shields.io/github/release/zanechua/react-native-search-list.svg?style=flat-square" alt="Release"></a>
<a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-semistandard-brightgreen.svg?style=flat-square" alt="Semi Standard - JavaScript Style Guide"></a>
<a href="https://github.com/zanechua/react-native-search-list/blob/master/LICENSE"><img src="https://img.shields.io/github/license/zanechua/react-native-search-list.svg?style=flat-square" alt="License"></a>
</p>


A searchable ListView which supports Chinese PinYin and alphabetical index.

A fork of https://github.com/unpourtous/react-native-search-list

The original library was missing some commonly used features that are now implemented and the deprecated ListView was replaced with a SectionList to be compatible with future releases of React Native.

<p align="center">
  <img src='https://user-images.githubusercontent.com/4265429/122762221-abf5ad80-d2cf-11eb-85f2-c25188081c02.gif' />
</p>

The following picture may be helpful to understand the structure and APIs: 

<p align="center">
<img src='https://user-images.githubusercontent.com/4265429/122762306-c29c0480-d2cf-11eb-996a-de0cb8ab03a5.jpg' />
</p>

## Installation

```bash
yarn add react-native-search-list
```

## Usage

To Use SearchList, you will need an array of objects as the data source, and each object has to have a `cursor` property, example code is in `./example.js`.


## APIs

prop name | type | description | default value
--- | --- | --- | --- 
data | array | The data object
searchCursor | string | Set the key in the data array that's being used as the search source | `cursor`
renderRow | number | Render your custom row content | 
rowHeight | number | The height of the default row content, it will be used for scroll calculate | `40`
sectionHeaderHeight | number | The height of section header content | `24`
listContainerStyle | object | Style properties for the internal TextInput Component | 
searchListBackgroundColor | string | BackgroundColor for searchList | `#171a23`
toolbarBackgroundColor | string | Toolbar background color | `#171a23`
searchBarToggleDuration | number | Custom search bar animation duration | `300`
searchBarBackgroundColor | string | Custom search bar background color | `#171a23`
searchBarContainerStyle | object | Style properties for the SearchBar Container Component | 
searchBarStyle | object | Style properties for the SearchBar Component | 
searchOnDefaultValue | bool | Enable filtered results based on default value | 
searchIconColor | string | Custom color for the search icon | `#171a23`
searchInputBackgroundColor | string | Custom search input default state background color | `#ffffff`
searchInputBackgroundColorActive | string | Custom search input searching state background color | 
searchInputPlaceholder | string | Custom search input placeholder text | 
searchInputDefaultValue | string | Custom search input default value text | 
searchInputPlaceholderColor | string | Custom search input placeholder text color | `#979797`
searchInputTextColor | string | Custom search input default state text color | `#171a23`
searchInputTextColorActive | string | Custom search input searching state text color | `#ffffff`
searchInputStyle | object | Style properties for the internal TextInput Component | 
toolbarHeight | number | The height of the tool bar | `44`
searchBarBackgroundColor | string | Custom search bar background color | 
staticCancelButton | bool | Enable/Disable a static cancel button with no slide in animation | `false`
showSearchIcon | bool | Show/Hide the search icon | `true`
displayMask | bool | Show/Hide the mask during searching | `true`
title | string | Toolbar title | 
titleTextColor | string | Toolbar title text color | 
cancelTitle | string | Search bar cancel text color | `Cancel`
cancelTextColor | string | Search bar cancel text color | `#ffffff`
cancelContainerStyle | object | Style properties for the cancel button container |
hideSectionList | bool | Whether to hide the alphabetical section listing view or not. |
sortFunc | func | The sort function for the list view data source,sorting alphabetical by default |
resultSortFunc | func | The sort function for the search result,sorting first match position by default |
onScrollToSection | func | The callback of alphabetical section view be clicked or touch |
sectionIndexTextColor | string | Section index text color | 
sectionIndexContainerStyle | object | Style properties for the Section Index Container Component | 
renderSectionIndexItem | func | Custom render SectionIndexItem. |
renderBackButton | func | Render a custom back buttom on Toolbar. |
renderEmpty | func | Render a view when data is empty. |
renderEmptyResult | func | Render a view when search result is empty. |
renderItemSeparator | func | Render row separator. |
renderSectionHeader | func | `renderSectionHeader` for the internal ListView |
renderHeader | func | `renderHeader` for the internal ListView |
renderFooter | func | `renderFooter` for the internal ListView |
renderStickyHeader | func | `renderStickyHeader` for the section below the SearchBar |
renderRow | func | `renderRow` for the internal ListView |
renderToolbar | func | `renderToolbar` for the Toolbar |
renderCancel | func | `renderCancel` for custom rendering of the cancel button |
renderCancelWhileSearching | func | `renderCancelWhileSearching` for custom rendering of the cancel button during search |
onSearchStart | func | Callback when searching start. |
onSearchEnd | func | Callback when searching end. |


## Contributions
* [js-pinyin](https://github.com/waterchestnut/pinyin)
* [@unpourtous/react-native-search-list](https://github.com/unpourtous/react-native-search-list)
* [react-native-selectablesectionlistview](https://github.com/johanneslumpe/react-native-selectablesectionlistview)
