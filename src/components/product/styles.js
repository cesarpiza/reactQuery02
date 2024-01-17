import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    button: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 30,
        backgroundColor: 'pink',
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        textTransform: 'capitalize',
        fontWeight: 'bold',
    },
    closedButton: {
        backgroundColor: 'darkred',
        padding: 5,
        position: 'absolute',
        top: 10,
        right: 10,
    },
    closedButtonText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
    }
});