import pinyin from 'js-pinyin';
import { isCharacter, sTrim, containsChinese } from './utils/utils';

export default class SearchService {
  static search(source, searchStr) {
    const tempResult = [];
    source.forEach((item, idx, array) => {
      if (item) {
        // 全局匹配字符
        if (item.searchStr) {
          const { searchHandler } = item;
          const result = SearchService.generateMacherInto(
            item.searchStr,
            item,
            searchStr,
            searchHandler ? searchHandler.translatedStr : '',
            searchHandler ? searchHandler.charIndexerArr : []
          );
          if (result.matcher) {
            tempResult.push(result);
          }
        }
      }
    });
    return tempResult;
  }

  // FIXME 这个函数需要改造为一个字符串匹配多项
  static generateMacherInto(source, item, inputLower, transStr, charIndexer) {
    const result = {};
    Object.assign(result, item);
    if (source) {
      const matcher = {};
      matcher.matches = [];
      if (source.toLowerCase().indexOf(inputLower) >= 0) {
        matcher.charMatchStartIndex = source.toLowerCase().indexOf(inputLower);
        matcher.charMatchEndIndex = matcher.charMatchStartIndex + inputLower.length;

        matcher.matches.push({
          start: matcher.charMatchStartIndex,
          end: matcher.charMatchEndIndex
        });
        result.matcher = matcher;
      } else if (transStr && charIndexer) {
        const inputStartIndex = transStr.indexOf(inputLower);
        if (inputStartIndex >= 0) {
          for (let i = 0; i < charIndexer.length; i++) {
            const startCharIndexer = charIndexer[i];

            if (startCharIndexer) {
              if (startCharIndexer.startIndexInTransedStr === inputStartIndex) {
                const inputEndIndex = inputStartIndex + inputLower.length - 1;
                let find = false;
                for (let j = i; j < charIndexer.length; j++) {
                  const endCharIndexer = charIndexer[j];

                  if (inputEndIndex <= endCharIndexer.endIndexInTransedStr) {
                    find = true;
                    matcher.charMatchStartIndex = startCharIndexer.index;
                    matcher.charMatchEndIndex = endCharIndexer.index + 1;
                    matcher.matches.push({
                      start: matcher.charMatchStartIndex,
                      end: matcher.charMatchEndIndex
                    });
                    result.matcher = matcher;
                    break;
                  }
                }

                if (find) {
                  break;
                }
              }
            }
          }
        }
      }
    }

    return result;
  }

  static sortResultList(searchResultList, resultSortFunc) {
    searchResultList.sort(
      resultSortFunc ||
        function (a, b) {
          if (b.matcher && a.matcher) {
            if (b.matcher.charMatchStartIndex < a.matcher.charMatchStartIndex) {
              return 1;
            }
            if (b.matcher.charMatchStartIndex > a.matcher.charMatchStartIndex) {
              return -1;
            }
            return 0;
          }
          return 0;
        }
    );

    const { formattedData } = this.parseList(searchResultList);

    return {
      searchResultData: formattedData
    };
  }

  static generateSearchHandler(source) {
    let searchHandler = null;
    if (containsChinese(source)) {
      searchHandler = {};
      searchHandler.charIndexerArr = [];
      searchHandler.translatedStr = '';

      let translatedLength = 0;
      for (let i = 0; i < source.length; i++) {
        const tempChar = source[i];

        const pinyinStr = pinyin.getFullChars(tempChar);

        const charIndexer = {};
        charIndexer.index = i;
        charIndexer.startIndexInTransedStr = translatedLength;
        charIndexer.endIndexInTransedStr = translatedLength + pinyinStr.length - 1;
        charIndexer.pinyinStr = pinyinStr.toLowerCase();

        searchHandler.charIndexerArr.push(charIndexer);

        translatedLength += pinyinStr.length;
        searchHandler.translatedStr += pinyinStr.toLowerCase();
      }
    }
    return searchHandler;
  }

  static parseList(sourceData) {
    const formattedData = [];
    const sectionIds = [];

    sourceData.forEach((item) => {
      if (item) {
        // 加入到section
        let { orderIndex } = item;
        if (!isCharacter(item.orderIndex)) {
          orderIndex = '#';
        }
        if (!sectionIds.includes(orderIndex)) {
          sectionIds.push(orderIndex);
          formattedData.push({ title: orderIndex, data: [] });
        }

        const rowData = formattedData.find((object) => {
          return object.title === orderIndex;
        });

        rowData.data.push(item);
      }
    });

    return {
      formattedData,
      sectionIds
    };
  }

  static initList(sourceData) {
    sourceData.forEach((item) => {
      if (item) {
        // 生成排序索引
        item.orderIndex = '';
        item.isChinese = 0;

        if (item.searchStr) {
          const tempStr = sTrim(item.searchStr);

          if (tempStr !== '') {
            // 补充首字母
            const firstChar = item.searchStr[0];

            if (containsChinese(firstChar)) {
              const pinyinChar = pinyin.getCamelChars(firstChar);

              if (pinyinChar) {
                item.orderIndex = pinyinChar.toUpperCase();
                item.isChinese = 1;
              }
            } else {
              item.orderIndex = firstChar.toUpperCase();
              item.isChinese = 0;
            }
          }
          // 对中文进行处理
          const handler = SearchService.generateSearchHandler(item.searchStr);
          if (handler) {
            item.searchHandler = handler;
          }
        }
      }
    });
    return sourceData;
  }

  static sortList(sourceData, sortFunc) {
    sourceData.sort(
      sortFunc ||
        function (a, b) {
          if (!isCharacter(b.orderIndex)) {
            return -1;
          }
          if (!isCharacter(a.orderIndex)) {
            return 1;
          }
          if (b.orderIndex > a.orderIndex) {
            return -1;
          }
          if (b.orderIndex < a.orderIndex) {
            return 1;
          }
          if (b.isChinese > a.isChinese) {
            return -1;
          }
          if (b.isChinese < a.isChinese) {
            return 1;
          }
          return 0;
        }
    );

    return sourceData;
  }
}
