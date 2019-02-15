import React from 'react'
import { Text, View, StyleSheet, TouchableNativeFeedback } from 'react-native'

const ExerciseListItem = ( props ) => {

    return (
        <TouchableNativeFeedback onPress={props.pressMe}>
            <View>
                <Text style={styles.items} >{props.exerciseName}</Text>
            </View>
        </TouchableNativeFeedback>
    )

}
const styles = StyleSheet.create({
    items: {
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        width: '100%',
        padding: 20,
        fontSize: 20,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 2,
        margin: 10,

    },
    imageBox: {
        height: 200,
        width: 200,
        backgroundColor: 'black',
        marginTop: 20
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'black'
    },
    reps: {
        margin: 0,
        padding: 0,
        flexWrap: 'nowrap',
    },

    buttonRow: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'space-evenly'

    },

});

export default ExerciseListItem