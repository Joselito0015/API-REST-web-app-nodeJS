import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import SwitchRow from './SwitchRow';

const MarginedTextInput = ({ margin, characterLimit }) => {

  const [text, setText] = useState('');
  const [linesWithMargins, setLinesWithMargins] = useState([]);

  useEffect(() => {
    // Dividir el texto en líneas con el margen dado
    const lines = text.match(new RegExp(`.{1,${margin}}`, 'g')) || [];
    setLinesWithMargins(lines);
  }, [text, margin]);

  const handleTextChange = (newText) => {
    if (newText.length <= characterLimit) {
      setText(newText);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textMargin}>Correción</Text>
      <TextInput
        style={styles.textInput}
        multiline={true}
        placeholder="Detalla la correción..."
        onChangeText={handleTextChange}
        value={text}
      />
      <SwitchRow></SwitchRow>
    </View>

  

  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  textMargin: {
    marginRight: 8, // Espacio entre el texto y el margen derecho
    marginBottom: 8, // Espacio entre las líneas de texto
  },
  textInput: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

export default MarginedTextInput;