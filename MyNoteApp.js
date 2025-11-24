import { StatusBar } from 'expo-status-bar';
// 1. ADDED TextInput
// 2. Removed ScrollView
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity, TextInput, Alert,Keyboard } from 'react-native'; 
import React, { useState } from 'react';
import { dismiss } from 'react-native/types_generated/Libraries/LogBox/Data/LogBoxData';

// REMOVED: import { ScrollView } from 'react-native/types_generated/index';

export default function App() {
  const [mynotes, setNotes] = useState([
    { note: 'Buy Milk', key: '1' },
    { note: 'Call John', key: '2' },
    { note: 'Groceries', key: '3' },
    { note: 'Another Note', key: '4' },
  ]);

  const [noteText, setNoteText] = useState('');

  const pressHandler = (key) => {
    setNotes((prevNotes) => {
      return prevNotes.filter(note => note.key !== key);
    });
  };

  const addButton = () => {
  if (noteText.trim().length > 2) {
    setNotes(prevNotes => [
      ...prevNotes,
      { note: noteText, key: Math.random().toString() }
    ]);
    setNoteText('');
  } else {
    Alert.alert('Oops', 'Note is too short', [{ text: 'Understood' }]);
  }
};

  const renderItem = ({ item }) => (
    // REMOVED: ScrollView usage inside TouchableOpacity
    <TouchableOpacity onPress={() => pressHandler(item.key)} style={styles.item}>
      <Text style={styles.itemNote}>{item.note}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>My Notes</Text>
      </View>

      {/* Input and Button Container */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a note"
          value={noteText}
          onChangeText={setNoteText}
        />
        <Button 
          title="Add" 
          onPress={addButton} 
          color="orange" // Added color for visual appeal
          disabled={!noteText.trim()} // Disable button if input is empty
        />
      </View>

      {/* FlatList Container */}
      <View style={styles.container}>
        <FlatList
          numColumns={2}
          data={mynotes}
          keyExtractor={(item) => item.key}
          renderItem={renderItem}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

// ... (Styles remain the same)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeece9ff',
        padding: 10,
    },
    headerContainer: {
        backgroundColor: 'orange',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15,
    },
    headerText: {
        color: 'white',
        fontFamily: 'serif',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 20,
    },
    item: {
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 8,
        backgroundColor: '#fff',
        borderRadius: 6,
        flex: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        minHeight: 80,
        justifyContent: 'center',
    },
    
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    input: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 8,
        marginRight: 10,
        borderRadius: 5,
    },
    itemNote: {
        fontSize: 16,
        color: '#333',
    },
});