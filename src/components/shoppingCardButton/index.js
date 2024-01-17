import React from 'react';
import {
    ActivityIndicator,
    Text,
    TouchableOpacity,
} from 'react-native';
import { styles } from './styles';
import { useMutation, useQueryClient } from 'react-query';
import { useProduct } from '../../store/useProduct';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function ShoppingCardButton(props) {

    const { goBack } = useNavigation();

    const { id } = props;

    const quantity = useProduct(state => state.quantity);

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ id }) => {
            return axios.patch(`http://192.168.0.104:8080/products/${id}`, {
                quantity: quantity,
                buy: true,
            }).then((response) => response.data);
        },
        onSuccess: (data) => {
            // Posso usasr o refetch do cache "product" ou set duretamente o cache para ter o resultado desejado.
            //queryClient.refetchQueries('product');

            queryClient.setQueryData('product', (currentData) => {
                return currentData.map((product) => product.id === data.id ? data : product)
            })
            goBack();
        },
        onError: (error) => {
            console.log(error.message);
        }
    })

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
                mutation.mutate({ id: id });
            }}
        >
            {mutation.isLoading ?
                <ActivityIndicator />
                :
                <Text style={styles.buttonText}>adicionar ao carrinho</Text>
            }
        </TouchableOpacity>
    );
}