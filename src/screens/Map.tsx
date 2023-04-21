import React, { useCallback, } from 'react'
import { TouchableOpacity, View, Platform, KeyboardAvoidingView } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import Step1 from './Map/Step1';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Step2 from './Map/Step2';
import MapComponent from './Map/MapComponent';


const Stack = createNativeStackNavigator();

const Map = ({ navigation }: any) => {

    // ** Handler Functions 
    const handleGoBack = useCallback(() => {
        navigation.goBack()
    }, []);

    return (
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View className='flex-1'>
                <TouchableOpacity className='absolute top-12 left-5 p-2 z-10 bg-white rounded-full shadow-sm ' onPress={handleGoBack} >
                    <Ionicons name='arrow-back-outline' size={32} />
                </TouchableOpacity>

                <View className='h-1/2'>
                    <MapComponent />
                </View>

                <View className='h-1/2'>
                    <Stack.Navigator initialRouteName='Step1' screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Step1" component={Step1} />
                        <Stack.Screen name="Step2" component={Step2} />
                    </Stack.Navigator>
                </View>
            </View >
        </KeyboardAvoidingView>
    )
}

export default Map

