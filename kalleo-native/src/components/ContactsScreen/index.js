import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Contacts, { getContactById } from 'react-native-contacts';
import PropTypes from 'prop-types';
import KalleoText from '../KalleoText';
import KalleoHeader from '../KalleoHeader';
import styles from './styles';
import ContactsGather from 'C:\Users\Jacob\kalleo\kalleo-master\kalleo-native\src\components\ContactsGather';


@connect(mapStateToProps)
class ContactsScreen extends Component {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        outgoingCallPhoneNumber: PropTypes.string,
    }

    static defaultProps = {
        outgoingCallPhoneNumber: '',
      }
    
    onPress = async () => (
        placeOutgoingCall({ phoneNumber: this.props.outgoingCallPhoneNumber, ...this.props })
    )

    getContact(){
        Contacts.addContact
    
    }
        

    render = () => {
        return (
            <View style={styles}>
                <KalleoHeader>
                    <KalleoText>Contacts: </KalleoText>
                    <View style={styles.Contacts}>
                    </View>
                    <ContactsGather />
                </KalleoHeader>
            </View>
        );
    }
}

export default ContactsScreen