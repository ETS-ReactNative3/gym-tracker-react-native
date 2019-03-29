import React, { Component } from 'react';
import { Modal, Text, View, Alert, Button, TextInput, StyleSheet } from 'react-native';

export default class TimerModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            defaultLength: 60,
            length: 60
        }

        this.countdown = this.countdown.bind(this)

    }

    countdown() {

        if (this.state.length >= 1) {
            this.setState(prevState => ({
                length: prevState.length - 1
            }))
        } else {
            this.setState({
                length: this.state.defaultLength
            })
            clearInterval(this.interval)
            this.props.setModalVisible()

        }
    }

    // componentDidMount() {
    //     this.interval = setInterval(() => this.countdown(), 1000);
    //     console.log("Timer launched", "Timer length is: ", this.state.length)

    // }

    componentWillUnmount() {
        clearInterval(this.interval);
        console.log("componentWillUnmount LAUNCHED - timer closed")
    }
    render() {
        return (
            <View style={{ marginTop: 22 }}>
                <Modal
                    onShow={() => { this.interval = setInterval(() => this.countdown(), 1000) }}
                    onDismiss={() => clearInterval(this.interval)}
                    animationType="slide"
                    transparent={false}
                    visible={this.props.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Timer modal has been closed.');
                    }}>
                    <View style={{ marginTop: 22 }}>
                        <View>
                            <Text style={styles.title}>Timer</Text>
                            <Text style={styles.number}>{this.state.length}</Text>
                            <Text style={styles.seconds}>seconds remaining</Text>

                            <View style={styles.inputLength}>
                                <TextInput keyboardType='numeric' name="timerLength" onChangeText={(e) => {
                                    clearInterval(this.interval)
                                    this.setState({
                                        length: e,
                                        defaultLength: e
                                    })
                                }} />
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button onPress={this.props.setModalVisible} title='Start' onPress={() => {
                                    clearInterval(this.interval)
                                    this.interval = setInterval(() => this.countdown(), 1000)
                                }} />
                            </View>

                            <View style={styles.buttonContainer}>
                                <Button title='Stop' onPress={() => {
    
                                    clearInterval(this.interval)
                                }} />
                            </View>

                            <View style={styles.cancel}>
                                <Button onPress={() => {
                                    this.setState({
                                        length: this.state.defaultLength
                                    })
                                    clearInterval(this.interval)
                                    this.props.setModalVisible()
                                }} title='Close' />
                            </View>


                        </View>
                    </View>
                </Modal>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    buttonContainer: {
        width: '75%',
        alignSelf: 'center',
        margin: 10,

    },
    button: {
        // width: '75%',
        alignSelf: 'center',
        marginBottom: 10,
        
    },
    cancel: {
        width: '75%',
        alignSelf: 'center',
        margin: 10,
    },
    seconds: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    number: {
        fontSize: 50,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'red'
    },
    inputLength: {
        // width: '10%',
        alignSelf: 'center',
        borderColor: 'black',
        borderBottomWidth: 1,
        // padding: '10'
    }
})