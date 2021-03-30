import React from 'react';
import { SafeAreaView, Image} from 'react-native';
import { Button, Divider, Layout, TopNavigation, Text, Icon } from '@ui-kitten/components';

const StarIcon = (props) => (
  <Icon {...props} name='checkmark-square-outline'/>
);

export const HomeScreen = ({ navigation }) => {

  const navigateAbout = () => {
    navigation.navigate('About');
  };

  const navigateQuestions = () => {
    navigation.navigate('Questions');
  };

  return (
    <SafeAreaView style={{ flex: 1}}>
    <TopNavigation
        alignment='center'
        title='Stemwijzer'
        subtitle='Welke partij past bij jou?'
      />
      <Divider color="red" />
      <Layout style={{ flex: 1, paddingTop: 90, alignItems: 'center' }}>
        <Text style={{ marginBottom: 40, fontSize: 35, fontWeight: 'bold', color: "#636363" }}>De stemwijzer</Text>
        <Button size="giant" status="success" onPress={navigateQuestions} accessoryRight={StarIcon}>Begin!</Button>
        <Button size="small" status="info" style={{ marginTop: 50 }} onPress={navigateAbout}>Over de Stemwijzer™</Button>
        <Image style={{ position: 'absolute', bottom: -120, right: -100, opacity: 0.5, zIndex: -1}} source={require('./../assets/netherlands_big.png')} />
      </Layout>
    </SafeAreaView>
  );
};