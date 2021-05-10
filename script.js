
//each pen becomes a javascript variable and gets a name
const penOne = document.getElementById('penone'); 
const penTwo = document.getElementById('pentwo');
const penThree = document.getElementById('penthree');
const penFour = document.getElementById('penfour');
const penFive = document.getElementById('penfive');
const penSix = document.getElementById('pensix');

//now the pens remove the text from according input and set it on focus so that you can write right away
penOne.onclick = () => { 
    document.getElementById('inone').value = '';
    document.getElementById('inone').focus();
};

penTwo.onclick = () => { 
    document.getElementById('intwo').value = '';
    document.getElementById('intwo').focus();
};

penThree.onclick = () => { 
    document.getElementById('inthree').value = '';
    document.getElementById('inthree').focus();
};

penFour.onclick = () => { 
    document.getElementById('infour').value = '';
    document.getElementById('infour').focus();
};
penFive.onclick = () => { 
    document.getElementById('infive').value = '';
    document.getElementById('infive').focus();
};

penSix.onclick = () => { 
    document.getElementById('insix').value = '';
    document.getElementById('insix').focus();
};



