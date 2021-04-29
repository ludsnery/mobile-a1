import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import Database from './Database';
import Estrela from './assets/estrela.png';
import EstrelaVazia from './assets/estrela-vazia.png';


export default function ItemFavorite(props) {
    const [isFavorite, setFavorite] = useState(props.favorite);

    async function handleFavoritePress() {
        if(!isFavorite) {
            setFavorite(true);
            const favorite = await Database.saveFavorite(true, props.id)

        } else {
            setFavorite(false);
            const favorite = await Database.saveFavorite(false, props.id)
        }
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.favoriteContainer}>
                <TouchableOpacity onPressIn={handleFavoritePress}> 
                    <Image source={isFavorite ? Estrela : EstrelaVazia} style={{ width: 20, height: 20}} />
                </TouchableOpacity>
            </View>

            <Text>{props.item}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: '100%'
    },
    favoriteContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
    },
    textItem: {
        fontSize: 20,
    }
    
})