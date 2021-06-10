import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, CheckBox } from 'react-native';
import DatePicker from 'react-native-modal-datetime-picker';
import api from './services/api';

export default function Form({route, navigation}) {
    const id = route.params ? route.params._id : undefined;
    const [descricao, setDescricao] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [isSelected, setSelection] = useState(false);
    const [date, setDate] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    useEffect(() => {
        if(!route.params) return;
        setDescricao(route.params.descricao);
        setDate(route.params.dataEntrega.toString() !== null ? route.params.dataEntrega.toString() : '')
        setQuantidade(route.params.quantidade.toString() != null ? route.params.quantidade.toString() : '');
        setSelection(route.params.isGelada !== null ? route.params.isGelada : null)
    }, [route])

    function handleDescricaoChange(descricao) {
        setDescricao(descricao)
    }

    function handleQuantidadeChange(quantidade) {
        setQuantidade(quantidade);
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    
    const handleConfirm = (dateStr) => {
        var date;
        var formattedDate;

        date = new Date(dateStr);
        formattedDate = date.getFullYear() + "-" + ('0' + (date.getMonth() + 1)).slice(-2) + "-" + ('0' + date.getDate()).slice(-2)
        setDate(formattedDate)
        hideDatePicker();
      };
    async function handleButtonPress() {
        const item = {descricao, quantidade: parseInt(quantidade), dataEntrega: new Date(date), isGelada: isSelected};
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
            if(id != undefined) {
                const response = await api.put(`/api/bebidas/${id}`, item);
                if(response.status == 200) {
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
                    setDate('');
                    setDescricao('');
                    setQuantidade('');
                    setSelection(false);
                    setDatePickerVisibility(false);
                    navigation.navigate("List", item);
                }   
            } else {
                const response = await api.post('/api/bebidas', item);
                if(response.status == 200) {
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
                    navigation.navigate("List", item);
                }
            }

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
                <TextInput style={styles.input} placeholder="Informe data de entrega" onTouchStart={showDatePicker} value={date.toString()} />
                <DatePicker   
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}        />
                <CheckBox
                        value={isSelected}
                        onValueChange={setSelection}
                        style={styles.checkbox}
                        />
                <Text style={styles.buttonText}>Gelada ou Natural? {isSelected ? "👍" : "👎"}</Text>
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
        backgroundColor: '#ccc'
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
    datePicker: {
        width: '100%',
        marginTop: 15,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
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