import React from 'react'
import { StyleSheet } from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay'

const Loading = ({ loading, message }) => {
    return loading ? (
                <Spinner
                    visible={loading}
                    textContent={message}
                    textStyle={styles.spinnerTextStyle}
                />
    ) : null
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      paddingTop: 30,
      backgroundColor: '#000',
      padding: 8,
    },
    spinnerTextStyle: {
      color: '#000',
    },
  });

export default Loading