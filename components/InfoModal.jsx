import React from 'react'
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity, I18nManager, Image } from 'react-native'
import { useTranslation } from 'react-i18next'
import airplane from '../assets/imgs/airplane1.png'
import plant from '../assets/imgs/plant1.png'

const isRTL = I18nManager.isRTL

export default function InfoModal({ isVisible, onClose }) {
    const { t } = useTranslation()

    return (
        <Modal
            transparent={true}
            visible={isVisible}
            animationType="slide"
        >
            <View style={styles.modalContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>{t('infoModal.welcomeTitle')}</Text>

                    <Text style={styles.sectionTitle}>{t('infoModal.howToPlay')}</Text>
                    <View style={styles.instructionContainer}>
                        <Text style={styles.instruction}>{t('infoModal.pickLocation')} 🌍</Text>
                        <Text style={styles.subInstruction}> {t('infoModal.searchOrRandom')}</Text>

                        <Text style={styles.instruction}>{t('infoModal.guessTime')} ⏰</Text>
                        <Text style={styles.subInstruction}>{t('infoModal.enterTime')}</Text>

                        <Text style={styles.instruction}>{t('infoModal.submitAndSee')} 🕵️‍♂️</Text>
                        <Text style={styles.subInstruction}> {t('infoModal.hitOk')}</Text>

                        <Text style={styles.instruction}>{t('infoModal.trackWins')} 🏆</Text>
                        <Text style={styles.subInstruction}>{t('infoModal.viewGuesses')}</Text>
                    </View>
                    <TouchableOpacity onPress={onClose} style={styles.modalBtn}>
                        <Text style={styles.modalBtnText}>{t('modal.closeBtn')}</Text>
                    </TouchableOpacity>
                    <Image source={airplane} style={styles.airplane} />
                    <Image source={plant} style={styles.plant} />

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
    container: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '85%',
        maxHeight: '57%',
        textAlign: 'center',
        position: 'relative',
    },
    airplane: {
        position: 'absolute',
        top: -8,
        right: -40,
        height: 160,
        width: 160,
        zIndex: -1,
    },
    plant: {
        position: 'absolute',
        bottom: -1,
        left: -32,
        height: 120,
        width: 120,
        zIndex: -1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 10,
        textAlign: 'center',
    },
    instructionContainer: {
        marginLeft: isRTL ? 0 : 10,
        marginRight: isRTL ? 10 : 0,
    },
    instruction: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
    },
    subInstruction: {
        marginLeft: isRTL ? 15 : 0,
        marginRight: isRTL ? 0 : 15,
        marginBottom: 5,
        textAlign: 'center',
    },
    modalBtn: {
        backgroundColor: '#c9a7f1',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: 100,
        alignSelf: 'center',
        marginTop: 10,
    },
    modalBtnText: {
        color: 'white',
        fontSize: 16,
    },
})