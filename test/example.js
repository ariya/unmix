var unmix = require('unmix');

var str = 'Jadi gini guys. Even, kita actually nggak nge-create something gitu lho';
console.log(unmix.undo(str));

// using locale example

var unmixBekasi = require('unmix/src/locale/unmix.bekasi');
unmix.localize(unmixBekasi);

var str = 'He eh, aku sih setuju aja';
console.log(unmix.undo(str));