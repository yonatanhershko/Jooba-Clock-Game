import React from 'react'
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity, I18nManager  } from 'react-native'
import { useTranslation } from 'react-i18next'
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
                <ScrollView style={styles.container}>
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
                </ScrollView>
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
        flexDirection: isRTL ? 'rtl' : 'ltr',
        textAlign: isRTL ? 'right' : 'left',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 10,
    },
    instructionContainer: {
        marginLeft: isRTL ? 0 : 10,
        marginRight: isRTL ? 10 : 0,
    },
    instruction: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    subInstruction: {
        marginLeft: isRTL ? 15 : 0,
        marginRight: isRTL ? 0 : 15,
        marginBottom: 5,
    },
    modalBtn: {
        backgroundColor: '#c9a7f1',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '50%',
        alignSelf: 'center',
        marginTop: 10,
    },
    modalBtnText: {
        color: 'white',
        fontSize: 16,
    },
})