
import React, {useState, useEffect} from 'react';
//useState state bir değişken tanımlar ve değişkeni adıyla çağırmamıza olanak sağlar.
//fonksiyonel componentler kullanıldığı için useeffect kullanıldı
// gerekli araçları import ettim
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';


// voice kütüphanemizi import ettik
import Voice from 'react-native-voice';
//import App from './App';
//kullanacağım araçları set ettim
const App = () => {
  const [pitch, setPitch] = useState('');
  const [error, setError] = useState('');//dinleme anında problem yaşandı
  const [end, setEnd] = useState('');//dinleme işlemi bitti
  const [started, setStarted] = useState('');//dinlemenin başladığı
  const [results, setResults] = useState([]);//sonucun veren kısım
  const [partialResults, setPartialResults] = useState([]); //kısmi sonçları girdiğim yer


  //buraya const ekleyeceğiz
 //voice fonksiyonlarına atama yapılıyor
  useEffect(() => {
    //voice için kullanacağımız fonksiyonları oluşturuyoruz
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
//************* START-END   ************************************** */
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
//*************** ERROR  ************************************ */
  const onSpeechError = (e) => {
    //Bir hata oluştuğunda çağrılır.
    console.log('onSpeechError: ', e);
    setError(JSON.stringify(e.error));
  };
//************** RESULTS  *********************************** */
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
//********************************************************* */
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
      setResults([]);//
      setPartialResults([]);
      //setEnd('');
    } catch (e) {
      //eslint-devre dışı-sonraki satır
      console.error(e);
    }
  };
//***************  STOP-CANCEL-CLEAR  ****************** */
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
          Speech to Text 
        </Text>
        <Text style={styles.textStyle}>
        Press to microphone
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
            
             source={require('C:/Users/firno/Desktop/uygulamam/mic3.png')}
            
            //   uri:
            //     'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png',//resimi koyuyoruz
            // }}
          />
        </TouchableHighlight>
        <Text style={styles.textStyle}>
          Sonuç:
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
          Kısmi Sonuçlar:
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
              Clear
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
    backgroundColor:'#f0f8ff'
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
    color:'#34495e',
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#34495e',
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
    color:'#34495e'
  },
  imageButton: {
    width: 50,
    height: 50,
  },
  textWithSpaceStyle: {
    flex: 1,
    textAlign: 'center',
    color: '#34495e',
  },
});
