import { AppRegistry } from 'react-native';
import App from './App'; // or wherever your main component is located
import { name as appName } from './app.json'; // or wherever your app name is defined

AppRegistry.registerComponent(appName, () => App);
