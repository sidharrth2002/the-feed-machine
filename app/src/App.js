import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/700.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import BuildFilterScreen from './screens/BuildFilterScreen';
import { ChakraProvider } from '@chakra-ui/react';
import EditFilterScreen from './screens/EditFilterScreen';
import FilterScreen from './screens/FilterScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import { Provider } from 'react-redux';
// import { ColorModeSwitcher } from './ColorModeSwitcher';
import SplashScreen from './screens/SplashScreen';
import TimingScreen from './screens/GeneralTimingScreen';
import TopicTimingScreen from './screens/TopicTimingScreen';
import store from './app/store';
import theme from './theme';

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <Switch>
            <Route path="/" component={SplashScreen} exact />
            <Route path="/home" component={HomeScreen} exact />
            <Route path="/profile" component={ProfileScreen} exact />
            <Route path="/filters" component={FilterScreen} exact />
            <Route path="/timing/:topic" component={TopicTimingScreen} exact />
            <Route path="/timing" component={TimingScreen} exact />
            <Route path="/build-topic" component={BuildFilterScreen} exact />
            <Route
              path="/edit-topic/:topic"
              component={EditFilterScreen}
              exact
            />
          </Switch>
        </ChakraProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
