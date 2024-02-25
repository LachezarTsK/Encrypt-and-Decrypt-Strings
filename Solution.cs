
using System;

public class Encrypter
{
    private static readonly int ALPHABET_SIZE = 26;
    private static readonly string NOT_POSSIBLE_TO_ENCRYPT = "";

    private readonly Trie trie = new Trie();
    private readonly string[] keyToValue;

    public Encrypter(char[] keys, string[] values, string[] dictionary)
    {
        keyToValue = new string[ALPHABET_SIZE];
        for (int i = 0; i < keys.Length; ++i)
        {
            keyToValue[keys[i] - 'a'] = values[i];
        }

        foreach (string word in dictionary)
        {
            trie.AddEncryptedWordToTrie(Encrypt(word));
        }
    }

    public string Encrypt(string wordToEcrypt)
    {
        StringBuilder encryptedWord = new StringBuilder();
        foreach (char current in wordToEcrypt)
        {
            if (keyToValue[current - 'a'] == null)
            {
                return NOT_POSSIBLE_TO_ENCRYPT;
            }
            encryptedWord.Append(keyToValue[current - 'a']);
        }
        return encryptedWord.ToString();
    }

    public int Decrypt(string encryptedWord)
    {
        return trie.FindNumberOfWordsInDictionaryWithCurrentEcryption(encryptedWord);
    }
}

class Trie
{
    private sealed class TrieNode
    {
        public static readonly int ALPHABET_SIZE = 26;
        public TrieNode[] alphabet = new TrieNode[ALPHABET_SIZE];
        public int numberOfWordsInDictionaryWithCurrentEcryption;
    }

    private static readonly int NO_WORDS_IN_DICTIONARY_WITH_CURRENT_ECRYPTION = 0;
    private readonly TrieNode root = new TrieNode();

    public void AddEncryptedWordToTrie(string encryptedWord)
    {
        TrieNode current = root;
        foreach (char letter in encryptedWord)
        {
            int index = letter - 'a';
            if (current.alphabet[index] == null)
            {
                current.alphabet[index] = new TrieNode();
            }
            current = current.alphabet[index];
        }
        ++current.numberOfWordsInDictionaryWithCurrentEcryption;
    }

    public int FindNumberOfWordsInDictionaryWithCurrentEcryption(string encryptedWord)
    {
        TrieNode current = root;
        foreach (char letter in encryptedWord)
        {
            int index = letter - 'a';
            if (current.alphabet[index] == null)
            {
                return NO_WORDS_IN_DICTIONARY_WITH_CURRENT_ECRYPTION;
            }
            current = current.alphabet[index];
        }
        return current.numberOfWordsInDictionaryWithCurrentEcryption;
    }
}
