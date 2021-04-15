import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import Database from './Database';

export default function Form({route, navigation}) {
    const id = route.params ? route.params.id : undefined;
    const [descricao, setDescricao] = useState('');
    const [quantidade, setQuantidade] = useState('');

    useEffect(() => {
        if(!route.params) return;
        setDescricao(route.params.descricao);
        setQuantidade(route.params.quantidade.toString() != null ? route.params.quantidade.toString() : '');
    }, [route])

    function handleDescricaoChange(descricao) {
        setDescricao(descricao)
    }

    function handleQuantidadeChange(quantidade) {
        setQuantidade(quantidade);
    }

    async function handleButtonPress() {
        const item = {descricao, quantidade: parseInt(quantidade)};
        if(item.descricao == "") {
            Alert.alert(
                "Atenção",
                "Não é permitido a inclusão de cervejas sem descrição",
                [
                    {
                        text: "Okay",
                        onPress: () => console.log("Foi confirmado"),
                        style: "cancel"
                    },
                ],
                { cancelable: false}
            )
            return
        } else if(item.quantidade == 0 || isNaN(item.quantidade)) {
            Alert.alert(
                "Atenção",
                "Não é permitido essa quantidade informada",
                [
                    {
                        text: "Okay",
                        onPress: () => console.log("Foi confirmado"),
                        style: "cancel"
                    },
                ],
                { cancelable: false}
            )
            return
        } else {
            Database.saveItem(item, id).then(response => navigation.navigate("List", item))
        }
        
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cervejas a comprar</Text>
            <View style={styles.inputContainer}>
                <TextInput 
                onChangeText={handleDescricaoChange}
                style={styles.input}
                placeholder="Qual cerveja deseja comprar?"
                clearButtonMode="always"
                value={descricao}
                />
                <TextInput
                onChangeText={handleQuantidadeChange}
                style={styles.input}
                placeholder="Digite a quantidade"
                keyboardType={'numeric'}
                clearButtonMode="always"
                value={quantidade.toString()} />
                <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="light"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#49644F",
        alignItems: "center",
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 50,
    },
    inputContainer: {
        flex: 1,
        marginTop: 30,
        width: '90%',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 10,
        alignItems: 'stretch',
        backgroundColor: '#fff'
    },
    input: {
        marginTop: 10,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'stretch'
    },
    button: {
        marginTop: 15,
        height: 50,
        backgroundColor: '#49644F',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 25,
        shadowOpacity: 20,
        shadowColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    }
})