import React from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native'
import trophy from '../assets/imgs/trophy.png'
import { useTranslation } from 'react-i18next'

export default function AnswerModal({ isVisible, correctTime, isCorrect, onClose }) {
    const { t } = useTranslation()

    return (
        <Modal
            transparent={true}
            visible={isVisible}
            animationType="slide"
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{isCorrect ? t('modal.correctTitle') : t('modal.incorrectTitle')}</Text>
                    {!isCorrect && (
                        <Text style={styles.modalText}>{t('modal.correctTimeText', { correctTime })}</Text>
                    )}
                    <Image source={trophy} style={styles.trophy} />

                    <TouchableOpacity onPress={onClose} style={styles.modalBtn}>
                        <Text style={styles.modalBtnText}>{t('modal.closeBtn')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    trophy: {
        height: 150,
        width: 150,
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
    },
    modalBtn: {
        backgroundColor: '#8779a7',
        padding: 10,
        width: 100,
        borderRadius: 5,
        alignItems: 'center',

    },
    modalBtnText: {
        color: 'white',
        fontSize: 16,
        alignItems: 'center',

    },
})
