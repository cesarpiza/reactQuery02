import { create } from "zustand";

const initialState = {
    quantity: 0,
}

export const useProduct = create(() => initialState);

export const setQuantity = (text) => useProduct.setState(() => {
    return {
        quantity: text,
    }
});

export const decreaseQuantity = () => useProduct.setState((state) => {
    return {
        quantity: state.quantity - 1,
    }
});

export const incrementQuantity = () => useProduct.setState((state) => {
    return {
        quantity: state.quantity + 1,
    }
});

export const resetQuantity = () => useProduct.setState((state) => {
    return {
        quantity: 0,
    }
});