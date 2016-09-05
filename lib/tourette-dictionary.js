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

        if( !dictionary && dictionary[language] )
            throw Error('No such dictionary(ies)!');

        return dictionary[language];
    },
};

export default TouretteDictionary;
