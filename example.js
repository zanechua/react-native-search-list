import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SearchList from 'react-native-search-list';

const SearchListExample = () => {
  const [dataSource, setDataSource] = useState([]);

  if (dataSource.length === 0) {
    setDataSource([
      { cursor: 'A1' },
      { cursor: 'B1' },
      { cursor: 'A2' },
      { cursor: 'C1' },
      { cursor: 'Linder' },
      { cursor: '林林' },
      { cursor: '王五' },
      { cursor: '张三' },
      { cursor: '张二' },
      { cursor: '李四' },
      { cursor: '韩玮婷' },
      { cursor: '王怡雅' },
      { cursor: '谢宜萱' },
      { cursor: '陈阳发' },
      { cursor: '蔡雅帆' },
      { cursor: '张嘉宜' },
      { cursor: '孙宜婷' },
      { cursor: '许雅婷' },
      { cursor: '林明俐' },
      { cursor: '苏惠敏' },
      { cursor: '陈建铭' },
      { cursor: '陈建桦' },
      { cursor: '周喜名' },
      { cursor: '林智法' },
      { cursor: '陈俊成' },
      { cursor: '蔡淑玲' },
      { cursor: '陈佳蓉' },
      { cursor: '赖志文' },
      { cursor: '苏嘉鸿' },
      { cursor: '王子轩' },
      { cursor: '王玉瑄' },
      { cursor: '丁以阳' },
      { cursor: '吴宜珊' },
      { cursor: '蔡光云' },
      { cursor: '张长夫' },
      { cursor: '杨佑诚' },
      { cursor: '罗瑜吉' },
      { cursor: '吴昱旭' },
      { cursor: '李佳恭' },
      { cursor: '曹天忠' },
      { cursor: '杨琼映' },
      { cursor: '黄佳雯' },
      { cursor: '韩雅惠' },
      { cursor: '曾耀中' },
      { cursor: '林子东' },
      { cursor: '刘家贞' },
      { cursor: '王宛凡' },
      { cursor: '林玫文' },
      { cursor: '唐慧君' },
      { cursor: '姚彦志' },
      { cursor: '林明莲' },
      { cursor: '王怡秀' },
      { cursor: '何美娟' },
      { cursor: '詹惠玲' },
      { cursor: '周可韦' },
      { cursor: '乌浩行' },
      { cursor: '吕雅慧' },
      { cursor: '简心宪' },
      { cursor: '陈绿宁' },
      { cursor: '邱朝伟' },
      { cursor: '杨芸勇' },
      { cursor: '白玉芳' },
      { cursor: '谢秀娟' },
      { cursor: '陈慧昆' },
      { cursor: '孙素兰' },
      { cursor: '蔡宜宣' },
      { cursor: '高奎义' },
      { cursor: '徐婉婷' },
      { cursor: '吴欣洁' },
      { cursor: '黄惠雯' },
      { cursor: '黄翠季' },
      { cursor: '刘宗儒' },
      { cursor: '周雅雯' },
      { cursor: '房灿雅' },
      { cursor: '黄崇惠' },
      { cursor: '吴淑真' },
      { cursor: '江乃淑' },
      { cursor: '麻珮甄' },
      { cursor: '李家荣' },
      { cursor: '赖隆行' },
      { cursor: '颜祥君' },
      { cursor: '杨丽娟' },
      { cursor: '伏如依' },
      { cursor: '郭琬白' },
      { cursor: '王荣如' },
      { cursor: '姜俊霖' },
      { cursor: '陈淑君' },
      { cursor: '刘昶人' },
      { cursor: '李志文' },
      { cursor: '陈永珮' },
      { cursor: '谢明合' },
      { cursor: '林怡洁' },
      { cursor: '曾郁文' },
      { cursor: '李 火' },
      { cursor: '张姿蓉' },
      { cursor: '魏淑卿' },
      { cursor: '柯苡丞' },
      { cursor: '陈之法' },
      { cursor: '林虹绮' },
      { cursor: '昌宁欢' },
      { cursor: '黄惠君' }
    ]);
  }

  return (
    <View style={styles.container}>
      <SearchList
        data={dataSource}
        itemOnPress={item => {
          console.log('Single Item :: ', item);
        }}
        rowHeight={40}
        title="Search List Demo"
        onClickBack={() => {}}
        colors={{
          toolbarBackgroundColor: '#2196f3',
          titleTextColor: '#ffffff',
          cancelTextColor: '#ffffff',
          searchIconColor: '#ffffff',
          searchListBackgroundColor: '#2196f3',
          searchInputBackgroundColor: '#0069c0',
          searchInputBackgroundColorActive: '#0069c0',
          searchInputPlaceholderColor: '#ffffff',
          searchInputTextColor: '#ffffff',
          searchInputTextColorActive: '#ffffff',
          sectionIndexTextColor: '#6ec6ff',
          searchBarBackgroundColor: '#2196f3'
        }}
        searchBarToggleDuration={300}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 44,
    alignItems: 'center',
    backgroundColor: '#2196f3'
  }
});

export default SearchListExample;