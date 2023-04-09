import React, { useCallback, useEffect } from 'react'
import { Alert, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as Location from 'expo-location';
import * as Linking from 'expo-linking';
import { useZustandStore } from '../store/zustand';
import { shallow } from 'zustand/shallow'

const Home = ({ navigation }: any) => {

    // ** Store 
    const { initalRegion, setInitalRegion } = useZustandStore(
        (state) => ({ initalRegion: state.initalRegion, setInitalRegion: state.setInitalRegion }),
        shallow
    )

    // ** Side Effects 
    useEffect(() => {
        handleGetLocationPermission();
    }, [])

    // ** Handler Functions 
    const handleNavigate = useCallback(() => {
        //  Get permission before go to map screen
        if (!initalRegion) {
            handleGetLocationPermission()
            return
        }
        navigation.navigate('Map')
    }, [initalRegion])

    const handleGetLocationPermission = useCallback(async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission was denied', 'Permission to access location was denied', [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'Go to settings', onPress: () => Linking.openSettings() },
                ]);
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            if (location) {
                setInitalRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05
                })
            }
            return location
        } catch (e: any) {
            Alert.alert('We accoured an error when get permission')
        }
    }, []);


    return (
        <SafeAreaView className='flex-1'>
            <Image style={styles.image} source={{ uri: 'https://links.papareact.com/gzs' }} />
            <View className='flex flex-row px-3'>

                <TouchableOpacity onPress={handleNavigate} className='basis-1/2 rounded-md bg-gray-400 mr-1 '>
                    <View className="flex justify-center items-center">
                        <Image style={styles.image} source={{ uri: 'https://links.papareact.com/3pn' }} />
                        <Text className=' font-bold text-lg my-4'>Get A Ride </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleNavigate} className='basis-1/2 rounded-md  bg-gray-400 '>
                    <View className="flex justify-center items-center">
                        <Image style={styles.image} source={{ uri: 'https://links.papareact.com/28w' }} />
                        <Text className=' font-bold text-lg my-4'>Order Food</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginLeft: 20
    }
})