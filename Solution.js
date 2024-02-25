
class Encrypter {

    static NOT_POSSIBLE_TO_ENCRYPT = "";

    /**
     * @param {character[]} keys
     * @param {string[]} values
     * @param {string[]} dictionary
     */
    constructor(keys, values, dictionary) {
        this.trie = new Trie();
        this.keyToValue = new Array(StringUtility.ALPHABET_SIZE).fill(null);

        for (let i = 0; i < keys.length; ++i) {
            let index = keys[i].codePointAt(0) - StringUtility.ASCII_SMALL_CASE_A;
            this.keyToValue[index] = values[i];
        }

        for (let word of dictionary) {
            this.trie.addEncryptedWordToTrie(this.encrypt(word));
        }
    }

    /**
     * @param {string} wordToEcrypt
     * @return {string} 
     */
    encrypt(wordToEcrypt) {
        const encryptedWord = new Array().fill(null);

        for (let i = 0; i < wordToEcrypt.length; ++i) {
            let index = wordToEcrypt.codePointAt(i) - StringUtility.ASCII_SMALL_CASE_A;
            if (this.keyToValue[index] === null) {
                return Encrypter.NOT_POSSIBLE_TO_ENCRYPT;
            }
            encryptedWord.push(this.keyToValue[index]);
        }
        return encryptedWord.join('');
    }

    /**
     * @param {string} encryptedWord
     * @return {number} 
     */
    decrypt(encryptedWord) {
        return this.trie.findNumberOfWordsInDictionaryWithCurrentEcryption(encryptedWord);
    }
}
class StringUtility {
    static ALPHABET_SIZE = 26;
    static ASCII_SMALL_CASE_A = 97;
}

class TrieNode {
    alphabet = new Array(StringUtility.ALPHABET_SIZE).fill(null);
    numberOfWordsInDictionaryWithCurrentEcryption = 0;
}

class Trie {

    static NO_WORDS_IN_DICTIONARY_WITH_CURRENT_ECRYPTION = 0;
    root = new TrieNode();

    /**
     * @param {string} encryptedWord
     * @return {void} 
     */
    addEncryptedWordToTrie(encryptedWord) {
        let current = this.root;

        for (let i = 0; i < encryptedWord.length; ++i) {
            let index = encryptedWord.codePointAt(i) - StringUtility.ASCII_SMALL_CASE_A;
            if (current.alphabet[index] === null) {
                current.alphabet[index] = new TrieNode();
            }
            current = current.alphabet[index];
        }
        ++current.numberOfWordsInDictionaryWithCurrentEcryption;
    }

    /**
     * @param {string} encryptedWord
     * @return {number} 
     */
    findNumberOfWordsInDictionaryWithCurrentEcryption(encryptedWord) {
        let current = this.root;

        for (let i = 0; i < encryptedWord.length; ++i) {
            let index = encryptedWord.codePointAt(i) - StringUtility.ASCII_SMALL_CASE_A;
            if (current.alphabet[index] === null) {
                return Trie.NO_WORDS_IN_DICTIONARY_WITH_CURRENT_ECRYPTION;
            }
            current = current.alphabet[index];
        }
        return current.numberOfWordsInDictionaryWithCurrentEcryption;
    }
}
