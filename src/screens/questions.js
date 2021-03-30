import React from 'react';
import { SafeAreaView, Image, View} from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export const QuestionsScreen = ({ navigation }) => {

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
      <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        <Text style={{ marginBottom: 23.76, marginTop: 20, fontSize: 35, fontWeight: 'bold', color: "#636363" }}>Vraag 1 / 10</Text>
        <View style={{ maxWidth: '80%', marginTop: 20, minHeight: 190, borderColor:'black', borderWidth:1, padding: 15, borderRadius: 20 }}>
        <Text style={{ fontSize: 18}}>
          De maak je een kleine vragenlijst met stellingen waar je, en geen mening op kan antwoorden. Door deze antwoorden wordt er vergeleken met wat de partijen vinden over deze stellingen.
        </Text>
        </View>
        <Image style={{ position: 'absolute', bottom: -100, right: -100, opacity: 0.1, zIndex: -1}} source={require('./../assets/windmill.png')} />
      </Layout>
    </SafeAreaView>
  );
};