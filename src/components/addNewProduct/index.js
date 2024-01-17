import React, { useReducer } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { styles } from './styles';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

export default function AddNewProduct() {

    const actions = {
        setProduct: 'setProduct',
        setPrice: 'setPrice',
        resetField: 'resetField',
    }

    function reducer(state, action) {
        switch (action.type) {
            case actions.setProduct:
                return {
                    ...state,
                    product: action.text,
                }
            case actions.setPrice:
                return {
                    ...state,
                    price: action.text,
                }
            case actions.resetField:
                return {
                    product: '',
                    price: '',
                }
            default:
                return {
                    ...state
                }
        }
    }

    const [state, dispatch] = useReducer(reducer, {
        product: '',
        price: '',
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ }) => {
            const getProduct = queryClient.getQueriesData('product')
            const lastId = getProduct[0][1][getProduct[0][1].length - 1].id;

            return axios.post(`http://192.168.0.104:8080/products`, {
                userId: 1,
                id: String(Number(lastId) + 1),
                product: state.product,
                quantity: 0,
                price: Number(state.price),
                buy: false
            }).then((response) => response.data);
        },
        onSuccess: (data) => {
            dispatch({ type: actions.resetField });
            // queryClient.refetchQueries('product');

            queryClient.setQueryData('product', (currentData) => {
                return [...currentData, { ...data }]
            })
        },
        onError: (error) => {
            console.log(error);
        }
    });

    return (
        <View style={styles.container}>
            <Text style={styles.label}>produto: </Text>
            <TextInput
                style={styles.textInput}
                value={state.product}
                onChangeText={text => dispatch({ type: actions.setProduct, text: text })}
            />
            <Text style={styles.label}>price: </Text>
            <TextInput
                style={styles.textInput}
                value={String(state.price)}
                onChangeText={text => dispatch({ type: actions.setPrice, text: text })}
            />
            <Button
                title='Adicionar a Lista'
                onPress={() => {
                    mutation.mutate({})
                }}
            />
        </View>
    );
}