import React, { useCallback, useEffect, useState } from 'react'
import { TouchableOpacity, View, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps'
import Ionicons from '@expo/vector-icons/Ionicons';
import ConfigSheet from './Sheet';
import { ILocation, IRegion, IUserLocation } from '../../types';
import * as Location from 'expo-location';
import * as Linking from 'expo-linking';


const Map = ({ navigation }: any) => {


    // ** States
    const [origin, setOrigin] = useState<ILocation | undefined>(undefined)
    const [destination, setDestination] = useState<undefined | ILocation>(undefined)
    const [userLocation, setUserLocation] = useState<IUserLocation | undefined>()
    const [region, setRegion] = useState<IRegion>({
        latitude: 37.785834,
        longitude: -122.406417,
        latitudeDelta: 0.20,
        longitudeDelta: 0.02,
    });
    // ** Handler Functions 
    const handleGoBack = useCallback(() => {
        navigation.goBack()
    }, []);

    const handleGetLocationPermission = useCallback(async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access location was denied')
                Linking.openSettings();
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setUserLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude })
            return location
        } catch (e: any) {
            throw new Error(e)
        }
    }, [])
    // ** Side Effects 
    useEffect(() => {
        handleGetLocationPermission()
    }, [])
    useEffect(() => {
        if (origin) setRegion({ ...region, latitude: origin.latitude, longitude: origin.longitude })

    }, [origin])
    useEffect(() => {
        if (destination) setRegion({ ...region, latitude: destination.latitude, longitude: destination.longitude, latitudeDelta: 2.23 })

    }, [destination])


    return (
        <View className='flex-1'>
            <TouchableOpacity className='absolute top-12 left-5 p-2 z-10 bg-white rounded-full shadow-sm ' onPress={handleGoBack} >
                <Ionicons name='arrow-back-outline' size={32} />
            </TouchableOpacity>
            <MapView className='flex-1' mapType='mutedStandard' showsUserLocation showsMyLocationButton
                region={region}
                onRegionChange={data => console.log(data)}
            >
                {origin ? <Marker
                    coordinate={{
                        latitude: origin.latitude,
                        longitude: origin.longitude,
                    }}
                    title='Origin'
                    description='Origin Description'
                    identifier='origin'

                /> : null
                }
                {
                    destination ? <Marker
                        coordinate={{
                            latitude: destination.latitude,
                            longitude: destination.longitude
                        }}
                        title='Destination'
                        description='Destination Description'
                        identifier='Destination'
                    /> : null
                }
                {
                    destination && origin ? <Polyline
                        coordinates={[
                            {
                                latitude: origin?.latitude,
                                longitude: origin?.longitude,
                            },
                            {
                                latitude: destination?.latitude,
                                longitude: destination?.longitude
                            }
                        ]}
                        strokeColor='black'
                        strokeWidth={3}
                    /> : null
                }
            </MapView>

            <ConfigSheet
                origin={origin}
                destination={destination}
                setOrigin={setOrigin}
                setDestination={setDestination}
            />
        </View>
    )
}

export default Map

