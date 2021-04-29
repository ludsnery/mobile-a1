import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import Database from './Database';
import Estrela from './assets/estrela.png';
import EstrelaVazia from './assets/estrela-vazia.png';


export default function Item(props) {
    const [isFavorite, setFavorite] = useState(false);

    async function handleEditarPress() {
        const item = await Database.getItem(props.id)
        props.navigation.navigate("Form", item);
    }

    async function handleFavoritePress() {
        if(!isFavorite) {
            setFavorite(true);
            const favorite = await Database.saveFavorite(true, props.id)
        } else {
            setFavorite(false);
            const favorite = await Database.saveFavorite(false, props.id)
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
                { text: "Sim", onPress: () => {
                    Database.deleteItem(props.id)
                        .then(response => props.navigation.navigate("List", {id: props.id}))
                }}
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
        backgroundColor: '#fff',
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