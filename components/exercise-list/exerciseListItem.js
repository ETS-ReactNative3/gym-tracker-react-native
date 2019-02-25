import React from 'react'
import { Text, View, StyleSheet, TouchableNativeFeedback } from 'react-native'

const ExerciseListItem = ( props ) => {

    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <View style={[styles.container, props.buttonSelected]}>
                <Text style={styles.items}>{props.exerciseName}</Text>
            </View>
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
        color:'black',
       

    },
    container: {
        marginBottom: 10,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 2,
       
    }
});

export default ExerciseListItem