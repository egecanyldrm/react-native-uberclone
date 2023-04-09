import React, { useCallback, useRef, useState } from 'react'
import { TextInput, TextInputProps } from 'react-native-paper';
import { Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import axios from 'axios';
import 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { IOption } from '../../types';
import { shallow } from 'zustand/shallow'
import { useZustandStore } from '../../store/zustand';

const Step1 = ({ navigation }: any): JSX.Element => {

    // ** States
    const [options, setOptions] = useState<IOption[]>([])
    const [focus, setFocus] = useState<'from' | 'where' | string>('')
    const [fromToValue, setFromToValue] = useState<string>('')
    const [whereToValue, setWhereToValue] = useState<string>('')

    // ** Refs 
    //@ts-ignore
    const whereInputRef = useRef<TextInput | null>(null)


    // ** Store
    const { setOrigin, setDestination } = useZustandStore(
        (state) => ({ setOrigin: state.setOrigin, setDestination: state.setDestination, }),
        shallow
    )

    // **  Handler Functions 
    const handleChangeFromInput = useCallback((text: string) => {
        setFromToValue(text);
        handleFetchLocation(text);
    }, [])
    const handleChangeWhereInput = useCallback((text: string) => {
        setWhereToValue(text);
        handleFetchLocation(text);
    }, [])

    const handleFetchLocation = useCallback(async (text: string) => {
        if (text.length < 3) return
        const query = text.trim().split(' ').join('%2C')
        try {
            const request = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=name%2Cgeometry&input=${query}&inputtype=textquery&key=${process.env.API_KEY}`)
            setOptions(request.data?.candidates);
        } catch (err) {
            console.log(err)
        }
    }, [])
    const handleOptionSelect = useCallback((option: IOption) => {
        if (focus === 'from') {
            setFromToValue(option.name);
            setOrigin(option.geometry.location);
            whereInputRef?.current?.focus()
        } else {
            setWhereToValue(option.name);
            setDestination(option.geometry.location);
            if (fromToValue) navigation.navigate('Step2')

        }
        setOptions([])
    }, [focus, fromToValue]);

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
                            <TextInput.Icon size={18} icon={'close'} onPress={() => { setFromToValue(''); }} />
                            : null
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
                        right={whereToValue.length ? <TextInput.Icon size={18} icon={'close'} onPress={() => {
                            setWhereToValue('');
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
                                        <Text className='  font-bold' >{option?.name} </Text>
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