import { FormLabel, Input } from '@chakra-ui/react'
import React from 'react'

export default function FormInput({labelName, onChangeHandler, ...otherProps}) {
  return (
    <>
        <FormLabel mt='20px'>{labelName}</FormLabel>
        <Input {...otherProps} onChange={onChangeHandler}/>
    </>
  )
}
