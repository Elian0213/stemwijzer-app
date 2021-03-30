import React from 'react';
import { SafeAreaView, Image, View} from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, Button } from '@ui-kitten/components';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

const CheckIcon = (props) => (
  <Icon {...props} name='checkmark-outline'/>
);

const CrossIcon = (props) => (
  <Icon {...props} name='close-outline'/>
);

const MinusIcon = (props) => (
  <Icon {...props} name='minus-outline' />
);

export const QuestionsScreen = ({ navigation }) => {

  const navigateBack = () => {
    navigation.goBack();
  };

  const answerAgree = () => (
    navigation.goBack()
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Over de stemwijzer' style={{ paddingTop: 0 }} alignment='center'/>
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        <Text style={{ marginBottom: 23.76, marginTop: 20, fontSize: 35, fontWeight: 'bold', color: "#636363" }}>1 / 10</Text>
        <View style={{ maxWidth: '80%', marginTop: 18, minHeight: 190, borderColor:'black', borderWidth:1, padding: 15, borderRadius: 20 }}>
          <Text style={{ fontSize: 18}}>
            De maak je een kleine vragenlijst met stellingen waar je, en geen mening op kan antwoorden. Door deze antwoorden wordt er vergeleken met wat de partijen vinden over deze stellingen.
          </Text>
        </View>
        <View style={{ marginTop: 20, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 220}}>
          <Button size="giant" style={{textAlign: 'right'}} status="success" onPress={answerAgree} accessoryLeft={CheckIcon}>Eens</Button>
          <Button size="giant" status="basic" onPress={answerAgree} accessoryLeft={MinusIcon}>Geen mening</Button>
          <Button size="giant" status="danger" onPress={answerAgree} accessoryLeft={CrossIcon}>Oneens</Button>
        </View>
        <Image style={{ position: 'absolute', bottom: -100, right: -100, opacity: 0.1, zIndex: -1}} source={require('./../assets/windmill.png')} />
      </Layout>
    </SafeAreaView>
  );
};