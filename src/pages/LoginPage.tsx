import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LoginForm from '../components/LoginForm'
import { useAppSelector } from '../hooks/useAppSelector'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const currentUser = useAppSelector((state) => state.usersReducer.currentUser);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    if(currentUser){
      console.log("AAAAAA",currentUser)
      navigate("/")
    }
  }, [currentUser])
  
  return (
    <Box component="main" display="flex" alignItems="center" flexDirection="column">
      <LoginForm/>
    </Box>
  )
}
