import React from 'react'
import { StyleSheet, Image, View, SafeAreaView} from 'react-native'



const Header = () => {
    return (
        <SafeAreaView style={styles.header}>
            <Image 
            source={require("../assets/Logo.png")}
            resizeMode="contain"
            style={{height:50, width:150}}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header:{
        width:"100%",
        flexDirection:"row",
        alignContent:"center",
        justifyContent:"center",
        padding:20
    }
})

export default Header
