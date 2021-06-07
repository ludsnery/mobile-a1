import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Item from './Item';
import api from './services/api'
export default function List({route, navigation}) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function loadBebidas() {
            try {
                const response = await api.get('/api/bebidas');
                setItems(response.data)
            } catch(e) {
                console.log(e);
            }
        }
        loadBebidas();
    }, [route]);
    return (
        <View style={styles.container}>
            <StatusBar style="light"/>
            <Text style={styles.title}>Lista de cervejas</Text>
            <ScrollView 
            style={styles.scrollContainer}
            contentContainerStyle={styles.itemsContainer}>
                {items.map(item => {
                    return <Item key={item._id} id={item._id} item={item.quantidade + ' unidades da ' + item.descricao + ' / Data entrega ' + new Date(item.dataEntrega).toLocaleDateString('pt-BR') + '/ Gelada: ' + (item.isGelada == true ? 'Sim' : 'Não') } navigation={navigation} />
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