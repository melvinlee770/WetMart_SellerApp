import React, { useState, useEffect, } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'
import { host } from '../common'

export default function editprofile({ route, navigation }) {

    const [editButton, seteditButton] = useState('Edited')

    const [passparamsSellerID, setpassparamsSellerID] = useState(route.params.pass_id)
    const [passparamsRating, setpassparamsRating] = useState(route.params.pass_rating)
    const [passparamsImgURL, setpassparamsImgURL] = useState(route.params.pass_imgURL)
    const [passparamsEmail, setpassparamsEmail] = useState(route.params.pass_email)
    const [passparamsStoreName, setpassparamsStoreName] = useState(route.params.pass_storeName)
    const [passparamsFirstName, setpassparamsFirstName] = useState(route.params.pass_firstName)
    const [passparamsLastName, setpassparamsLastName] = useState(route.params.pass_lastName)
    const [passparamsMobile, setpassparamsMobile] = useState(route.params.pass_mobile)
    const [passparamsAddress, setpassparamsAddress] = useState(route.params.pass_address)
    const [passparamsUnitNumber, setpassparamsUnitNumber] = useState(route.params.pass_unitNumber)
    const [passparamsDescription, setpassparamsDescription] = useState(route.params.pass_description)


    const [sellerProfileRatingInfo, setsellerProfileRatingInfo] = useState('')
    const [sellerProfilePic, setsellerProfilePic] = useState('')
    const [sellerProfileEmail, setsellerProfileEmail] = useState('')
    const [sellerProfileStoreName, setsellerProfileStoreName] = useState('')
    const [sellerProfileFirstName, setsellerProfileFirstName] = useState('')
    const [sellerProfileLastName, setsellerProfileLastName] = useState('')
    const [sellerProfileMobile, setsellerProfileMobile] = useState('')
    const [sellerProfileAddress, setsellerProfileAddress] = useState('')
    const [sellerProfileUnitNumber, setsellerProfileUnitNumber] = useState('')
    const [sellerStoreDescription, setsellerStoreDescription] = useState('')

    let email_rjx = /^([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)$/gm
    let emailisValid = email_rjx.test(sellerProfileEmail)
    let mobile_rjx = /^[0-9]{8}$/gm
    let mobileisValid = mobile_rjx.test(sellerProfileMobile)

    const Edited = () => {
        if (sellerProfileEmail.length == 0) {
            setsellerProfileEmail(sellerProfileEmail => sellerProfileEmail = passparamsEmail)
        }
        if (sellerProfileStoreName.length == 0) {
            setsellerProfileStoreName(sellerProfileStoreName => sellerProfileStoreName = passparamsStoreName)
        }
        if (sellerProfileFirstName.length == 0) {
            setsellerProfileFirstName(sellerProfileFirstName => sellerProfileFirstName = passparamsFirstName)
        }
        if (sellerProfileLastName.length == 0) {
            setsellerProfileLastName(sellerProfileLastName => sellerProfileLastName = passparamsLastName)
        }
        if (sellerProfileMobile.length == 0) {
            setsellerProfileMobile(sellerProfileMobile => sellerProfileMobile = passparamsMobile)
        }
        if (sellerProfileAddress.length == 0) {
            setsellerProfileAddress(sellerProfileAddress => sellerProfileAddress = passparamsAddress)
        }
        if (sellerProfileUnitNumber.length == 0) {
            setsellerProfileUnitNumber(sellerProfileUnitNumber => sellerProfileUnitNumber = passparamsUnitNumber)
        }
        if (sellerStoreDescription.length == 0) {
            setsellerStoreDescription(sellerStoreDescription => sellerStoreDescription = passparamsDescription)
        }
        seteditButton(editButton => editButton = "Completed")
        if (editButton == "Completed") {
            if (!emailisValid) {
                alert('Please input the proper email')
            }
            else if (!mobileisValid) {
                alert('Please input the proper mobile number')
            }
            else {
            nextEditStep()
            }
        }
        else {
            console.log('complete fill in the update')
        }
    }
    function nextEditStep() {
        const updateProfileURL = host + '/seller/update/profile?seller_id=' + passparamsSellerID
        fetch(updateProfileURL, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rating: passparamsRating,
                store_image_id: passparamsImgURL,
                email: sellerProfileEmail,
                store_name: sellerProfileStoreName,
                first_name: sellerProfileFirstName,
                last_name: sellerProfileLastName,
                mobile_number: sellerProfileMobile,
                address: sellerProfileAddress,
                unit_number: sellerProfileUnitNumber,
                store_description: sellerStoreDescription
            })
        })
            .then(response => response.json())
            .then((json) => {
                console.log(json.command)
                navigation.navigate('profileScreen')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        // <SafeAreaView >
        // <View style={{ marginTop: '10%', alignItems: 'center'}}>
        <View style={{ height: '100%' }}>
            <ScrollView style={{ marginTop: '10%' }}>
                <View>
                    <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Regular', fontSize: 20, }}>
                        Seller Rating: {passparamsRating}
                    </Text>
                </View>

                <View style={styles.eachProfileInfo}>
                    <TextInput style={[styles.eachProfileInfoText, { textAlign: 'center' }]} placeholder={passparamsEmail} value={'' + sellerProfileEmail} onChangeText={function (text) { setsellerProfileEmail(text) }} />
                </View>

                <View style={styles.eachProfileInfo}>
                    <TextInput style={[styles.eachProfileInfoText, { textAlign: 'center' }]} placeholder={passparamsStoreName} value={'' + sellerProfileStoreName} onChangeText={function (text) { setsellerProfileStoreName(text) }} />
                </View>

                <View style={styles.eachProfileInfo}>
                    <TextInput style={[styles.eachProfileInfoText, { textAlign: 'center' }]} placeholder={passparamsFirstName} value={'' + sellerProfileFirstName} onChangeText={function (text) { setsellerProfileFirstName(text) }} />
                </View>

                <View style={styles.eachProfileInfo}>
                    <TextInput style={[styles.eachProfileInfoText, { textAlign: 'center' }]} placeholder={passparamsLastName} value={'' + sellerProfileLastName} onChangeText={function (text) { setsellerProfileLastName(text) }} />
                </View>

                <View style={styles.eachProfileInfo}>
                    <TextInput style={[styles.eachProfileInfoText, { textAlign: 'center' }]} placeholder={passparamsMobile} value={'' + sellerProfileMobile} onChangeText={function (text) { setsellerProfileMobile(text) }} />
                </View>

                <View style={styles.eachProfileInfo}>
                    <TextInput style={[styles.eachProfileInfoText, { textAlign: 'center' }]} placeholder={passparamsAddress} value={'' + sellerProfileAddress} onChangeText={function (text) { setsellerProfileAddress(text) }} />
                </View>

                <View style={styles.eachProfileInfo}>
                    <TextInput style={[styles.eachProfileInfoText, { textAlign: 'center' }]} placeholder={passparamsUnitNumber} value={'' + sellerProfileUnitNumber} onChangeText={function (text) { setsellerProfileUnitNumber(text) }} />
                </View>

                <View style={styles.storeDescriptionInfo}>
                    <TextInput multiline={true} style={[styles.eachProfileInfoText, { textAlign: 'center', width: '90%', marginLeft: 'auto', marginRight: 'auto' }]} placeholder={passparamsDescription} value={'' + sellerStoreDescription} onChangeText={function (text) { setsellerStoreDescription(text) }} />
                </View>

                <View style={{ marginBottom: '5%', marginTop: '5%', borderRadius: 10, width: '80%', padding: '2%', backgroundColor: '#5A9896', marginLeft: 'auto', marginRight: 'auto', elevation: 3 }}>
                    <TouchableOpacity onPress={Edited}>
                        <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: 20, color: 'white' }}>
                            {editButton}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>

        // </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    eachProfileInfo: {
        marginTop: '3%',
        borderRadius: 10,
        width: '85%',
        backgroundColor: 'white',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 10,
        elevation: 3
    },
    storeDescriptionInfo: {
        marginTop: '3%',
        borderRadius: 10,
        width: '85%',
        height: 200,
        backgroundColor: 'white',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 10,
        elevation: 3
    },
    eachProfileInfoText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 23
    },

})