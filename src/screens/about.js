import React from 'react';
import { SafeAreaView, Image } from 'react-native';
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
      <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        <Text style={{ marginBottom: 23.76, marginTop: 80, fontSize: 35, fontWeight: 'bold', color: "#636363" }}>Hoe het werkt</Text>
        <Text style={{ maxWidth: '80%', fontSize: 18}}>
          De <Text style={{fontWeight: 'bold', fontSize: 18, color: 'orange'}}>app</Text> is er om je te helpen in te zien welke partij jij past!. Op deze manier berijd jij je voor op de <Text style={{fontStyle: 'italic', fontSize: 18}}>aankomende verkiezingen</Text>, aangezien bij elke verkiezingen weer nieuwe partijen worden opgericht.
          {"\n\n"}
          In deze <Text style={{fontWeight: 'bold', fontSize: 18, color: 'orange'}}>app</Text> maak je een kleine vragenlijst met stellingen waar je <Text style={{fontWeight: 'bold', fontSize: 18, color: 'green'}}>eens</Text>, <Text style={{fontWeight: 'bold', fontSize: 18, color: 'red'}}>oneens</Text> en <Text style={{fontWeight: 'bold', fontSize: 18, color: 'grey'}}>geen mening</Text> op kan antwoorden. Door deze antwoorden wordt er vergeleken met wat de partijen vinden over deze stellingen.
        </Text>
        <Image style={{ position: 'absolute', bottom: -120, right: -100, opacity: 0.2, zIndex: -1}} source={require('./../assets/vote.png')} />
      </Layout>
    </SafeAreaView>
  );
};