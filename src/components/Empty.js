import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import styles from '../styles';

const Empty = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>No Content</Text>
  </View>
);

export default Empty;
