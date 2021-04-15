import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Database from './Database';
import Item from './Item';

export default function List({route, navigation}) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        Database.getItems().then(items => setItems(items));
    }, [route]);
    return (
        <View style={styles.container}>
            <StatusBar style="light"/>
            <Text style={styles.title}>Lista de cervejas</Text>
            <ScrollView 
            style={styles.scrollContainer}
            contentContainerStyle={styles.itemsContainer}>
                {items.map(item => {
                    return <Item key={item.id} id={item.id} item={item.quantidade + ' da ' + item.descricao } navigation={navigation} />
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#49644F",
        alignItems: "center",
        justifyContent: 'center'
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 20,
    },
    scrollContainer: {
        flex: 1,
        width: '90%'
    },
    itemsContainer: {
        flex: 1,
        marginTop: 10,
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'stretch',
        backgroundColor: '#fff'
    }
})