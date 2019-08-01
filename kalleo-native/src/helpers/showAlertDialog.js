import { Alert } from 'react-native';

const showAlertDialog = ({ title, message, buttons = [] }) => (
  Alert.alert(title, message, buttons)
);

export default showAlertDialog;
