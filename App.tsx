import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/app/navigation/RootNavigator';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { store } from './src/app/redux/store';
import { initializeAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <SafeAreaProvider>
        <RootNavigator />
        <Toast />
      </SafeAreaProvider>
      {/* </PersistGate> */}
    </Provider>

  );
}

