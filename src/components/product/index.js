import React from 'react';
import {
    Button,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { useConvertCurrency } from '../../hooks/useConvertCurrency';

export default function Product(props) {

    const { navigate } = useNavigation();

    const { id, product, price, quantity, buy } = props;

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ id }) => {
            return axios.delete(`http://192.168.0.104:8080/products/${id}`).then((response) => response.data);
        },
        onSuccess: (data) => {
            // Posso usasr o refetch do cache "product" ou set duretamente o cache para ter o resultado desejado.
            queryClient.refetchQueries('product');

            // queryClient.setQueryData('product', (currentData) => {
            //     return currentData.map((product) => product.id === data.id ? data : product)
            // })
        },
        onError: (error) => {
            console.log(error.message);
        }
    });

    return (
        <TouchableOpacity
            style={[styles.button, {
                backgroundColor: buy ? 'lightgreen' : 'pink',
            }]}
            onPress={() => {
                navigate('Details', { id });
            }}
        >
            <Text style={styles.text}>produto: {product}</Text>
            <Text style={styles.text}>preço: {useConvertCurrency(price)}</Text>
            <Text style={styles.text}>quantidade: {quantity}</Text>
            <Text style={styles.text}>comprado: {buy ? 'Sim' : 'Não'}</Text>
            <TouchableOpacity
                style={styles.closedButton}
                title='X'
                onPress={() => {
                    mutation.mutate({ id: id });
                }}
            >
                <Text style={styles.closedButtonText}>
                    X
                </Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
}