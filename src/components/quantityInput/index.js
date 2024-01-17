import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { FontAwesome } from '@expo/vector-icons';
import {
    useProduct,
    setQuantity,
    decreaseQuantity,
    incrementQuantity,
} from '../../store/useProduct';

export default function QuantityInput() {

    const quantity = useProduct(state => state.quantity);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={decreaseQuantity}
            >
                <FontAwesome name="minus-circle" size={28} color={'darkorange'} />
            </TouchableOpacity>
            <TextInput
                style={styles.textInput}
                value={String(quantity)}
                onChangeText={text => setQuantity(text)}
            />
            <TouchableOpacity
                onPress={incrementQuantity}
            >
                <FontAwesome name="plus-circle" size={28} color='darkorange' />
            </TouchableOpacity>
        </View>
    );
}