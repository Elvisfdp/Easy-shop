import React,{useState,useEffect} from 'react';
import { View, StyleSheet,ActivityIndicator,ScrollView, Dimensions } from 'react-native'
import { Container, Header, Icon, Item, Input, Text } from 'native-base'

import ProductList from './ProductList';
import SerchedProducts from './SerchedProducts';
import Banner from '../../Shared/Banner';
import CategoryFilter from './CategoryFilter';


const data = require('../../assets/data/products.json');
const productsCategories = require('../../assets/data/categories.json');
var {heigth,width} = Dimensions.get('window');

const ProductContainer = (props) => {

    const [products,setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState();
    const [productsCtg,setProductsCtg] = useState([]);
    const [categories, setCategories] = useState([]);
    const [active, setActive] = useState();
    const [initialState, setInitialState] = useState([]);

    useEffect(()=>{
        setProducts(data);
        setProductsFiltered(data);
        setFocus(false);
        setCategories(productsCategories);
        setProductsCtg(data);
        setActive(-1);
        setInitialState(data);

        return () => {
            setProducts([]);
            setProductsFiltered([]);
            setFocus();
            setCategories([]);
            setActive();
            setInitialState();
        }
    },[]);

    const searchProducts = (text) => {
        setProductsFiltered(
            products.filter((i)=> i.name.toLowerCase().includes(text.toLowerCase()))
        )
    }

    const openList = () => {
        setFocus(true);

    }

    const onBlur = () => {
        setFocus(false);
    }

    //Categories
    const changeCtg = (ctg) =>{
        {
            ctg === 'all'
                ? [setProductsCtg(initialState),setActive(true)]
                : [
                    setProductsCtg(
                        products.filter((i) =>i.category.$oid === ctg),
                        setActive(true)
                    )
                ]
        }
    }
    
    return (
        <Container>
            <Header searchBar rounded>
                <Item>
                    <Icon  name="ios-search"/>
                    <Input 
                        placehorlder="Search"
                        onFocus={openList}
                        onChangeText={(text)=> searchProducts(text)}
                    />
                    {focus == true ? (
                        <Icon onPress={onBlur} name="ios-close"/>
                    ):null}
                </Item>
            </Header>
            {focus == true ? (
                <SerchedProducts 
                    navigation={props.navigation}
                    productsFiltered={productsFiltered}
                />
            ) : (
                <ScrollView>
                    <View style={styles.container}>
                        <View style={{ width: width}}>
                            <Banner style={{ width: width}}/>
                        </View>
                        <View>
                            <CategoryFilter
                                categories={categories}
                                categoryFilter={changeCtg} 
                                setProductsCtg={productsCtg}
                                active={active}
                                setActive={setActive}
                            />
                        </View>
                        {productsCtg.length > 0 ? (
                            <View style={styles.listContainer}>
                                {productsCtg.map((item)=>{
                                    return(
                                        <ProductList
                                            navigation={props.navigation}
                                            key={item._id.$oid}
                                            item={item}
                                        />
                                    );
                                })}
                            </View>
                        ):(
                            <View style={[styles.center , {heigth:heigth / 2}]}>
                                <Text>No products Found</Text>
                            </View>
                        )}
                        
                    </View>
                </ScrollView>
            )}
             
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
      flexWrap: "wrap",
      backgroundColor: "gainsboro",
    },
    listContainer: {
      heigth: heigth,
      flex: 1,
      flexDirection: "row",
      alignItems: "flex-start",
      flexWrap: "wrap",
      backgroundColor: "gainsboro",
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
  });

export default ProductContainer
