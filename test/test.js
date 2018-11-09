var assert = require('assert');
var unmix = require('../src/unmix.js');

it('should translate popular words', function() {
    assert.strictEqual(unmix.undo('Bisa arrange sendiri?'), 'Bisa atur sendiri?');
    assert.strictEqual(unmix.undo('Actually, nggak sulit kok bikinnya'), 'Sebenarnya, nggak sulit kok bikinnya');
    assert.strictEqual(unmix.undo('Produk kita sih masih better'), 'Produk kita sih masih lebih bagus');
    assert.strictEqual(unmix.undo('Mau breakfast bareng?'), 'Mau sarapan bareng?');
    assert.strictEqual(unmix.undo('Kerjaan baru sangat challenging!'), 'Kerjaan baru sangat menantang!');
    assert.strictEqual(unmix.undo('Komponen cost paling besar ya itu.'), 'Komponen biaya paling besar ya itu.');
    assert.strictEqual(unmix.undo('Emang difficult gitu kalau mau ketemu dia?'), 'Emang sulit gitu kalau mau ketemu dia?');
    assert.strictEqual(unmix.undo('Dinner di Kemvil mau?'), 'Makan malam di Kemvil mau?');
    assert.strictEqual(unmix.undo('Even, bosnya juga nggak pakai!'), 'Bahkan, bosnya juga nggak pakai!');
    assert.strictEqual(unmix.undo('Mereka jadi excited sekali!'), 'Mereka jadi semangat sekali!');
    assert.strictEqual(unmix.undo('Jadi gini gaes!'), 'Jadi gini teman-teman!');
    assert.strictEqual(unmix.undo('Jadi gini guys!'), 'Jadi gini teman-teman!');
    assert.strictEqual(unmix.undo('Guys, kapan nih?'), 'Teman-teman, kapan nih?');
    assert.strictEqual(unmix.undo('Kantornya literally di Jaksel'), 'Kantornya benar-benar di Jaksel');
    assert.strictEqual(unmix.undo('Lunch di Citos lagi?'), 'Makan siang di Citos lagi?');
    assert.strictEqual(unmix.undo('Mereka mostly kerjanya ngganggur'), 'Mereka kebanyakan kerjanya ngganggur');
    assert.strictEqual(unmix.undo('Banyak obstacle banyak serunya juga!'), 'Banyak halangan banyak serunya juga!');
    assert.strictEqual(unmix.undo('Lebih prefer Windows sih daripada Mac.'), 'Lebih milih Windows sih daripada Mac.');
    assert.strictEqual(unmix.undo('Terus, perlu requirement apa aja?'), 'Terus, perlu persyaratan apa aja?');
    assert.strictEqual(unmix.undo('Terus, perlu requirements apa aja?'), 'Terus, perlu persyaratan apa aja?');
    assert.strictEqual(unmix.undo('Kita maunya yang serba simple'), 'Kita maunya yang serba sederhana');
    assert.strictEqual(unmix.undo('Something banget lho!'), 'Sesuatu banget lho!');
    assert.strictEqual(unmix.undo('Submit aja idenya ke panitia.'), 'Ajukan aja idenya ke panitia.');
    assert.strictEqual(unmix.undo('Basically, saya tidak setuju.'), 'Pada dasarnya, saya tidak setuju.');
});

it('should undo well-known combos', function() {
    assert.strictEqual(unmix.undo('Nggak pakai admission fee kok!'), 'Nggak pakai biaya masuk kok!');
    assert.strictEqual(unmix.undo('Instead of Google, doi pakai Bing.'), 'Alih-alih Google, doi pakai Bing.');
    assert.strictEqual(unmix.undo('Alasannya udah nggak make sense!'), 'Alasannya udah nggak masuk akal!');
    assert.strictEqual(unmix.undo('Deploynya harus like this'), 'Deploynya harus seperti ini');
    assert.strictEqual(unmix.undo('Deploynya harus like that'), 'Deploynya harus seperti itu');
    assert.strictEqual(unmix.undo('Nggak sempat nih, next time aja ya!'), 'Nggak sempat nih, lain kali aja ya!');
    assert.strictEqual(unmix.undo('Next week mau nyoba lagi'), 'Minggu depan mau nyoba lagi');
    assert.strictEqual(unmix.undo('Ada duit buat parking fee?'), 'Ada duit buat ongkos parkir?');
    assert.strictEqual(unmix.undo('Bikin yang kayak gitu sih so easy'), 'Bikin yang kayak gitu sih sangat gampang');
    assert.strictEqual(unmix.undo('Bikin yang kayak gitu sih so damn easy'), 'Bikin yang kayak gitu sih amat sangat gampang');
    assert.strictEqual(unmix.undo('So far sama dia baik-baik aja tuh'), 'Sejauh ini sama dia baik-baik aja tuh');
    assert.strictEqual(unmix.undo('Udah nggak so new lagi'), 'Udah nggak berapa baru lagi');
    assert.strictEqual(unmix.undo('jalannya sih supposed to be sudah lancar'), 'jalannya sih seharusnya sudah lancar');
    assert.strictEqual(unmix.undo('App yang itu, which is dibikin kita juga'), 'App yang itu, yang dibikin kita juga');
});

it('should handle prefixes', function() {
    assert.strictEqual(unmix.undo('Nge-add user baru gampang kok'), 'Menambah user baru gampang kok');
    assert.strictEqual(unmix.undo('Jangan ngecreate kerjaan tambahan'), 'Jangan membuat kerjaan tambahan');
    assert.strictEqual(unmix.undo('Buat apa ngecompare sama orang lain?'), 'Buat apa bandingkan sama orang lain?');
    assert.strictEqual(unmix.undo('Gimana ya ngedelete appnya?'), 'Gimana ya menghapus appnya?');
    assert.strictEqual(unmix.undo('sulit nge-improve yang satu itu'), 'sulit memperbaiki yang satu itu');
});

it('should remove superfluous phrases', function() {
    assert.strictEqual(unmix.undo('Balik aja ke dia gitu lho!'), 'Balik aja ke dia !');
});
