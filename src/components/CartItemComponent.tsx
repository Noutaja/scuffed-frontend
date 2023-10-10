import React from 'react'
import { CartItem, Product } from '../types/Types'
import { Box } from '@mui/material'
import CartProductInfo from './CartProductInfo'
import CartItemInfo from './CartItemInfo'

export default function CartItemComponent(props: {i: CartItem}) {
  return (
    <Box display="flex"
    flexDirection="row"
    height="fit-content"
    justifyContent="space-between"
    margin="0.5rem">
      <CartProductInfo p={props.i.product}/>
      <CartItemInfo i={props.i}/>
    </Box>
  )
}
