import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ItemFavorite from './ItemFavorite';
import api from './services/api'
import { useLoading } from './contexts/Loading'

export default function ListFavorite({route, navigation}) {
    const [itemsFavorite, setItemsFavorite] = useState([]);
    const {startLoading, endLoading } = useLoading() 

    useEffect(() => {
        async function loadFavorites() {
            try {
                startLoading('Carregando favoritos...')
                const response = await api.get('/api/favorites').then(response => {
                    return response
                });
                setItemsFavorite(response.data)
            } catch(e) {
                console.log(e);
            } finally {
                endLoading();
            }
        }
        loadFavorites();
    }, [route]);
    return (
        <View style={styles.container}>
            <StatusBar style="light"/>
            <Text style={styles.title}>Lista de favoritos</Text>
            <ScrollView 
            style={styles.scrollContainer}
            contentContainerStyle={styles.itemsContainer}>
                {itemsFavorite.map(item => {
                    return <ItemFavorite key={item._id} id={item.bebida._id} item={item.bebida.quantidade + ' unidades da ' + item.bebida.descricao + ' / Data entrega ' + new Date(item.bebida.dataEntrega).toLocaleDateString('pt-BR') + '/ Gelada: ' + (item.bebida.isGelada == true ? 'Sim' : 'Não') } favorite={item.bebida instanceof Object} navigation={navigation} />
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
        backgroundColor: '#ccc'
    }
})