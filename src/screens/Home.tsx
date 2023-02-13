import React, { useCallback } from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

const Home = ({ navigation }: any) => {

    const handleNavigate = useCallback(() => {
        navigation.navigate('Map')
    }, [])


    return (
        <SafeAreaView className='flex-1'>
            <Image
                style={{ width: 100, height: 100, resizeMode: 'contain', marginLeft: 20 }}
                source={{ uri: 'https://links.papareact.com/gzs' }}
            />
            <View className='flex flex-row px-3'>

                <TouchableOpacity onPress={handleNavigate} className='basis-1/2 rounded-md bg-gray-400 mr-1 '>
                    <View className="flex justify-center items-center">
                        <Image
                            style={{ width: 100, height: 100, resizeMode: 'contain', marginLeft: 20 }}
                            source={{ uri: 'https://links.papareact.com/3pn' }}
                        />
                        <Text className=' font-bold text-lg my-4'>Get A Ride </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleNavigate} className='basis-1/2 rounded-md  bg-gray-400 '>
                    <View className="flex justify-center items-center">
                        <Image
                            style={{ width: 100, height: 100, resizeMode: 'contain', marginLeft: 20 }}
                            source={{ uri: 'https://links.papareact.com/28w' }}
                        />
                        <Text className=' font-bold text-lg my-4'>Order Food</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

export default Home