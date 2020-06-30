import React, { FC } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";
import { ButtonWorker } from "./components/ButtonWorker/ButtonWorker";
import { WorkCallback } from "./components/ButtonWorker/ButtonWorkerProps";

const STORAGE_KEY = "RANDOM_VALUE";

export const App: FC = () => {

    async function setValue(done: WorkCallback) {
        const randomNumber = Math.random();

        try {
            await EncryptedStorage.setItem(STORAGE_KEY, JSON.stringify(randomNumber));
            Alert.alert(`The value ${randomNumber} was succesfully saved!`);
        }

        catch (error) {
            Alert.alert(`The value ${randomNumber} could not be saved - ${error}`);
        }

        finally {
            done();
        }
    }

    async function getValue(done: WorkCallback) {
        try {
            const savedNumber = await EncryptedStorage.getItem(STORAGE_KEY);

            if (savedNumber) {
                Alert.alert(`The value ${savedNumber} was succesfully retrieved!`);
            }

            else {
                Alert.alert(`There is currently no value being stored, hit the save button to start!`);
            }
        }

        catch (error) {
            Alert.alert(`The value with key ${STORAGE_KEY} could not be retrieved - ${error}`);
        }

        finally {
            done();
        }
    }

    async function removeValue(done: WorkCallback) {
        try {
            await EncryptedStorage.removeItem(STORAGE_KEY);
            Alert.alert(`The value with key ${STORAGE_KEY} was succesfully deleted`);
        }

        catch (error) {
            Alert.alert(`The value with key ${STORAGE_KEY} could not be deleted - ${error}`);
        }

        finally {
            done();
        }
    }

    async function clearValues(done: WorkCallback) {
        try {
            await EncryptedStorage.clear();
            Alert.alert("The storage has been successfully cleared");
        }

        catch (error) {
            Alert.alert(`The storage could not be cleared - ${error}`);
        }

        finally {
            done();
        }
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <Text style={styles.title}>
                Welcome to the Example app!
            </Text>

            <View style={styles.buttons}>
                <ButtonWorker title="Save random value" onPress={setValue} />

                <ButtonWorker title="Get saved value" onPress={getValue} />

                <ButtonWorker title="Remove saved value" onPress={removeValue} />

                <ButtonWorker title="Clear storage" onPress={clearValues} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "center"
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginVertical: 30,
        textAlign: "center",
        marginHorizontal: 15
    },
    buttons: {

    }
});