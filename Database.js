import AsyncStorage from '@react-native-community/async-storage';

async function saveItem(item, id) {
    item.id = id ? id : new Date().getTime();
    const savedItems = await getItems();

    if(id) {
        const index = await savedItems.findIndex(item => item.id === id)
        savedItems[index] = item
    } else {
        savedItems.push(item)
    }
    return await AsyncStorage.setItem('items', JSON.stringify(savedItems))
}

async function saveFavorite(favorite, id) {
    const savedItems = await getItems();
    if(id) {
        const index = await savedItems.findIndex(item => item.id === id)
        let item = {...savedItems[index], favorite: favorite}
        savedItems[index] = item
    }
    return await AsyncStorage.setItem('items', JSON.stringify(savedItems))
}

function getItems() {
    return AsyncStorage.getItem('items')
            .then(response => {
                if(response) 
                    return Promise.resolve(JSON.parse(response));
                else 
                    return Promise.resolve([])
            })
}

function getItemsFavorite() {
    return AsyncStorage.getItem('items')
            .then(response => {
                if(response) {
                    let result = JSON.parse(response);
                    let arrayItem = result.filter((item) => item.favorite == true);
                    return Promise.resolve(arrayItem);
                }
                else 
                    return Promise.resolve([])
            })
}

async function getItem(id) {
    const savedItems = await getItems();
    return savedItems.find(item => item.id === id)
}

async function deleteItem(id) {
    const savedItems = await getItems();
    const index = await savedItems.findIndex(item => item.id === id);
    savedItems.splice(index, 1)
    return AsyncStorage.setItem('items', JSON.stringify(savedItems));
}
module.exports = {
    saveItem,
    getItems,
    getItem,
    deleteItem,
    saveFavorite,
    getItemsFavorite
}