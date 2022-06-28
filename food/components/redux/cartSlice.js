import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: "cart",
  initialState:{
        products: [],
        quantity: 0,
        total:0
  },
  reducers:{
         addProduct:(state,action) => {
            //    console.log('print state inside action');
            //  console.log(state);
              state.products.push(action.payload);
              state.quantity += 1;
              state.total += action.payload.price * action.payload.quantity;

        },
        reset: (state) => {
          // console.log('reset is running');
          state.products=[];
          state.quantity = 0;
          state.total = 0;
          },
  },
});

export const {addProduct,reset} = cartSlice.actions;
export default cartSlice.reducer;

