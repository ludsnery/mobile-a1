import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Estrela from './assets/estrela.png';
import EstrelaVazia from './assets/estrela-vazia.png';


export default function ItemFavorite(props) {
    return (
        <View style={styles.container}>
            <View style={styles.favoriteContainer}>
                <Image source={props.favorite ? Estrela : EstrelaVazia} style={{ width: 20, height: 20}} />
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