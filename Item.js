import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import Estrela from './assets/estrela.png';
import EstrelaVazia from './assets/estrela-vazia.png';
import api from './services/api'
import { useLoading } from './contexts/Loading'


export default function Item(props) {
    const [isFavorite, setFavorite] = useState(false);
    const {startLoading, endLoading } = useLoading() 

    async function handleEditarPress() {
        startLoading('Atualizando bebidas...')
        const response = await api.get('/api/bebidas/'+ props.id);
        if(response.status == 200) {
            endLoading();
            props.navigation.navigate("Form", response.data)
        }
    }

    async function handleFavoritePress() {
        if(!isFavorite) {
            const item = { bebida: props.id }
            startLoading('Atualizando favoritos...')

            const response = await api.post('/api/favorites', item);
            if(response.status == 200) {
                setFavorite(true);
                endLoading();
                Alert.alert(
                    "Atenção",
                    "Dados salvos com sucesso",
                    [
                        {
                            text: "Okay",
                            onPress: () => console.log("Foi confirmado"),
                            style: "cancel"
                        },
                    ],
                    { cancelable: false}
                )
                props.navigation.navigate("ListFavorite", item)

            }
        } else {
            startLoading('Removendo dos favoritos...')
            const response = await api.delete('/api/favorites/' + props.id );
            if(response.status == 200) {
                setFavorite(false);
                endLoading();
                Alert.alert(
                    "Atenção",
                    "Dados salvos com sucesso",
                    [
                        {
                            text: "Okay",
                            onPress: () => console.log("Foi confirmado"),
                            style: "cancel"
                        },
                    ],
                    { cancelable: false}
                )
                props.navigation.navigate("ListFavorite", {id: props.id})
            }
        }
    }

    function handleDeletePress() {
        Alert.alert(
            "Atenção",
            "Você tem certeza que quer parar de beber?",
            [
                {
                    text: "Não",
                    onPress: () => console.log("Foi cancelado"),
                    style: "cancel"
                },
                { text: "Sim", onPress: async () => {
                    const response = await api.delete('/api/bebidas/'+ props.id);
                    if(response.status == 200) {
                        Alert.alert(
                            "Atenção",
                            "Dados excluido com sucesso",
                            [
                                {
                                    text: "Okay",
                                    onPress: () => console.log("Foi confirmado"),
                                    style: "cancel"
                                },
                            ],
                            { cancelable: false}
                        )
                        props.navigation.navigate("List", {id: props.id})
                    }
                }
                
            }
            ],
            { cancelable: false}
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.favoriteContainer}>
                <TouchableOpacity onPressIn={handleFavoritePress}> 
                    <Image source={isFavorite ? Estrela : EstrelaVazia} style={{ width: 20, height: 20}} />
                </TouchableOpacity>
            </View>

            <Text>{props.item}</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePress}>
                    <Text style={styles.buttonText}>X</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.editButton} onPress={handleEditarPress}>
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ccc',
        width: '100%'
    },
    buttonsContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        paddingBottom: 10,
        marginTop: 10,
    },
    editButton: {
        marginLeft: 10,
        height: 40,
        backgroundColor: '#49644F',
        borderRadius: 10,
        padding: 10,
        fontSize: 12,
        elevation: 15,
        shadowOpacity: 10,
        shadowColor: '#ccc',
        alignItems: 'center'
    },
    deleteButton: {
        marginLeft: 10,
        height: 40,
        width: 40,
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 10,
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 10,
        shadowColor: '#ccc',
        alignItems: 'center'
    },
    favoriteContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    textItem: {
        fontSize: 20,
    }
    
})