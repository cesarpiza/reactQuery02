import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    button: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    prodAndPriceContainer: {
        justifyContent: 'space-between',
        marginTop: 100,
        alignItems: 'center',
    },
    quantAndShoppContainer: {
        rowGap: 30,
    },
    product: {
        fontSize: 44,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    price: {
        fontSize: 34,
        color: 'darkgreen',
    }
});