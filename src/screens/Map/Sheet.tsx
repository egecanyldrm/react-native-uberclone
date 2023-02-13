import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { TextInput, TextInputProps } from 'react-native-paper';
import BottomSheet from '@gorhom/bottom-sheet';
import { Image, Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import axios from 'axios';
import 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { IConfigSheet, ILocation } from '../../types';


// API DOC : https://api-ninjas.com/api/city
const options = {
    headers: { 'X-Api-Key': 'hZ5NcVZn+0Ra32PltUoFeA==sRwIPWzEhauN7LBE' },
    contentType: 'application/json',
}

const rides = [
    {
        title: 'Uber-X',
        link: 'https://links.papareact.com/3pn',
        price: 99
    },
    {
        title: 'Uber-XL',
        link: 'https://links.papareact.com/5w8',
        price: 87
    },
]

const ConfigSheet = (props: IConfigSheet) => {

    const { destination, origin, setOrigin, setDestination, } = props;
    const [index, setIndex] = useState<number>(1);

    // ** States
    const [location, setLocation] = useState<ILocation[]>([])
    const [focus, setFocus] = useState<string>('')
    const [fromToValue, setFromToValue] = useState<string>('')
    const [whereToValue, setWhereToValue] = useState<string>('')

    // ** Refs 
    const fromInputRef = useRef<typeof TextInput | null>(null);
    const whereToInputRef = useRef<typeof TextInput | null>(null);

    // ** Bottom Sheet State & Ref & Handlers 
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["10%", '25%', '50%', '75%'], []);

    // ** Side Effects 
    useEffect(() => {
        Keyboard.addListener('keyboardWillShow', () => setIndex(3))
        Keyboard.addListener('keyboardWillHide', () => setIndex(2))
    }, [])

    // **  Handler Functions 
    const handleInputChange = useCallback((text: string, focus: string) => {
        if (focus === 'from') {
            if (text.length === 0) {
            } else {
                setFromToValue(text);
            }
        } else {
            setWhereToValue(text);
        }
        handleFetchLocation(text);
        setFocus(focus)
    }, [focus])

    const handleFetchLocation = useCallback(async (query: string) => {
        if (query.length < 2) return
        try {
            const request = await axios.get(`https://api.api-ninjas.com/v1/city?name=${query}`, options);
            setLocation(request.data);
        } catch (err) {
            console.log(err)
        }
    }, [])
    const handleSheetChanges = useCallback((index: number) => {
        setIndex(index)
    }, []);

    const handlePickCity = () => {
        if (focus === 'from') {
            setOrigin(location[0]);
            setFromToValue(location[0].name);
            setLocation([]);
            if (!destination && whereToInputRef) {
                // @ts-ignore
                whereToInputRef?.current?.focus()
            }
            if (destination) Keyboard.dismiss()
        }
        else {
            setDestination(location[0]);
            setWhereToValue(location[0].name);
            setLocation([]);
            if (!origin && whereToInputRef) {
                // @ts-ignore
                whereToInputRef?.current?.focus()
            }
            if (origin) Keyboard.dismiss()
        }

        setFocus('')
    };

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={index}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backgroundStyle={styles.shadow}
        >
            <TouchableWithoutFeedback className='flex-1' onPress={() => {
                if (location.length === 0) Keyboard.dismiss();
                setFocus('')
            }}>
                <View className='flex-1'>

                    <View className='pt-5 px-4 '>
                        <TextInput
                            // @ts-ignore
                            ref={fromInputRef}
                            mode='outlined'
                            activeOutlineColor='#000'
                            label='From to ?'
                            value={fromToValue}
                            onFocus={() => setFocus('from')}
                            onChangeText={(text: string) => handleInputChange(text, "from")}
                            className='mb-1'
                            right={<TextInput.Icon size={18} icon={'close'} onPress={() => {
                                setFromToValue('');
                                // @ts-ignore
                                setOrigin(undefined)
                            }} />}
                        />
                        <TextInput
                            // @ts-ignore
                            ref={whereToInputRef}
                            mode='outlined'
                            activeOutlineColor='#000'
                            label='Where to ?'
                            value={whereToValue}
                            onFocus={() => setFocus('where')}
                            onChangeText={(text: string) => handleInputChange(text, "where")}
                            right={<TextInput.Icon size={18} icon={'close'} onPress={() => {
                                setWhereToValue('');
                                // @ts-ignore
                                setDestination(undefined)
                            }} />}

                        />

                    </View>

                    <View className='px-5 mt-4 border-b border-gray-400  '>
                        {
                            location?.map((location, key) => {
                                return (
                                    <TouchableOpacity onPress={handlePickCity} key={key}  >
                                        <View className=' p-2 flex flex-row items-end gap-2'>
                                            <Ionicons name='location-outline' size={28} />
                                            <Text className=' text-xl font-bold' >{location?.name} </Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    {
                        (focus.length < 1 && origin && destination) ? (
                            <View className=' px-10'>
                                <Text className='text-center text-lg font-bold'>Select Ride</Text>
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
                                                    <Text className='font-bold text-lg'>{car.price}$</Text>
                                                </View>
                                            </TouchableOpacity>

                                        )
                                    })
                                }

                            </View>
                        ) : null
                    }

                </View>
            </TouchableWithoutFeedback>
        </BottomSheet >



    )
}

export default ConfigSheet


const styles = StyleSheet.create({
    shadow: {
        borderRadius: 45,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.53,
        shadowRadius: 13.97,
        elevation: 21,
        padding: 4
    }
})