import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import List from './List';
import Form from './Form';
import ListFavorite from './ListFavorite';

const { Navigator, Screen } = createBottomTabNavigator();


function Tab() {
    return (
        <NavigationContainer>
            <Navigator tabBarOptions={{
                style: {
                    elevation: 0,
                    shadowOpacity: 0,
                    height: 50,
                },
                tabStyle: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                labelStyle: {
                    fontSize: 12,
                    marginLeft: 5,
                },
                inactiveBackgroundColor: '#fafafc',
                activeBackgroundColor: '#ebebf5',
                inactiveTintColor: '#c1bccc',
                activeTintColor: '#32264d',
            }}>
                <Screen name="Form" component={Form}  options={{
                    tabBarLabel: "Adicionar Cerveja"
                }}/>
                <Screen name="List" component={List} options={{
                    tabBarLabel: "Cervejas"
                }}/>
                <Screen name="ListFavorite" component={ListFavorite} options={{
                    tabBarLabel: "Listar favoritos"
                }}/>
            </Navigator>
        </NavigationContainer>
    );
}

export default Tab