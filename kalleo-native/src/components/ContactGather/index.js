// JavaScript source code
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import Contacts from 'react-native-contacts';
import PropTypes from 'prop-types';
import KalleoText from '../KalleoText';
import styles from './styles';
import KalleoFlatList from '../KalleoFlatList';

class ContactGather extends Component {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        // Set Data States
        state = {
            contact = []

        },

        componentDidMount() {
            this.getContact();
        },

        // Gather Contacts 
        getContact() {
            Contacts.getPermission((error, res) => {
                if (res === 'authorized') {
                    Contacts.getAll((err, contact) => this.setState({ contact }));

                }
            })
        },



    }
    renderItem(item, index) {
        const number = item.phoneNumber.map((val, key) => { if (key === 0) return val.number });
        return (
            <View style= {styles}>
                <KalleoText>
                    {item.givenName} {item.familyName}
                </KalleoText>
                <KalleoText> 
                    {number}
                </KalleoText>
            </View>
        )
    }
    render() {
        return (
            // Display Data as list
            <KalleoFlatList
                style={{ width: '100%' }}
                data={this.state.contacts}
                renderItem={(a) => this.renderItem(a)}
                keyExtrator={(item, index) => index.toString()}

            />
        );

    }
}

export default ContactGather