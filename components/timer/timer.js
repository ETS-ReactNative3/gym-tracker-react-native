import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, Alert, Button, TextInput, StyleSheet} from 'react-native';

export default class ModalExample extends Component {
    state = {
        timerLength: 60
    }

    render() {
        return (
            <View style={{ marginTop: 22 }}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.props.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{ marginTop: 22 }}>
                        <View>
                            <Text>Countdown</Text>
                            <Text>{this.state.timerLength} secs</Text>
                            <TextInput keyboardType='numeric' name="timerLength" onChangeText={(e) => {
                                this.setState({
                                    timerLength: e
                                })
                            }} />
                            <Button onPress={this.props.setModalVisible} title='Cancel' style={styles.btnCancel} />
                              
                            
                        </View>
                    </View>
                </Modal>

                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    btnCancel: {
        width: '75%'
    }
})