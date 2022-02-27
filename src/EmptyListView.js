import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import constants from './constants';

const width = Dimensions.get('window').width;
const addImg = require("./asserts/images/plus.png");

class EmptyListView extends React.Component {
    componentDidMount = async() => {
        const taskList = await AsyncStorage.getItem(constants.localStorageKey);
        const taskListData = JSON.parse(taskList);
        if(taskListData?.length) {
            this.props.navigation.navigate("MyTodoList");
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.text}>{constants.noList}</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("MyTodoList")} style={styles.button} >
                    <View style={ styles.plusIconContainer}>
                        <Image
                            source={addImg}
                            style={styles.plusIcon}
                        />
                    </View>
                    <Text style={styles.addNewListtext}>{constants.addNewList}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: constants.colorCodes.white,
    },
    button: {
        padding: 20,
        backgroundColor: constants.colorCodes.white,
        borderColor: constants.colorCodes.themeColor,
        borderWidth: 2,
        borderStyle: 'dotted',
        borderRadius: 0.5,
        width: width - 50,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addNewListtext: {
        color: constants.colorCodes.themeColor,
        fontSize: 20,
    },
    plusIcon: {
        width: 20, 
        height: 20
    },
    plusIconContainer: {
        backgroundColor: constants.colorCodes.lightThemeColor,
        width: 50, 
        height: 50, 
        borderRadius: 5, 
        alignItems:'center',
        justifyContent: 'center'
    },
    text: {
        color: constants.colorCodes.themeColor,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    }
})

export default EmptyListView;