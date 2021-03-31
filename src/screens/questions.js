import React, { useState, useEffect  } from 'react';
import { SafeAreaView, Image, View, StyleSheet } from 'react-native';
import { Divider, Layout, Text, TopNavigation, TopNavigationAction, Button, Spinner  } from '@ui-kitten/components';
import { BackIcon, LeftIcon, RightIcon } from './../components/icons'
import ProgressBar from './../components/progressbar';

export const QuestionsScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [responses, setResponse] = useState([]);

  const [inPreviousState, setPreviousState] = useState(false);

  const answerAgree = () => navigation.goBack();

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()}/>
  );

  useEffect(() => {
    fetch("http://192.168.0.143:8000/api/app/questions.php?all")
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

  const getCurrentAnswer = () => {
    if (responses.find(x => x.id === currentQuestion) !== undefined) {
      return responses.find(x => x.id === currentQuestion).answer;
    }

    return true;
  };

  const checkPreviousState = (newState) => {
    if (responses.find(x => x.id === newState) === undefined && !responses[currentQuestion]?.answer) {
      setPreviousState(false);
    } else {
      setPreviousState(true);
    }
  }

  const respond = (response) => {
    if (responses.find(x => x.id === currentQuestion) === undefined) {
      setResponse([...responses, {
        id: currentQuestion,
        answer: response
      }]);

      nextOrDone([...responses, {
        id: currentQuestion,
        answer: response
      }]);
    } else {
      // Re-answer a already answered question
      const index = responses.findIndex(x => x.id === currentQuestion);

      let temp = responses;

      temp[index] = {
        id: currentQuestion,
        answer: response
      };

      setResponse(temp);
      nextOrDone(temp);
    }
  }

  const nextOrDone = (currentResponses) => {
    if (lastQuestion()) {
      if (currentResponses.length == questions.length || responses.length == questions.length) {
        const finalData = currentResponses.map((response) => {
          response.id += 1;
          return response;
        });

        // Navigate to results with the response data.
        navigation.navigate('Results', {
          responses: finalData,
        });
      } else {
        alert('Je hebt nog niet elke vraag beantwoord!')
      }
    } else {
      checkPreviousState(currentQuestion + 1)

      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const questionNavigator = (action) => {
    if (action === 'previous' && currentQuestion !== 0) {
      setCurrentQuestion(currentQuestion - 1)
      checkPreviousState(currentQuestion - 1);
    } else if (action === 'next' && !lastQuestion()) {
      setCurrentQuestion(currentQuestion + 1)

      checkPreviousState(currentQuestion + 1)
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
        title='Stemwijzer vragenlijst'
        subtitle={`Je zit op vraag ${currentQuestion +1 }/${questions.length}`}
        style={{ paddingTop: 0 }}
        alignment='center'
        accessoryLeft={BackAction}
      />
      <Divider/>
      <Layout style={styles.container}>
        <View style={styles.quizHeader}>
          <Button accessoryRight={currentQuestion === 0 ? null : LeftIcon} onPress={() => questionNavigator('previous')} appearance="ghost" status='basic'></Button>
          <Text style={styles.counter}>{currentQuestion + 1} / {questions.length}</Text>
          <Button accessoryRight={lastQuestion() ? null : RightIcon} onPress={() => questionNavigator('next')} appearance="ghost" status='basic'></Button>
        </View>
        <ProgressBar totalQuestions={questions.length} currentQuestion={currentQuestion} />
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{questions[currentQuestion].question}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            size="giant"
            status="success"
            appearance={ inPreviousState ? getCurrentAnswer() == true ? 'filled' : 'outline' : 'filled'}
            onPress={() => respond(true)}
          >Eens</Button>
          <Button
            size="giant"
            status="basic"
            appearance={ inPreviousState ? getCurrentAnswer() == undefined ? 'filled' : 'outline' : 'filled'}
            onPress={() => respond(undefined)}
          >Geen mening</Button>
          <Button
            size="giant"
            status="danger"
            appearance={ inPreviousState ? getCurrentAnswer() == false ? 'filled' : 'outline' : 'filled'}
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
    height: 120,
  },
  questionText: {
    fontSize: 18,
    borderColor:'black',
    borderWidth:1,
    padding: 15,
    borderRadius: 20,
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
