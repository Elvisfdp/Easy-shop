import React from 'react'
import {View, StyleSheet, Dimensions} from 'react-native'
import {Content, Left, Body, ListItem, Thumbnail, Text} from 'native-base'

var {width} = Dimensions.get('window');

const SerchedProducts = (props) => {
    const { productsFiltered } = props;
    const size = productsFiltered.length;
    return (
        <Content style={{width:width}}>
            {size > 0 ? (
                productsFiltered.map((item) => (
                    <ListItem
                        onPress={()=>{
                            props.navigation.navigate('Product Detail',{item:item})
                        }}
                        key={item._id.$oid}
                        avatar
                    >
                        <Left>
                            <Thumbnail source={{uri:item.image ? 
                                item.image: 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'}}
                            />
                        </Left>
                        <Body style={{marginLeft:70}}>
                            <Text>{item.name}</Text>
                            <Text note>{item.description}</Text>
                        </Body>
                    </ListItem>
                ))
            ) : (
                <View style={styles.center}>
                    <Text styles={{alignSelf:'center'}}>
                        No products match the selected criteria
                    </Text>
                </View>
            )}
        </Content>
    );
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SerchedProducts
