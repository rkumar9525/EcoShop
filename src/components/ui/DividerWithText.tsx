import React from 'react';
import { View, Text, TextStyle, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../constants';

interface DividerWithTextProps {
  text: string;
}

const DividerWithText: React.FC<DividerWithTextProps> = ({ text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  text: {
    fontSize: typography.caption,
    color: colors.textTertiary,
    paddingHorizontal: spacing.md,
    fontWeight: typography.weightMedium as TextStyle['fontWeight'],
  },
});

export default DividerWithText;