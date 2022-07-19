import * as React from 'react';
/* ******NAVİGATİON KÜTÜPHANESİ SAYFALAR ARASI GEÇİŞ YAPABİLMEMİZİ SAĞLAMAKTA**/
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import sayfa1 from './sayfa1.js';

import {
  Text,
  View,
  Button,
  Image,
} from 'react-native';

// import Voice
import Voice from 'react-native-voice';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex:1, justifyContent: 'flex-start', alignItems: 'center',backgroundColor:'#f0f8ff'}}>
      <Text style={{fontSize:36,fontWeight: 'bold', color: '#1e90ff'}}>SPEECH TO TEXT</Text>
      <View style={{ flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <Image source={require('C:/Users/firno/Desktop/uygulamam/mic1.png')} />
      <Button
        title="Giriş için tıklayınız"
        onPress={() => navigation.navigate('Records')}
      />
      </View>
    </View>
  );
}



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Records" component={sayfa1} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;



