import { StyleSheet, } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { useZustandStore } from '../../store/zustand';
import { shallow } from 'zustand/shallow'
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY: string = `${process.env.API_KEY}`;

const MapComponent = () => {

    // ** Ref
    const mapRef = useRef<MapView | null>(null)

    // ** Store 
    const { origin, destination, initalRegion } = useZustandStore(
        (state) => ({
            origin: state.origin,
            destination: state.destination,
            initalRegion: state.initalRegion
        }), shallow
    );

    // ** Side Effects 
    useEffect(() => {
        if (!origin || !destination) return

        // Zoom & Fit the markers 
        mapRef?.current?.fitToSuppliedMarkers(["origin", "destination"], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }
        })
    }, [origin, destination])


    return (
        <MapView
            ref={mapRef}
            className='flex-1'
            mapType='mutedStandard'
            showsUserLocation
            initialRegion={initalRegion}
        >
            {
                origin?.geometry ?
                    <Marker
                        coordinate={{
                            latitude: origin.geometry.location.lat,
                            longitude: origin.geometry.location.lng,
                        }}
                        title='Origin'
                        identifier='origin'

                    /> : null
            }
            {
                destination?.geometry ?
                    <Marker
                        coordinate={{
                            latitude: destination.geometry.location.lat,
                            longitude: destination.geometry.location.lng
                        }}
                        title='Destination'
                        identifier='destination'
                    /> : null
            }
            {
                (origin?.geometry && destination?.geometry) ?
                    <MapViewDirections
                        origin={{ latitude: origin?.geometry.location.lat, longitude: origin.geometry.location.lng }}
                        destination={{ latitude: destination?.geometry.location.lat, longitude: destination?.geometry.location.lng }}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor='black'
                    />
                    : null
            }
        </MapView>
    )
}

export default MapComponent

const styles = StyleSheet.create({})