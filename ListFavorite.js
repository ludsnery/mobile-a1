import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ItemFavorite from './ItemFavorite';

export default function ListFavorite({route, navigation}) {
    const [itemsFavorite, setItemsFavorite] = useState([]);
    useEffect(() => {
        // Database.getItemsFavorite().then(items => setItemsFavorite(items));
    }, [itemsFavorite]);
    return (
        <View style={styles.container}>
            <StatusBar style="light"/>
            <Text style={styles.title}>Lista de favoritos</Text>
            <ScrollView 
            style={styles.scrollContainer}
            contentContainerStyle={styles.itemsContainer}>
                {itemsFavorite.map(item => {
                    return <ItemFavorite key={item.id} id={item.id} item={item.quantidade + ' unidades da ' + item.descricao + ' / Data entrega ' + item.date + '/ Gelada: ' + (item.isGelada == true ? 'Sim' : 'Não') } favorite={item.favorite} navigation={navigation} />
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