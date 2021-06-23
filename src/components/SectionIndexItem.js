import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import styles from '../styles';

const SectionIndexItem = ({ section, sectionIndexTextColor}) => {
  return (
    <Text
      style={{
        textAlign: 'center',
        color: sectionIndexTextColor,
        fontSize: 14,
        height: 20
      }}>
      {section}
    </Text>
  );
};

export default SectionIndexItem;
