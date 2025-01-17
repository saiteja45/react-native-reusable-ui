import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';

type AutocompleteTextInputProps = {
  suggestions: string[]; // List of suggestions
  placeholder?: string; // Placeholder for the input field
  onSelect: (value: string) => void; // Callback when a suggestion is selected
  displayMode?: 'dropdown' | 'modal'; // Display style (dropdown or modal)
};

const AutocompleteTextInput: React.FC<AutocompleteTextInputProps> = ({
  suggestions,
  placeholder = 'Type something...',
  onSelect,
  displayMode = 'dropdown',
}) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleInputChange = (text: string) => {
    setInputValue(text);

    // Filter suggestions based on input
    if (text) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSelectSuggestion = (value: string) => {
    setInputValue(value);
    setFilteredSuggestions([]);
    setModalVisible(false);
    onSelect(value);
  };

  return (
    <View style={styles.container}>
      {/* Input Field */}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={inputValue}
        onChangeText={handleInputChange}
      />

      {/* Dropdown Mode */}
      {displayMode === 'dropdown' && filteredSuggestions.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            data={filteredSuggestions}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelectSuggestion(item)}
                style={styles.suggestionItem}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* Modal Mode */}
      {displayMode === 'modal' && (
        <>
          {filteredSuggestions.length > 0 && (
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.openModalButton}
            >
              <Text style={styles.modalButtonText}>Show Suggestions</Text>
            </TouchableOpacity>
          )}
          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <FlatList
                  data={filteredSuggestions}
                  keyExtractor={(item, index) => `${item}-${index}`}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => handleSelectSuggestion(item)}
                      style={styles.suggestionItem}
                    >
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeModalButton}
                >
                  <Text style={styles.modalButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  dropdown: {
    maxHeight: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 3,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  openModalButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    elevation: 5,
  },
  closeModalButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ff4d4d',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AutocompleteTextInput;
