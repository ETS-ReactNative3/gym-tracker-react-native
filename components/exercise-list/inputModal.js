import React, { Component } from 'react'
import { View, Text, TextInput, Button, Modal } from 'react-native'

export default class inputModal extends Component {

    render() {
        return (
            <Modal
                style={this.props.styles}
                autoFocus={true}
                visible={this.props.visible}
                onRequestClose={this.props.onRequestClose}
                closeModal={this.props.closeModal}>
                <Text>{this.props.header}</Text>

                <TextInput maxLength={this.props.maxLength} onChangeText={this.props.onChangeText} value={this.props.inputValue}></TextInput>

                <Button title={this.props.buttonText} onPress={this.props.closeModal} />

            </Modal>
        )
    }
}
