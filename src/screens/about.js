import React from 'react';
import { SafeAreaView, Image, StyleSheet } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export const AboutScreen = ({ navigation }) => {

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Over de stemwijzer' style={{ paddingTop: 0 }} alignment='center' accessoryLeft={BackAction}/>
      <Divider/>
      <Layout style={styles.container}>
        <Text style={styles.header}>Over de stemwijzer</Text>
        <Text style={{ maxWidth: '80%', fontSize: 18}}>
          Bij iedere verkiezing worden weer nieuwe partijen opgericht. Met deze <Text style={styles.highlight}>stemwijzer</Text> helpen we jou om te  onderzoeken welke partij bij jou past!
        </Text>
          <Text style={styles.header2}>Hoe werkt het?</Text>
        <Text style={{ maxWidth: '80%', fontSize: 18}}>
          In deze app geven we jou een aantal korte stellingen waar je <Text style={{fontWeight: 'bold', fontSize: 18, color: 'green'}}>eens</Text>, <Text style={{fontWeight: 'bold', fontSize: 18, color: 'red'}}>oneens</Text> of <Text style={{fontWeight: 'bold', fontSize: 18, color: 'grey'}}>geen mening</Text> op kan antwoorden.
          {'\n\n'}
          Jouw antwoorden worden vergeleken met de <Text style={styles.italic}>verkiezingsprogramma’s</Text> van alle partijen die deelnemen aan de komende verkiezingen.
        </Text>
        <Image style={styles.bottomImage} source={require('./../assets/vote.png')} />
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  header: {
    marginBottom: 23.76,
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 80,
    color: "#636363"
  },
  header2: {
    marginBottom: 23.76,
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 25,
    color: "#636363"
  },
  highlight: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'orange'
  },
  italic: {
    fontStyle: 'italic',
    fontSize: 18,
  },
  bottomImage: {
    position: 'absolute',
    bottom: -120,
    right: -100,
    opacity: 0.1,
    zIndex: -1
  }
});
