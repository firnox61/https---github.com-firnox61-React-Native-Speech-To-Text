/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


 import React, {Component} from 'react';
 //import 'react-native-gesture-handler';
 
 // import all the components we are going to use
 import {
   SafeAreaView,
   StyleSheet,
   Text,
   View,
   Image,
   TouchableOpacity,
   TouchableHighlight,
   ScrollView,
 } from 'react-native';


 function HomeScreen({ navigation }) {
  return (
    <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{fontSize:36, color: '#34495e'}}>SPEECH TO TEXT</Text>
      <Button
        title="Go Giriş için tıklayınız"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}


function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

function DetailsScreen() {
  const App = () => {
    const [pitch, setPitch] = useState('');
    const [error, setError] = useState('');
    const [end, setEnd] = useState('');
    const [started, setStarted] = useState('');
    const [results, setResults] = useState([]);
    const [partialResults, setPartialResults] = useState([]); 
  
    //buraya const ekleyeceğiz
  //voice fonksiyonlarına atama yapılıyor
    useEffect(() => {
      //Setting callbacks for the process status
      Voice.onSpeechStart = onSpeechStart;
      Voice.onSpeechEnd = onSpeechEnd;
      Voice.onSpeechError = onSpeechError;
      Voice.onSpeechResults = onSpeechResults;
      Voice.onSpeechPartialResults = onSpeechPartialResults;
      Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
  
      return () => {
        //Çeviri sonuçları ekranı değiştirdikten sonra işlemi yok et 
        Voice.destroy().then(Voice.removeAllListeners);
      };
    }, []);
  
    const onSpeechStart = (e) => {
      //.start() hatasız çağrıldığında çağrılır
      console.log('onSpeechStart: ', e);
      setStarted('√');
    };
  
    const onSpeechEnd = (e) => {
      //SpeechRecognizer tanımayı durdurduğunda çağrılır
      console.log('onSpeechEnd: ', e);
      setEnd('√');
    };
  
    const onSpeechError = (e) => {
      //Bir hata oluştuğunda çağrılır.
      console.log('onSpeechError: ', e);
      setError(JSON.stringify(e.error));
    };
  
    const onSpeechResults = (e) => {
      //SpeechRecognizer tanımayı bitirdiğinde çağrılır
      console.log('onSpeechResults: ', e);
      setResults(e.value);
    };
  
    const onSpeechPartialResults = (e) => {
      //Herhangi bir sonuç hesaplandığında çağrılır
      console.log('onSpeechPartialResults: ', e);
      setPartialResults(e.value);
    };
  
    const onSpeechVolumeChanged = (e) => {
      //Tanınan perde değiştiğinde çağrılır
      console.log('onSpeechVolumeChanged: ', e);
      setPitch(e.value);
    };
  
    const startRecognizing = async () => {
      //Belirli bir yerel ayar için konuşmayı dinlemeye başlar
      try {
        await Voice.start('tr-TR');
        setPitch('');
        setError('');
        setStarted('');
        setResults([]);
        setPartialResults([]);
        setEnd('');
      } catch (e) {
        //eslint-devre dışı-sonraki satır
        console.error(e);
      }
    };
  
    const stopRecognizing = async () => {
      //Konuşma için dinlemeyi durdurur
      try {
        await Voice.stop();
      } catch (e) {
        //eslint-devre dışı-sonraki satır
        console.error(e);
      }
    };
  
    const cancelRecognizing = async () => {
      //Konuşma tanımayı iptal eder
      try {
        await Voice.cancel();
      } catch (e) {
        //eslint-devre dışı-sonraki satır
        console.error(e);
      }
    };
  
    const destroyRecognizer = async () => {
      //Geçerli SpeechRecognizer örneğini yok eder
      try {
        await Voice.destroy();
        setPitch('');
        setError('');
        setStarted('');
        setResults([]);
        setPartialResults([]);
        setEnd('');
      } catch (e) {
        //eslint-disable-next-line
        console.error(e);
      }
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.titleText}>
            Speech to Text Conversion in React Native |
            Voice Recognition
          </Text>
          <Text style={styles.textStyle}>
            Press mike to start Recognition
          </Text>
          <View style={styles.headerContainer}>
            <Text style={styles.textWithSpaceStyle}>
              {`Started: ${started}`}
            </Text>
            <Text style={styles.textWithSpaceStyle}>
              {`End: ${end}`}
            </Text>
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.textWithSpaceStyle}>
              {`Pitch: \n ${pitch}`}
            </Text>
            <Text style={styles.textWithSpaceStyle}>
              {`Error: \n ${error}`}
            </Text>
          </View>
          <TouchableHighlight onPress={startRecognizing}>
            <Image
              style={styles.imageButton}
              source={{
                uri:
                  'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png',//resimi koyuyoruz
              }}
            />
          </TouchableHighlight>
          <Text style={styles.textStyle}>
            Partial Results
          </Text>
          <ScrollView>
            {partialResults.map((result, index) => {
              return (
                <Text
                  key={`partial-result-${index}`}
                  style={styles.textStyle}>
                  {result}
                </Text>
              );
            })}
          </ScrollView>
          <Text style={styles.textStyle}>
            Results
          </Text>
          <ScrollView style={{marginBottom: 42}}>
            {results.map((result, index) => {
              return (
                <Text
                  key={`result-${index}`}
                  style={styles.textStyle}>
                  {result}
                </Text>
              );
            })}
          </ScrollView>
          <View style={styles.horizontalView}>
            <TouchableHighlight
              onPress={stopRecognizing}
              style={styles.buttonStyle}>
              <Text style={styles.buttonTextStyle}>
                Stop
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={cancelRecognizing}
              style={styles.buttonStyle}>
              <Text style={styles.buttonTextStyle}>
                Cancel
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={destroyRecognizer}
              style={styles.buttonStyle}>
              <Text style={styles.buttonTextStyle}>
                Destroy
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  export default App;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      padding: 5,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
    },
    titleText: {
      fontSize: 22,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    buttonStyle: {
      flex: 1,
      justifyContent: 'center',
      marginTop: 15,
      padding: 10,
      backgroundColor: '#8ad24e',
      marginRight: 2,
      marginLeft: 2,
    },
    buttonTextStyle: {
      color: '#fff',
      textAlign: 'center',
    },
    horizontalView: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 0,
    },
    textStyle: {
      textAlign: 'center',
      padding: 12,
    },
    imageButton: {
      width: 50,
      height: 50,
    },
    textWithSpaceStyle: {
      flex: 1,
      textAlign: 'center',
      color: '#B0171F',
    },
  });
}
 
 // import Voice
 export default class App extends Component{
   render(){
     return(
       <View style={styles.bg}>
         <Text style={styles.welcome}>SPEECH TO TEXT</Text>
         <TouchableOpacity style={styles.touch} onPress={() => { this.props.navigation.navigate('sayfa1')}}>
           <Text style={styles.text}>Giriş için tıklayınız</Text>
         </TouchableOpacity>
       </View>
     );
     
   }
 }
 
 
 
 const styles = StyleSheet.create({
   bg: { flex:1, justifyContent: 'center', alignItems: 'center'},
   welcome: {fontSize:36, color: '#34495e'},
   touch:{marginTop:20, backgroundColor:'#3498db', paddingHorizontal:20, paddingVertical:10,
    borderRadius: 5},
   text: {fontSize:18, color: '#fff'}
           
 
 });
 



/*import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Hoşgeldiniz</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;*/