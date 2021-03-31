import React from 'react';
import { SafeAreaView, Image, StyleSheet } from 'react-native';
import { Button, Divider, Layout, TopNavigation, Text, Icon } from '@ui-kitten/components';

const StarIcon = (props) => (
  <Icon {...props} name='checkmark-square-outline'/>
);

export const HomeScreen = ({ navigation }) => {
  const navigateAbout = () => {
    navigation.navigate('About');
  };

  const navigateQuestions = () => {
    navigation.navigate('Results');
  };

  return (
    <SafeAreaView style={{ flex: 1}}>
      <TopNavigation
        alignment='center'
        title='Stemwijzer'
        subtitle='Welke partij past bij jou?'
      />
      <Divider />
      <Layout style={styles.container}>
        <Text style={styles.bigTitle}>De stemwijzer</Text>
        <Button
          size="giant"
          status="success"
          onPress={navigateQuestions}
          accessoryRight={StarIcon}
        >
          Begin!
        </Button>
        <Button
          size="small"
          status="info"
          style={styles.startButton}
          onPress={navigateAbout}
        >
          Over de Stemwijzer™
        </Button>
        <Image style={styles.bottomImage} source={require('./../assets/netherlands_big.png')} />
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, paddingTop: 90, alignItems: 'center'
  },
  bigTitle: {
    marginBottom: 40,
    fontSize: 35,
    fontWeight: 'bold',
    color: "#636363"
  },
  bottomImage: {
    position: 'absolute',
    bottom: -120,
    right: -100,
    opacity: 0.5,
    zIndex: -1
  },
  startButton: {
    marginTop: 50
  }
});
