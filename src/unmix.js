(function(root, factory) {
    'use strict';

    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js,
    // Rhino, and plain browser loading.

    /* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        factory((root.unmix = {}));
    }
}(this, function(exports) {
    'use strict';

    var wordDict = {
        'actually': 'sebenarnya',
        'arrange': 'atur',
        'basically': 'pada dasarnya',
        'better': 'lebih bagus',
        'breakfast': 'sarapan',
        'challenging': 'menantang',
        'cost': 'biaya',
        'difficult': 'sulit',
        'dinner': 'makan malam',
        'even ,': 'bahkan,',
        'excited': 'semangat',
        'gaes': 'teman-teman',
        'guys': 'teman-teman',
        'literally': 'benar-benar',
        'lunch': 'makan siang',
        'mostly': 'kebanyakan',
        'ngeadd': 'menambah',
        'ngecreate': 'membuat',
        'ngecompare': 'bandingkan',
        'ngedelete': 'menghapus',
        'ngeimprove': 'memperbaiki',
        'obstacle': 'halangan',
        'prefer': 'milih',
        'requirement': 'persyaratan',
        'requirements': 'persyaratan',
        'simple': 'sederhana',
        'something': 'sesuatu',
        'submit': 'ajukan'
    };

    var phraseDict = {
        'admission fee': 'biaya masuk',
        'instead of': 'alih-alih',
        'like this': 'seperti ini',
        'like that': 'seperti itu',
        'literally': 'benar-benar',
        'make sense': 'masuk akal',
        'next time': 'lain kali',
        'next week': 'minggu depan',
        'parking fee': 'ongkos parkir',
        'so easy': 'sangat gampang',
        'so damn easy': 'amat sangat gampang',
        'so far': 'sejauh ini',
        'so new': 'berapa baru',
        'supposed to be': 'seharusnya',
        'which is': 'yang'
    };

    function translate(word) {
        var key = word.toLowerCase();
        var result = wordDict[key];
        if (!result) {
            result = phraseDict[key];
        }
        if (result) {
            var firstLetter = word[0];
            if (firstLetter.toUpperCase() === firstLetter) {
                result = result[0].toUpperCase() + result.substr(1);
            }
        }
        return result ? result : word;
    }

    function scan(input, callback) {
        var state = 1;
        var start = 0;
        var part = '';
        for (var pos = 0; pos < input.length; ++pos) {
            var ch = input[pos];
            switch (state) {
                case 0:
                    if (ch !== ' ') {
                        start = pos;
                        part = ch;
                        state = 1;
                    }
                    break;
                case 1:
                    if (ch === ' ') {
                        if (part.length > 0 && callback) {
                            callback.call(this, {
                                pos: start,
                                value: part
                            });
                        }
                        start = pos;
                        part = '';
                        state = 0;
                    } else if ('.,-!?()&'.indexOf(ch) >= 0) {
                        if (part.length > 0 && callback) {
                            callback.call(this, {
                                pos: start,
                                value: part
                            });
                        }
                        start = pos;
                        part = ch;
                        state = 2;
                    } else {
                        part += ch;
                    }
                    break;
                case 2:
                    if (part.length > 0 && callback) {
                        callback.call(this, {
                            pos: start,
                            value: part
                        });
                    }
                    start = pos;
                    part = ch;
                    state = (ch === ' ') ? 0 : 1;
                    break;
                default:
                    break;
            }
        }
        if (part.length > 0 && callback) {
            callback.call(this, {
                pos: start,
                type: '?',
                value: part
            });
        }
    }

    function undo(input) {
        var tokens = [];
        var patches = [];

        function patch(index, len, replacement) {
            patches.push({
                index: index,
                len: len,
                str: replacement
            });
        }

        scan(input, function(token) {            tokens.push(token);
            var str = token.value;
            var pos = token.pos;
            for (var i = 0; i < 3; i++) {
                var translated = translate(str);
                if (translated !== str) {
                    patch(pos, token.pos - pos + token.value.length, translated);
                    break;
                }
                if (str.toLowerCase().substr(0, 6) === 'nge - ') {
                    str = str.substr(0, 3) + str.substr(6); // "nge - add" -> "ngeadd"
                    translated = translate(str);
                    if (translated !== str) {
                        patch(pos, token.pos - pos + token.value.length, translated);
                        break;
                    }
                }
                if (str === 'gitu lho') {
                    patch(pos, token.pos - pos + token.value.length, '');
                    break;
                }
                var prev = tokens[tokens.length - 2 - i];
                if (!prev) {
                    break;
                }
                str = prev.value + ' ' + str;
                pos = prev.pos;
            }
        });

        var output = input;
        for (var i = patches.length - 1; i >= 0; i--) {
            var p = patches[i];
            var front = output.substr(0, p.index);
            var back = output.substr(p.index + p.len);
            output = front + p.str + back;
        }

        return output;
    }

    exports.undo = undo;
    exports.version = '0.0.1'; // sync with package.json

}));
