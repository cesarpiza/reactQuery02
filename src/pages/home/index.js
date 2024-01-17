import React, { useCallback } from 'react';
import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    Text,
    TouchableOpacity,
} from 'react-native';
import { styles } from './styles';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import Product from '../../components/product';
import AddNewProduct from '../../components/addNewProduct';
import { useFocusEffect } from '@react-navigation/native';
import { resetQuantity } from '../../store/useProduct';

export default function Home() {

    const { data, isLoading } = useQuery('product', () => {
        return axios.get('http://192.168.0.104:8080/products').then((response) => response.data)
    });

    useFocusEffect(
        useCallback(() => {
            resetQuantity();
        }, [])
    )

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ?
                <ActivityIndicator />
                :
                <>
                    <AddNewProduct />
                    <FlatList
                        contentContainerStyle={{
                            marginHorizontal: 10,
                            marginVertical: 5,
                        }}
                        style={{
                            width: '100%',
                        }}
                        data={data}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                            return <Product {...item} />
                        }}
                    />
                </>
            }
        </SafeAreaView>
    );
}