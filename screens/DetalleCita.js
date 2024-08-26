import { Text, StyleSheet, View } from 'react-native'
import React, { useState, useEffect} from 'react'
import { useRoute } from '@react-navigation/native';

export default function DetalleCita()  {
  const route= useRoute();
  const {item}= route.params;
    return (
      <View>
        <Text>{item.detalle}</Text>
      </View>
    )
  
}

const styles = StyleSheet.create({})