import React, { useCallback, useEffect, useRef, useState } from 'react'
import { TextInput } from 'react-native-paper';
import { Alert, Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import axios from 'axios';
import 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ILocation } from '../../types';
import { shallow } from 'zustand/shallow'
import { useZustandStore } from '../../store/zustand';

const Step1 = ({ navigation }: any): JSX.Element => {

    // ** States
    const [options, setOptions] = useState<ILocation[]>([])
    const [focus, setFocus] = useState<'from' | 'where' | string>('')
    const [fromToValue, setFromToValue] = useState<string>('')
    const [whereToValue, setWhereToValue] = useState<string>('')

    // ** Refs 
    //@ts-ignore
    const whereInputRef = useRef<TextInput | null>(null)

    // ** Store
    const { origin, destination, setOrigin, setDestination } = useZustandStore(
        (state) => ({
            origin: state.origin,
            destination: state.destination,
            setOrigin: state.setOrigin,
            setDestination: state.setDestination,
        }),
        shallow
    );

    // ** Side Effects 
    useEffect(() => {
        async function navigateToStep2() {
            Keyboard.dismiss();
            await new Promise(resolve => setTimeout(resolve, 1000));
            navigation.navigate('Step2');
        }
        if (origin && destination) navigateToStep2();

    }, [origin, destination])


    // **  Handler Functions 
    const handleChangeFromInput = useCallback((text: string) => {
        setFromToValue(text);
        optimizedFn(text)
    }, [])
    const handleChangeWhereInput = useCallback((text: string) => {
        setWhereToValue(text);
        optimizedFn(text)
    }, [])

    const handleFetchLocation = useCallback(async (text: string) => {
        if (text.length < 3) return
        const query = text.trim().split(' ').join('%2C').toLocaleLowerCase();
        try {
            const request = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=name%2Cgeometry&input=${query}&inputtype=textquery&key=${process.env.API_KEY}`)
            setOptions(request.data?.candidates);
        } catch (err) {
            Alert.alert('Something went wrong', "We couldn't fetch location ")
        }
    }, [])

    const handleOptionSelect = useCallback((option: ILocation) => {
        if (focus === 'from') {
            setFromToValue(option.name);
            setOrigin(option);
            whereInputRef?.current?.focus()
        } else {
            setWhereToValue(option.name);
            setDestination(option);
        }
        setOptions([])
    }, [focus,]);

    const debounce = (func: any) => {
        let timer: any;
        return function (...args: any) {
            //@ts-ignore
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, 1500);
        };
    };
    const optimizedFn = useCallback(debounce(handleFetchLocation), []);

    return (
        <TouchableWithoutFeedback className='flex-1' onPress={Keyboard.dismiss} >
            <View className='flex-1 bg-white'>
                <Text className='text-center text-lg font-semibold my-3'>Good Morning Ege</Text>
                <View className='px-4 '>
                    <TextInput
                        label='From to ?'
                        value={fromToValue}
                        className='mb-1 bg-white'
                        onChangeText={handleChangeFromInput}
                        onFocus={() => setFocus('from')}
                        mode='outlined'
                        activeOutlineColor='#000'
                        right={fromToValue.length ?
                            <TextInput.Icon size={18} icon={'close'} onPress={() => {
                                setFromToValue('');
                                setOrigin(undefined)
                            }} /> : null
                        }
                    />
                    <TextInput
                        ref={whereInputRef}
                        className='bg-white'
                        mode='outlined'
                        activeOutlineColor='#000'
                        label='Where to ?'
                        value={whereToValue}
                        onFocus={() => setFocus('where')}
                        onChangeText={handleChangeWhereInput}
                        right={whereToValue.length ?
                            <TextInput.Icon size={18} icon={'close'} onPress={() => {
                                setWhereToValue('');
                                setDestination(undefined)
                            }} /> : null
                        }
                    />
                </View>

                <View className='pl-5 pr-3 mt-4 border-t  border-gray-300 pt-1 '>
                    {
                        options?.map((option, key) => {
                            return (
                                <TouchableOpacity key={key} onPress={() => handleOptionSelect(option)}  >
                                    <View className='flex-row gap-1 items-center border-b border-gray-200 py-2'>
                                        <Ionicons name='location-outline' size={20} />
                                        <Text className='font-bold' >{option?.name} </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Step1