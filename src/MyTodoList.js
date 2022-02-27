import React from 'react';
import {View, TextInput, StyleSheet, Text, TouchableOpacity, Image, FlatList, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import constants from './constants';

const checkImage = require('../src/asserts/images/check.png');
const validCheckImage = require('../src/asserts/images/valid_check.png');
const crossImage = require('../src/asserts/images/close.png');
const crossBlackImage = require('../src/asserts/images/close_black.png');
const trashImage = require('../src/asserts/images/trash.png');

class MyTodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTask: '',
            taskList: [],
            showError: false,
        }
    }

    componentDidMount = async() => {
        const taskList = await AsyncStorage.getItem(constants.localStorageKey);
        const taskListData = JSON.parse(taskList);
        if(taskListData) {
            this.setState({taskList: taskListData});
        }
    }

    addNewTask = () => {
        const currentTaskList = this.state.taskList;
        if(this.state.currentTask) {
            // adding new task at the first position
            currentTaskList.unshift(this.state.currentTask)
            this.setState({taskList: this.state.taskList, currentTask: ''}, () => this.storeTask(this.state.taskList));
        } else {
            this.setState({showError: true})
        }
    }

    storeTask = async (taskList) => {
        try {
            // updating localstorage with tasklist
            await AsyncStorage.setItem(constants.localStorageKey, JSON.stringify(taskList));
        } catch (error) {
            console.log("error while saving code", error)
        }    
    }

    cancelTask = () => {
        this.setState({currentTask: ''});
    }

    deleteTask = (index) => {
        const currentTaskList = this.state.taskList;
        currentTaskList.splice(index,1);
        this.setState({taskList: this.state.taskList}, () => this.storeTask(this.state.taskList));
        
    }

    renderItem = (item,index) => {
        return(
            <View style={styles.listViewContainer}>
                <Text style={styles.taskName}>{item}</Text>
                <TouchableOpacity
                    onPress={() => this.showAlert(index)}
                    style={styles.deleteImgContainer}
                >
                    <Image 
                        source={trashImage}
                        style={styles.crossIcon} 
                    />
                </TouchableOpacity>
            </View>
        )
    }

    showAlert = (index) =>
        Alert.alert(
            `${constants.confirmationMsg} ${this.state.taskList[index]}`,
            " ",
            [
                {
                    text: constants.cancel,
                    onPress: () => null,
                },
                {
                    text: constants.ok,
                    onPress: () => this.deleteTask(index),
                },
            ]
        );


    render() {
        const {showError, taskList, currentTask} = this.state;
        
        return(
            <View style={styles.container}>
                <View style={styles.addTaskView}>
                    <TextInput
                        style={[styles.textInput, { borderColor: showError ? constants.colorCodes.tomato : constants.colorCodes.themeColor}]}
                        value={this.state.currentTask}
                        placeholder={constants.placeholder}
                        placeholderTextColor={showError ? constants.colorCodes.tomato : constants.colorCodes.themeColor}
                        onChangeText={(task) => this.setState({ currentTask: task , showError: false})}
                    />

                    <TouchableOpacity
                        onPress={() => this.addNewTask()}
                        style={[
                            styles.iconStyle,
                            { backgroundColor: (currentTask) ? constants.colorCodes.lightGreen : constants.colorCodes.snowWhite }]}
                    >
                        <Image 
                            source={currentTask ? validCheckImage : checkImage}
                            style={styles.checkIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.cancelTask()}
                        style={[
                            styles.iconStyle,
                            { backgroundColor: currentTask ? constants.colorCodes.lightRed : constants.colorCodes.snowWhite}
                        ]}
                    >
                        <Image
                            source={currentTask ? crossImage : crossBlackImage}
                            style={styles.crossIcon}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <FlatList
                        data={taskList}
                        renderItem={({item, index}) => this.renderItem(item, index)}
                    />
                </View>

            </View>
        )
    }
}

const styles  = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: constants.colorCodes.white,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        color: constants.colorCodes.themeColor,
        padding: 10,
    },
    addTaskView: {
        elevation:3,
        backgroundColor: constants.colorCodes.white,
        borderRadius: 4,
        flexDirection: 'row',
    },
    textInput: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 4,
        color: constants.colorCodes.themeColor,
        flex: 0.8,
        borderWidth: 1,
    },
    iconStyle: {
        padding: 10,
        margin: 12,
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 4,
        flex: 0.1
    },
    checkIcon: {
        width: 20,
        height: 20
    },
    crossIcon: {
        width: 16,
        height: 16
    },
    listViewContainer: {
        padding: 10,
        margin: 12,
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#e9f2fb',
        margin: 4,
        flexDirection: 'row',
        borderRadius: 8,
        elevation: 3,
        backgroundColor: constants.colorCodes.white,
    },
    taskName: {
        color: constants.colorCodes.themeColor,
        fontSize: 18,
        flex: 0.9,
        marginLeft: 4
    },
    deleteImgContainer: {
        padding: 10,
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center' 
    },
})

export default MyTodoList;