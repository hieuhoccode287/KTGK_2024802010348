import { View, Text } from 'react-native'
import React from 'react'
import firestore from '@react-native-firebase/firestore'
import { List } from 'react-native-paper'

const Jobs = ({id,title,complete}) => {

  return (
    <List.Item
        title={title}
    >

    </List.Item>
  )
}

export default Jobs;