(function(_, factory) {
    'use strict';

    var wordDict = {
        'he eh': 'iya',
        'demen': 'suka',
        'melongo': 'bengong',
        'siake': 'kurang ajar',
        'bae': 'aja',
        'jember': 'jorok',
        'ngegoroh': 'bohong',
    };
    
    var phraseDict = {
        'kagak semenggah': 'tidak layak',
        'kagak danta': 'tidak jelas',
    };

    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js,
    // Rhino, and plain browser loading.

    /* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
        define({ wordDict, phraseDict }, factory);
    } else if (typeof exports !== 'undefined') {
        factory({ wordDict, phraseDict });
    } else {
        if (!window.unmix) {
            return;
        }
        
        unmix.dict.wordDict = Object.assign(unmix.dict.wordDict, wordDict);
        unmix.dict.phraseDict = Object.assign(unmix.dict.phraseDict, phraseDict);
    }
}(this, function(dict) {
    'use strict';

    module.exports = dict;
}));
