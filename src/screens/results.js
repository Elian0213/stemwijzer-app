import React from 'react';
import { SafeAreaView, Image, StyleSheet, View } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, Card, Avatar } from '@ui-kitten/components';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

const Header = (partyName, imageSrc) => (
  <View style={styles.cardHeader}>
    <Text category='h6'>{partyName}</Text>
    <Avatar style={styles.avatar} size='giant' source={{
      uri: imageSrc
    }}/>
  </View>
);

export const ResultScreen = ({ navigation }) => {
  const result = [
    {
      "id": "3",
      "politicParty": "PVV",
      "distance": 2,
      "distancePercent": 85.85786437626905,
      "image": "src/img/pvv.png"
    },
    {
      "id": "1",
      "politicParty": "VVD",
      "distance": 4.123105625617661,
      "distancePercent": 70.84524052577349,
      "image": "src/img/vvd.png"
    },
    {
      "id": "6",
      "politicParty": "FVD",
      "distance": 4.123105625617661,
      "distancePercent": 70.84524052577349,
      "image": "src/img/fvd.png"
    }
  ];

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='Resultaat van de Stemwijzer' style={{ paddingTop: 0 }} alignment='center' accessoryLeft={BackAction}/>
      <Divider/>
      <Layout style={styles.container}>
        <Text style={styles.header}>Resultaat</Text>
        {result.map((party) => (
          <Card header={() => Header(party.politicParty, `http://192.168.1.100:8000/${party.image}`)}>
            <Text>wag1</Text>
          </Card>
        ))}
        <Image style={styles.bottomImage} source={require('./../assets/statistics.png')} />
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
    marginTop: 80,
    fontSize: 35,
    fontWeight: 'bold',
    color: "#636363"
  },
  bottomImage: {
    position: 'absolute',
    bottom: -120,
    right: -100,
    opacity: 0.2,
    zIndex: -1
  },
  cardHeader: {
    padding: 10
  }
});
