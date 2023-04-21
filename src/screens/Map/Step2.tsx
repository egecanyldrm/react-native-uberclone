import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { useZustandStore } from '../../store/zustand';
import { shallow } from 'zustand/shallow';
import { IJourneyInfo } from '../../types';
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
    // ** States 
    const [selected, setSelected] = useState<string | undefined>();
    const [journeyInfo, setJourneyInfo] = useState<IJourneyInfo>();

    const { origin, destination } = useZustandStore(
        (state) => ({ origin: state.origin, destination: state.destination }), shallow)

    useEffect(() => {
        const handleCalculateDistance = async (origin: string, destination: string) => {
            const originQuery = origin.trim().split(' ').join('%2C')
            const destinationQuery = destination.trim().split(' ').join('%2C')
            try {
                const response = await axios.post(`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destinationQuery}&origins=${originQuery}&units=imperial&key=${process.env.API_KEY}`)
                const { status, ...journeyDetails } = response.data.rows[0]?.elements[0];
                setJourneyInfo(journeyDetails);
            } catch (error) {
                console.log(error)
            }
        }
        if (origin?.name && destination?.name) {
            handleCalculateDistance(origin.name, destination.name);
        }
    }, [])
    return (
        <View className='bg-white flex-1 h-full'>
            <View className='flex-row py-3'>
                <TouchableOpacity className='mx-5' onPress={() => navigation.navigate('Step1')}>
                    <Ionicons name='arrow-back-outline' size={22} />
                </TouchableOpacity>
                <View className=' ml-12'>
                    <Text className='text-lg text-center font-semibold'>Select A Ride {journeyInfo?.distance?.text}</Text>
                </View>
            </View>

            <View>
                {
                    rides.map((car, key) => {
                        return (
                            <TouchableOpacity
                                className={`flex-row items-center px-5 ${selected === key.toString() ? 'bg-gray-200' : undefined} `}
                                key={key}
                                onPress={() => setSelected(key.toString())}
                            >
                                <View className=' basis-3/12'>
                                    <Image style={styles.image} source={{ uri: car.link }} />
                                </View>
                                <View className='basis-7/12'>
                                    <Text className='font-bold text-xl' >{car.title} </Text>
                                    <Text className='  text-md' >{journeyInfo?.duration?.text} Travel Time  </Text>
                                </View>
                                <View className='basis-2/12'>
                                    <Text className=' font-medium text-md'>{((car.multiplier * (journeyInfo?.duration?.value ?? 0)) / 100).toFixed(2)}$</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            <TouchableOpacity className={`bg-black py-2 mx-2 mt-5  rounded-sm  `}>
                <Text className='text-center text-white  text-lg'>Choose a Uber</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Step2

const styles = StyleSheet.create({
    image: {
        width: 75,
        height: 80,
        resizeMode: 'contain'
    }
})