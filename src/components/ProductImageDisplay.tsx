import React, { useEffect, useState } from 'react'
import { ProductImageDisplayProps } from '../types/Props'
import { Box, Stack } from '@mui/material'
import addIdsToList from '../helpers/addIdsToList';

export default function ProductImageDisplay(props: ProductImageDisplayProps) {
  const [images, setImages] = useState(addIdsToList(props.images));
  const [activeImage, setActiveImage] = useState(0);

  return (
    <Box display="flex" flexDirection="column">
      <Box component="img" src={images[activeImage].item} width="100%"/>
      <Stack flexDirection="row">
        {images.map((img) => (<Box component="img" src={img.item} sx={{maxWidth:150}} key={img.id}/>))}
      </Stack>
    </Box>
  )
}
