import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../theme/todo/colors';
const Splash = () => {
    const loadingTime = useRef(Math.floor(Math.random() * 3000) + 1000);
    const navigation = useNavigation<any>();
    useEffect(() => {
        console.log("Splash Screen loading time: ", loadingTime.current);
        const timeout = setTimeout(() => {
            navigation.navigate("BottomNavigation");
        }, loadingTime.current);

        return () => clearTimeout(timeout);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <LottieView
                style={{ width: 400, height: 400 }}
                source={require('../assets/animations/splash-loading-animation.json')}
                autoPlay
                loop={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
    },
});

export default Splash;
