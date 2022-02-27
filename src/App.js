import 'react-native-gesture-handler';
import React from 'react';
import EmptyListView from './EmptyListView';
import MyTodoList from './MyTodoList';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import constants from './constants'


const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name="EmptyListView" component={EmptyListView} />
          <Stack.Screen
            name="MyTodoList"
            options={{
              title: constants.myTodoList, 
              headerLeft: null,  
              headerStyle: {
                backgroundColor: constants.colorCodes.themeColor,
              },
              headerTintColor: constants.colorCodes.white,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
            component={MyTodoList} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
};

export default App;
