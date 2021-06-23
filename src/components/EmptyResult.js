import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import styles from '../styles';

const EmptyResult = (searchStr) => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {' '}
        No Result For <Text style={{ color: '#171a23', fontSize: 18 }}>{searchStr}</Text>
      </Text>
      <Text style={{ color: '#979797', fontSize: 18, alignItems: 'center', paddingTop: 10 }}>
        Please search again
      </Text>
    </View>
  );
};

export default EmptyResult;
