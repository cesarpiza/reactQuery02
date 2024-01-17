import React, { useMemo } from 'react';
import {
    ActivityIndicator,
    SafeAreaView, Text, TouchableOpacity, View,
} from 'react-native';
import { useQuery, useQueryClient } from 'react-query';
import { styles } from './styles';
import axios from 'axios';
import QuantityInput from '../../components/quantityInput';
import ShoppingCardButton from '../../components/shoppingCardButton';
import { useNavigation } from '@react-navigation/native';

export default function Details({ route }) {

    const { goBack } = useNavigation();

    const { id } = route.params;
    // Essa é a forma de "pegar" o objeto da api com base no id.
    // const { data, isLoading } = useQuery('productDetails', () => {
    //     return axios.get(`http://192.168.0.104:8080/products/${id}`).then((response) => response.data);
    // });

    // Forma de "pegar" o objeto do cache "product" (evita requisição desnecessária).
    const queryClient = useQueryClient();

    // Obter os dados armazenados em cache com a chave 'product'
    const data = queryClient.getQueryData('product');

    const getProductDetails = useMemo(() => {
        return data.find(product => product.id === id)
    }, []);

    const { product, price } = getProductDetails;

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    goBack();
                }}
            >
                <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
            <View style={styles.prodAndPriceContainer}>
                <Text style={styles.product}>{product}</Text>
                <Text style={styles.price}>{price}</Text>
            </View>
            <View style={styles.quantAndShoppContainer}>
                <QuantityInput />
                <ShoppingCardButton id={id}
                />
            </View>
        </SafeAreaView>
    );
}