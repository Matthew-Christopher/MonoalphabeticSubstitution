let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function clear(btn) {
  document.getElementsByName('plain_' + btn.toLowerCase())[0].value = '';
}

function replace() {
  document.getElementsByName('ciphertext')[0].value = ciphertxt;
  let temp = ciphertxt;
  for (let i=0; i<alphabet.length; i++) {
    let re = new RegExp(alphabet[i], 'g');
    if (document.getElementsByName('plain_' + alphabet[i])[0].value)
      temp = temp.replace(re, document.getElementsByName('plain_' + alphabet[i])[0].value);
    document.getElementsByName('ciphertext')[0].value = temp;
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
      replace(field.name.substr(-1), field.value.toLowerCase());
    }, 0);
  }
}

function cipherinput() {
  setTimeout(() => {
    ciphertxt = document.getElementsByName('ciphertext')[0].value.toUpperCase().replace(/\s/g, '').replace(/[.,\/'"+@#!$%\^&\*;:{}=\-_`~()]/g, "");
    document.getElementsByName('ciphertext')[0].value = document.getElementsByName('ciphertext')[0].value.toUpperCase().replace(/\s/g, '').replace(/[.,\/'"+@#!$%\^&\*;:{}=\-_`~()]/g, "");
  }, 0);
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
