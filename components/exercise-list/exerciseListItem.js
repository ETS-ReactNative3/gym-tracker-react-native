import React from 'react'
import { Text, View, StyleSheet, TouchableNativeFeedback } from 'react-native'
import {Button, Card, Title, Avatar, Icon} from 'react-native-paper'

const ExerciseListItem = (props) => {

    return (
        <TouchableNativeFeedback onPress={props.onPress} onLongPress={props.onLongPress}>
            <Card style={[styles.container, props.buttonSelected]} >
                <Card.Title style={styles.items} title={props.exerciseName} left={(props) => <Avatar.Icon {...props} icon={'fitness-center'} />} />

            </Card>
        </TouchableNativeFeedback>
    )

}

const styles = StyleSheet.create({
    items: {
        flex: 1,
        justifyContent: 'flex-start',
        alignSelf: 'center',
        width: '95%',
        padding: 20,
        fontSize: 20,
        textAlign: 'center',
        color: 'black',


    },
    container: {
        margin: 10,
        

    }
});

export default ExerciseListItem