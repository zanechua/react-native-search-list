import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import styles from '../styles';

const SectionHeader = ({ title, sectionHeaderHeight }) => {
  return (
    <View style={[styles.sectionHeader, { height: sectionHeaderHeight }]}>
      <View
        style={{
          justifyContent: 'center',
          height: sectionHeaderHeight
        }}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
    </View>
  );
};

export default SectionHeader;
