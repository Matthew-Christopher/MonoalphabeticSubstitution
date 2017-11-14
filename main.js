let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let solved = [];
let ciphertxt = '';

function clr(btn) {
  document.getElementsByName('plain_' + btn)[0].value = '';
}

function clrall() {
  for (let i=0; i<alphabet.length; i++) {
    document.getElementsByName('plain_' + alphabet[i])[0].value = '';
  }
}

function replace() {
  let ciphtemp = ciphertxt;
  for (let i=0; i<alphabet.length; i++) {
    let re = new RegExp(alphabet[i], 'g');
    if (document.getElementsByName('plain_' + alphabet[i])[0].value) {
      ciphtemp = ciphtemp.replace(re, document.getElementsByName('plain_' + alphabet[i])[0].value.toLowerCase());
      cipherinput(null, -1, false);
    }
    document.getElementsByName('ciphertext')[0].value = ciphtemp;
  }
}

function focusnext(field) {
  if (field.name.substr(-1) != 'Z') {
    for (let i=0; i<alphabet.length; i++) {
      if (field.name.substr(-1) == alphabet[i]) {
        document.getElementsByName(field.name.slice(0, -1) + alphabet[i+1])[0].focus();
      }
    }
  }
}

function down(event, field) {
  if ((event.keyCode || event.which) > 64 && (event.keyCode || event.which) < 91) {
    event.preventDefault();
    setTimeout(() => {
      field.value = String.fromCharCode(event.keyCode || event.which).toLowerCase();
      focusnext(field);
      replace();
    }, 0);
  } else if (!((event.keyCode || event.which) == 8 || (event.keyCode || event.which) == 9 || (event.keyCode || event.which) == 46)) {
    event.preventDefault();
  } else {
    setTimeout(() => {
      replace();
    }, 0);
  }
}

function cipherinput(event, code, paste) {
  if (event == null || ((event.keyCode || event.which) > 64 && (event.keyCode || event.which) < 91 && !event.ctrlKey)) {
    if (event != null) {
      event.preventDefault();
      document.getElementsByName('ciphertext')[0].value += String.fromCharCode(event.keyCode || event.which).toUpperCase();
      ciphertxt += String.fromCharCode(event.keyCode || event.which).toUpperCase();
    }
    setTimeout(() => {
      temp = document.getElementsByName('ciphertext')[0].value.split("");
      for (let i=0; i<document.getElementsByName('ciphertext')[0].value.length; i++) {
        if (temp[i] == temp[i].toUpperCase()) {
          solved[i] = false;
        } else {
          solved[i] = true;
        }
      }
      for (let i=0; i<document.getElementsByName('ciphertext')[0].value.length; i++) {
        if (!solved[i]) {
          temp[i] = temp[i].toUpperCase();
        } else {
          temp[i] = temp[i].toLowerCase();
        }
      }
      document.getElementsByName('ciphertext')[0].value = temp.join("").replace(/\s/g, '').replace(/[.,\/'"+@#!$%\^&\*;:{}=\-_`~()]/g, "");
      if (event != null)
        replace();
    }, 0);
  } else {
    setTimeout(() => {
      document.getElementsByName('ciphertext')[0].value = document.getElementsByName('ciphertext')[0].value.replace(/\s/g, '').replace(/[.,\/'"+@#!$%\^&\*;:{}=\-_`~()]/g, "");
      ciphertxt = document.getElementsByName('ciphertext')[0].value;
    }, 0);
  }
  if (paste) {
    event.preventDefault();
    document.getElementsByName('ciphertext')[0].value += event.clipboardData.getData("text/plain").toUpperCase().replace(/\s/g, '').replace(/[.,\/'"+@#!$%\^&\*;:{}=\-_`~()]/g, "");
    ciphertxt = document.getElementsByName('ciphertext')[0].value;
    replace();
  }
}

let observe;
if (window.attachEvent) {
  observe = (element, event, handler) => {
    element.attachEvent('on'+event, handler);
  };
} else {
  observe = (element, event, handler) => {
    element.addEventListener(event, handler, false);
  };
}

function init () {
  let text = document.getElementsByName('ciphertext')[0];

  function resize () {
    text.style.height = 'auto';
    text.style.height = text.scrollHeight+'px';
  }

  function delayedResize () {
    window.setTimeout(resize, 0);
  }

  observe(text, 'change', resize);
  observe(text, 'cut', delayedResize);
  observe(text, 'paste', delayedResize);
  observe(text, 'drop', delayedResize);
  observe(text, 'keydown', delayedResize);

  text.focus();
  text.select();
  resize();
}

function copy() {
  if (document.getElementsByName('ciphertext')[0].value == '') {
    document.getElementsByName('copy')[0].innerHTML = 'Ciphertext is empty';
    setTimeout(() => {
      document.getElementsByName('copy')[0].innerHTML = 'Copy decoded message';
    }, 1500);
  } else {
    document.getElementsByName('ciphertext')[0].select();
    try {
      document.execCommand('copy');
      document.getElementsByName('copy')[0].innerHTML = 'Decoded message copied';
      setTimeout(() => {
        document.getElementsByName('copy')[0].innerHTML = 'Copy decoded message';
      }, 3000);
    } catch(err) {
      document.getElementsByName('copy')[0].innerHTML = 'Error while attempting to copy message';
      setTimeout(() => {
        document.getElementsByName('copy')[0].innerHTML = 'Copy decoded message';
      }, 1500);
    }
  }
}
