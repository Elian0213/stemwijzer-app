import React, { useState, useEffect  } from 'react';
import { SafeAreaView, Image, View, StyleSheet } from 'react-native';
import { Divider, Layout, Text, TopNavigation, TopNavigationAtion, Button, Spinner, Icon } from '@ui-kitten/components';
import { BackIcon, CheckIcon, CrossIcon, MinusIcon } from './../components/icons'
import { act } from 'react-test-renderer';

const LeftIcon = (props) => (
  <Icon {...props} name='arrow-back-outline'/>
);

const RightIcon = (props) => (
  <Icon {...props} name='arrow-forward-outline'/>
);

export const QuestionsScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [responses, setResponse] = useState([]);

  const navigateBack = () => navigation.goBack();

  const answerAgree = () => navigation.goBack();

  useEffect(() => {
    fetch("http://192.168.1.100:8000/api/getQuestions.php")
    .then(response => response.json())
    .then(response => {
      setQuestions(response);
      setIsLoading(false);
    })
    .catch(error => {
      console.log(error)
    })
  }, []);

  const lastQuestion = () => currentQuestion == (questions.length - 1);

  const respond = (response) => {
    if (responses.find(x => x.id === currentQuestion) === undefined) {
      setResponse([...responses, {
        id: currentQuestion,
        answer: response
      }]);
    } else {
      // Re-answer a already answered question
      const index = responses.findIndex(x => x.id === currentQuestion);
      let temp = responses;

      temp[index].answer = response;

      setResponse(temp);
    }

    if (lastQuestion()) {
      alert('finish')
      console.log(responses)
    } else {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const questionNavigator = (action) => {
    if (action === 'previous' && currentQuestion !== 0) {
      setCurrentQuestion(currentQuestion - 1)
    } else if (action === 'next' && !lastQuestion()) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

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
        <View style={styles.quizHeader}>
          <Button accessoryRight={currentQuestion === 0 ? null : LeftIcon} onPress={() => questionNavigator('previous')} appearance="ghost" status='basic'></Button>
          <Text style={styles.counter}>{currentQuestion + 1} / {questions.length}</Text>
          <Button accessoryRight={lastQuestion() ? null : RightIcon} onPress={() => questionNavigator('next')} appearance="ghost" status='basic'></Button>
        </View>
        <View style={styles.questionContainer}>
          <Text style={{ fontSize: 18}}>{questions[currentQuestion].question}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            size="giant"
            status="success"
            onPress={() => respond(true)}
          >Eens</Button>
          <Button
            size="giant"
            status="basic"
            onPress={() => respond(undefined)}
          >Geen mening</Button>
          <Button
            size="giant"
            status="danger"
            onPress={() => respond(false)}
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
  },
  quizHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%'
  }
});
