/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {LogBox} from 'react-native';
import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  BridgeServer,
  respond,
  start,
  stop,
} from 'react-native-http-bridge-refurbished';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

function App(): JSX.Element {
  const [lastCalled, setLastCalled] = useState<number | undefined>();

  useEffect(() => {
    const server = new BridgeServer('http_service', true);
    server.get('/', async (req, res) => {
      // do something
      setLastCalled(Date.now());
      return {message: 'OK'}; // or res.json({message: 'OK'});
    });
    server.listen(3000);

    return () => {
      server.stop();
    };
  }, []);

  return (
    <SafeAreaView>
      <Text>
        {lastCalled === undefined
          ? 'Request webserver to change text'
          : 'Called at ' + new Date(lastCalled).toLocaleString()}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
