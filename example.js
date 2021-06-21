import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Layouts } from 'styles';
import SearchList, { HighlightableText } from 'react-native-search-list';
import Touchable from 'react-native-search-list/src/utils/Touchable';

const SearchListExample = () => {
  const [dataSource, setDataSource] = useState([]);

  if (dataSource.length === 0) {
    setDataSource([
      { searchStr: 'A1' },
      { searchStr: 'B1' },
      { searchStr: 'A2' },
      { searchStr: 'C1' },
      { searchStr: 'Linder' },
      { searchStr: '林林' },
      { searchStr: '王五' },
      { searchStr: '张三' },
      { searchStr: '张二' },
      { searchStr: '李四' },
      { searchStr: '韩玮婷' },
      { searchStr: '王怡雅' },
      { searchStr: '谢宜萱' },
      { searchStr: '陈阳发' },
      { searchStr: '蔡雅帆' },
      { searchStr: '张嘉宜' },
      { searchStr: '孙宜婷' },
      { searchStr: '许雅婷' },
      { searchStr: '林明俐' },
      { searchStr: '苏惠敏' },
      { searchStr: '陈建铭' },
      { searchStr: '陈建桦' },
      { searchStr: '周喜名' },
      { searchStr: '林智法' },
      { searchStr: '陈俊成' },
      { searchStr: '蔡淑玲' },
      { searchStr: '陈佳蓉' },
      { searchStr: '赖志文' },
      { searchStr: '苏嘉鸿' },
      { searchStr: '王子轩' },
      { searchStr: '王玉瑄' },
      { searchStr: '丁以阳' },
      { searchStr: '吴宜珊' },
      { searchStr: '蔡光云' },
      { searchStr: '张长夫' },
      { searchStr: '杨佑诚' },
      { searchStr: '罗瑜吉' },
      { searchStr: '吴昱旭' },
      { searchStr: '李佳恭' },
      { searchStr: '曹天忠' },
      { searchStr: '杨琼映' },
      { searchStr: '黄佳雯' },
      { searchStr: '韩雅惠' },
      { searchStr: '曾耀中' },
      { searchStr: '林子东' },
      { searchStr: '刘家贞' },
      { searchStr: '王宛凡' },
      { searchStr: '林玫文' },
      { searchStr: '唐慧君' },
      { searchStr: '姚彦志' },
      { searchStr: '林明莲' },
      { searchStr: '王怡秀' },
      { searchStr: '何美娟' },
      { searchStr: '詹惠玲' },
      { searchStr: '周可韦' },
      { searchStr: '乌浩行' },
      { searchStr: '吕雅慧' },
      { searchStr: '简心宪' },
      { searchStr: '陈绿宁' },
      { searchStr: '邱朝伟' },
      { searchStr: '杨芸勇' },
      { searchStr: '白玉芳' },
      { searchStr: '谢秀娟' },
      { searchStr: '陈慧昆' },
      { searchStr: '孙素兰' },
      { searchStr: '蔡宜宣' },
      { searchStr: '高奎义' },
      { searchStr: '徐婉婷' },
      { searchStr: '吴欣洁' },
      { searchStr: '黄惠雯' },
      { searchStr: '黄翠季' },
      { searchStr: '刘宗儒' },
      { searchStr: '周雅雯' },
      { searchStr: '房灿雅' },
      { searchStr: '黄崇惠' },
      { searchStr: '吴淑真' },
      { searchStr: '江乃淑' },
      { searchStr: '麻珮甄' },
      { searchStr: '李家荣' },
      { searchStr: '赖隆行' },
      { searchStr: '颜祥君' },
      { searchStr: '杨丽娟' },
      { searchStr: '伏如依' },
      { searchStr: '郭琬白' },
      { searchStr: '王荣如' },
      { searchStr: '姜俊霖' },
      { searchStr: '陈淑君' },
      { searchStr: '刘昶人' },
      { searchStr: '李志文' },
      { searchStr: '陈永珮' },
      { searchStr: '谢明合' },
      { searchStr: '林怡洁' },
      { searchStr: '曾郁文' },
      { searchStr: '李 火' },
      { searchStr: '张姿蓉' },
      { searchStr: '魏淑卿' },
      { searchStr: '柯苡丞' },
      { searchStr: '陈之法' },
      { searchStr: '林虹绮' },
      { searchStr: '昌宁欢' },
      { searchStr: '黄惠君' }
    ]);
  }

  // custom render row
  function renderRow({ index, item, section }) {
    return (
      <Touchable
        onPress={() => {
          Alert.alert(
            'Clicked!',
            `sectionID:${item.orderIndex}; item: ${item.searchStr}`,
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: true }
          );
        }}>
        <View style={{ flex: 1, marginLeft: 20, height: 40, justifyContent: 'center' }}>
          {/* use `HighlightableText` to highlight the search result */}
          <HighlightableText
            matcher={item.matcher}
            text={item.searchStr}
            textColor="#000000"
            hightlightTextColor="#0069c0"
          />
        </View>
      </Touchable>
    );
  }

  // render empty view when datasource is empty
  function renderEmpty() {
    return (
      <View style={styles.emptyDataSource}>
        <Text style={{ color: '#979797', fontSize: 18, paddingTop: 20 }}> No Content </Text>
      </View>
    );
  }

  // render empty result view when search result is empty
  function renderEmptyResult(searchStr) {
    return (
      <View style={styles.emptySearchResult}>
        <Text style={{ color: '#979797', fontSize: 18, paddingTop: 20 }}>
          {' '}
          No Result For <Text style={{ color: '#171a23', fontSize: 18 }}>{searchStr}</Text>
        </Text>
        <Text style={{ color: '#979797', fontSize: 18, alignItems: 'center', paddingTop: 10 }}>
          Please search again
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchList
        data={dataSource}
        renderRow={renderRow}
        renderEmptyResult={renderEmptyResult}
        renderEmpty={renderEmpty}
        rowHeight={40}
        toolbarHeight={60}
        statusBarHeight={0}
        toolbarBackgroundColor="#2196f3"
        title="Search List Demo"
        titleTextColor="#ffffff"
        cancelTitle="Cancel"
        onClickBack={() => {}}
        searchListBackgroundColor="#2196f3"
        searchBarToggleDuration={300}
        searchInputBackgroundColor="#0069c0"
        searchInputBackgroundColorActive="#6ec6ff"
        searchInputPlaceholderColor="#ffffff"
        searchInputTextColor="#ffffff"
        searchInputTextColorActive="#000000"
        searchInputPlaceholder="Search"
        sectionIndexTextColor="#6ec6ff"
        searchBarBackgroundColor="#2196f3"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layouts.margin.lg
  },
  emptyDataSource: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 50
  },
  emptySearchResult: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 50
  }
});

export default SearchListExample;