
#include <array>
#include <vector>
#include <memory>
#include <string>
#include <string_view>
using namespace std;

class Trie {

    struct TrieNode {
        static const int ALPHABET_SIZE = 26;
        array<shared_ptr<TrieNode>, ALPHABET_SIZE> alphabet{};
        int numberOfWordsInDictionaryWithCurrentEcryption = 0;
    };

    static const int NO_WORDS_IN_DICTIONARY_WITH_CURRENT_ECRYPTION = 0;
    shared_ptr<TrieNode> root = make_shared<TrieNode>();

public:
    void addEncryptedWordToTrie(string_view encryptedWord) const {
        shared_ptr<TrieNode> current = root;
        for (const auto& letter : encryptedWord) {
                int index = letter - 'a';
                if (current->alphabet[index] == nullptr) {
                        current->alphabet[index] = make_shared<TrieNode>();
                }
                current = current->alphabet[index];
        }
        ++current->numberOfWordsInDictionaryWithCurrentEcryption;
    }

    int findNumberOfWordsInDictionaryWithCurrentEcryption(string_view encryptedWord) const {
        shared_ptr<TrieNode> current = root;

        for (const auto& letter : encryptedWord) {
                int index = letter - 'a';
                if (current->alphabet[index] == nullptr) {
                        return NO_WORDS_IN_DICTIONARY_WITH_CURRENT_ECRYPTION;
                }
                current = current->alphabet[index];
        }
        return current->numberOfWordsInDictionaryWithCurrentEcryption;
    }
};

class Encrypter {

    static const int ALPHABET_SIZE = 26;
    inline static const string NOT_POSSIBLE_TO_ENCRYPT;

    unique_ptr<Trie> trie = make_unique<Trie>();
    array <string, ALPHABET_SIZE> keyToValue{};

public:
    Encrypter(const vector<char>& keys, const vector<string>& values, const vector<string>& dictionary) {

        for (int i = 0; i < keys.size(); ++i) {
                keyToValue[keys[i] - 'a'] = values[i];
        }

        for (const auto& word : dictionary) {
                trie->addEncryptedWordToTrie(encrypt(word));
        }
    }

    string encrypt(string_view wordToEcrypt) const {
        string encryptedWord;
        for (const auto& current : wordToEcrypt) {
                if (keyToValue[current - 'a'].empty()) {
                        return NOT_POSSIBLE_TO_ENCRYPT;
                }
                encryptedWord.append(keyToValue[current - 'a']);
        }
        return encryptedWord;
    }

    int decrypt(string_view encryptedWord) const {
        return trie->findNumberOfWordsInDictionaryWithCurrentEcryption(encryptedWord);
    }
};
