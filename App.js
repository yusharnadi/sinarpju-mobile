import React from 'react';
import Home from './src/screens/Home';

import {NativeBaseProvider} from 'native-base';
import Login from './src/screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Laporan from './src/screens/Laporan';
import Peta from './src/screens/Peta';
import Berita from './src/screens/Berita';
import Lapor from './src/screens/Lapor';
import LaporanDetail from './src/screens/LaporanDetail';
import Saran from './src/screens/Saran';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    //
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            headerStyle: {backgroundColor: '#1e3a8a'},
            headerTintColor: '#fff',
          }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="Laporan"
            component={Laporan}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="LaporanDetail"
            component={LaporanDetail}
            options={{headerShown: true, title: 'Detail Laporan'}}
          />
          <Stack.Screen
            name="Berita"
            component={Berita}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="Lapor"
            component={Lapor}
            options={{title: 'Buat Laporan', headerShown: true}}
          />
          <Stack.Screen
            name="Saran"
            component={Saran}
            options={{title: 'Masukan & Saran', headerShown: true}}
          />
          <Stack.Screen
            name="Peta"
            component={Peta}
            options={{title: 'PETA PJU', headerShown: true}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
