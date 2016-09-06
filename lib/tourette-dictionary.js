'use babel';

const DICTIONARY_DIRECTORY = '../resources/dictionaries/';

const TouretteDictionary = {
    dictionary(input, output) {
        input = this.loadLanguage(input);
        output = this.loadLanguage(output);

        let dictionary = {};

        input.forEach((item, i) => {
            dictionary[item] = output[i];
        });

        return dictionary;
    },

    loadLanguage(language) {
        let dictionary = require(DICTIONARY_DIRECTORY + language);

        return dictionary[language];
    },
};

export default TouretteDictionary;
