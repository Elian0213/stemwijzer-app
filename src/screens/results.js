import React, { useEffect, useState } from 'react';
import { SafeAreaView, Image, StyleSheet, View } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, Card, Spinner, Button } from '@ui-kitten/components';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

const Header = (imgSource, number) => (
  <View style={styles.cardHeader}>
    <Text style={styles.numberRank}>{number + 1}.</Text>
    <Image style={styles.partyImage} source={{
      uri: imgSource
    }} />
  </View>
);

export const ResultScreen = ({ route, navigation }) => {
  const [ result, setResult ] = useState();
  const [ isLoading, setIsLoading ] = useState(true);
  const { responses } = route.params;

  const navigateBack = () => {
    navigation.navigate('Home');
  };

  useEffect(() => {
    const form = new FormData()

    form.append('calculate')
    form.append("data", JSON.stringify(responses))

    fetch('http://192.168.0.143:8000/api/app/answer.php', {
      method: "POST",
      body: form,
      redirect: 'follow'
    })
    .then((response) => response.json())
    .then((data) => {
      setResult(data);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    })
    .catch((err) => console.log(err));
  }, [])

  if (isLoading) {
    return (
      <Layout style={styles.centerInBox}>
        <Spinner size='giant' />
        <Text style={styles.waitText}>Even geduld a.u.b...</Text>
      </Layout>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title='Results are in!'
        style={{ paddingTop: 0 }}
        alignment='center'
        subtitle='Het resultaat van de stemwijzer'
      />
      <Divider/>
      <Layout style={styles.container}>
        <Text style={styles.header}>Resultaat</Text>
        {result.map((party, index) => (
          <Card style={styles.card} key={party.id} header={() => Header(`http://192.168.0.143:8000/${party.image}`, index)}>
            <Text>Je hebt <Text style={styles.percentage}>{(party.distancePercent).toFixed(2)}%</Text> gescoort bij de partij</Text>
            <Text style={styles.partyName}>{party.politicParty}</Text>
          </Card>
        ))}

      <Button onPress={navigateBack}>
        Nog een keer!
      </Button>

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
    marginTop: 30,
    fontSize: 35,
    fontWeight: 'bold',
    color: "#636363"
  },
  card: {
    marginBottom: 25,
  },
  bottomImage: {
    position: 'absolute',
    bottom: -120,
    right: -100,
    opacity: 0.2,
    zIndex: -1
  },
  cardHeader: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  partyImage: {
    width: 75,
    padding: 20,
    height: 75,
    resizeMode: 'contain'
  },
  percentage: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'blue',
  },
  numberRank: {
    marginRight: 30,
    color: '#383838',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 35,
  },
  partyName: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  centerInBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  waitText: {
    fontSize: 20,
    marginTop: 20,
  }
});
