import React from 'react';
import { createPortal } from 'react-dom';
import { View, StyleSheet } from 'react-native';
import { useState } from 'react/cjs/react.development';

export default function ProgressBar({ totalQuestions, currentQuestion }) {
  const [colorBar, setColor] = useState();
  const [borderThing, setBorderThing] = useState(0);

  const calculatedHeight = () => {
    let calc = Math.ceil(100 / totalQuestions * (currentQuestion + 1));
    let colorSpace = `hsl(${calc}, 100%, 50%)`;

    if (currentQuestion == 16 && borderThing !== 10) {
      setBorderThing(10);
    } else if (borderThing !== 0 && currentQuestion !== 16) {
      setBorderThing(0);
    }

    if (colorBar !== colorSpace) {
      setColor(colorSpace)
    }

    return `${calc}%`;
  }

  return (
    <View style={styles.container}>
      <View style={styles.progressBar} width={calculatedHeight()} backgroundColor={colorBar} borderRadius={borderThing}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 20,
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    zIndex: 1
  },
  progressBar: {
    zIndex: -2,
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});