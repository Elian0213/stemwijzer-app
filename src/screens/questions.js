import React, { useState, useEffect  } from 'react';
import { SafeAreaView, Image, View, StyleSheet } from 'react-native';
import { Divider, Layout, Text, TopNavigation, TopNavigationAtion, Button, Spinner } from '@ui-kitten/components';
import { BackIcon, CheckIcon, CrossIcon, MinusIcon } from './../components/icons'

export const QuestionsScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);

  const navigateBack = () => navigation.goBack();

  const answerAgree = () => navigation.goBack();

  useEffect(() => {
    fetch("http://192.168.0.143:8000/api/getQuestions.php")
    .then(response => response.json())
    .then(response => {
      setQuestions(response);
      setIsLoading(false);
    })
    .catch(error => {
      console.log(error)
    })
  }, [])

  if (isLoading) {
    return (
      <Layout style={styles.centerInBox}>
        <Spinner size='giant' />
      </Layout>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} >
      <TopNavigation
        title='Over de stemwijzer'
        style={{ paddingTop: 0 }}
        alignment='center'
      />
      <Divider/>
      <Layout style={styles.container}>
        <Text style={styles.counter}>{currentQuestion + 1} / {questions.length}</Text>

        <View style={styles.questionContainer}>
          <Text style={{ fontSize: 18}}>{questions[currentQuestion].question}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            size="giant"
            status="success"
            onPress={answerAgree}
          >Eens</Button>
          <Button
            size="giant"
            status="basic"
            onPress={answerAgree}
          >Geen mening</Button>
          <Button
            size="giant"
            status="danger"
            onPress={answerAgree}
          > Oneens</Button>
        </View>
        <Image style={styles.bottomImage} source={require('./../assets/windmill.png')} />
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  counter: {
    marginBottom: 23.76,
    marginTop: 20,
    fontSize: 35,
    fontWeight: 'bold',
    color: "#636363"
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  questionContainer: {
    maxWidth: '80%',
    marginTop: 18,
    borderColor:'black',
    borderWidth:1,
    padding: 15,
    borderRadius: 20
  },
  buttonContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 220
  },
  bottomImage: {
    position: 'absolute',
    bottom: -100,
    right: -100,
    opacity: 0.1,
    zIndex: -1
  },
  centerInBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  }
});
