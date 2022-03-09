import React from "react";
import { View, StyleSheet } from "react-native";

const Separator = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#E2E2E2",
    marginStart: 88,
  },
});

export default Separator;
