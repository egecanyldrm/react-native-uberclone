import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationProp } from '@react-navigation/native';
const rides = [
    {
        title: 'Uber-X',
        link: 'https://links.papareact.com/3pn',
        multiplier: 1
    },
    {
        title: 'Uber-XL',
        link: 'https://links.papareact.com/5w8',
        multiplier: 1.75
    },
    {
        title: 'Uber-Lux',
        link: 'https://links.papareact.com/7pf',
        multiplier: 1.75
    },
]

const Step2 = ({ navigation }: { navigation: any }) => {

    return (
        <View className='bg-white flex-1'>
            <View className='flex-row py-3 '>
                <TouchableOpacity className='mx-5' onPress={() => navigation.navigate('Step1')}>
                    <Ionicons name='arrow-back-outline' size={22} />
                </TouchableOpacity>
                <View className=' ml-20'>
                    <Text className='text-xl font-semibold'>Select A Ride </Text>
                </View>
            </View>

            <View className=' px-10'>
                {
                    rides.map((car, key) => {
                        return (
                            <TouchableOpacity className='flex-row justify-start gap-12 items-center' key={key}>
                                <View>
                                    <Image
                                        style={{ width: 100, height: 80, resizeMode: 'contain' }}
                                        source={{ uri: car.link }}
                                    />
                                </View>
                                <View className=' ml-5 '>
                                    <Text className='font-bold text-xl' >{car.title} </Text>
                                </View>
                                <View className=''>
                                    {/* <Text className='font-bold text-lg'>{car.price}$</Text> */}
                                </View>
                            </TouchableOpacity>

                        )
                    })
                }
            </View>
            <TouchableOpacity className=' bg-black py-2 mx-2 mt-5  rounded-sm '>
                <Text className='text-center text-white  text-lg'>Choose a Uber</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Step2

const styles = StyleSheet.create({})