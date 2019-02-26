import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { TextInput, Button, Modal, Portal } from 'react-native-paper';

export default class inputModal extends Component {

    render() {
        const style = {
            container: {
                backgroundColor: 'white',
                width: 300,
                alignSelf: 'center',
                padding: 20,
                borderRadius: 10
            },
            button: {
                marginTop: 10
            }
            
        }
        return (
            <Portal>
                <Modal
                    contentContainerStyle={style.container}
                    autoFocus={true}
                    visible={this.props.visible}
                    onRequestClose={this.props.onRequestClose}
                    onDismiss={this.props.closeModal}>
                    <TextInput label={this.props.header} mode={'outlined'} maxLength={this.props.maxLength} onChangeText={this.props.onChangeText} value={this.props.inputValue}></TextInput>

                    <Button style={style.button} mode="contained" onPress={this.props.closeModal}>{this.props.buttonText}</Button>
                </Modal>
            </Portal>
        )
    }
}
