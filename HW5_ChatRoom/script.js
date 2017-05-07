'use strict';

function date(format, timestamp) {
  var jsdate, f;
  var txtWords = ['Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  var formatChr = /\\?(.?)/gi;
  var formatChrCb = function(t, s) {
    return f[t] ? f[t]() : s
  };
  var _pad = function(n, c) {
    n = String(n);
    while (n.length < c) {
      n = '0' + n
    }
    return n
  };
  f = {
    d: function() {
      return _pad(f.j(), 2)
    },
    D: function() {
      return f.l().slice(0, 3)
    },
    j: function() {
      return jsdate.getDate()
    },
    l: function() {
      return txtWords[f.w()] + 'day'
    },
    N: function() {
      return f.w() || 7
    },
    S: function() {
      var j = f.j();
      var i = j % 10;
      if (i <= 3 && parseInt((j % 100) / 10, 10) === 1) {
        i = 0
      }
      return ['st', 'nd', 'rd'][i - 1] || 'th'
    },
    w: function() {
      return jsdate.getDay()
    },
    z: function() {
      var a = new Date(f.Y(), f.n() - 1, f.j());
      var b = new Date(f.Y(), 0, 1);
      return Math.round((a - b) / 864e5)
    },
    W: function() {
      var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3);
      var b = new Date(a.getFullYear(), 0, 4);
      return _pad(1 + Math.round((a - b) / 864e5 / 7), 2)
    },
    F: function() {
      return txtWords[6 + f.n()];
    },
    m: function() {
      return _pad(f.n(), 2)
    },
    M: function() {
      return f.F().slice(0, 3)
    },
    n: function() {
      return jsdate.getMonth() + 1
    },
    t: function() {
      return (new Date(f.Y(), f.n(), 0)).getDate()
    },
    L: function() {
      var j = f.Y();
      return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0
    },
    o: function() {
      var n = f.n();
      var W = f.W();
      var Y = f.Y();
      return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0)
    },
    Y: function() {
      return jsdate.getFullYear();
    },
    y: function() {
      return f.Y().toString().slice(-2)
    },
    a: function() {
      return jsdate.getHours() > 11 ? 'pm' : 'am'
    },
    A: function() {
      return f.a().toUpperCase()
    },
    B: function() {
      var H = jsdate.getUTCHours() * 36e2;
      var i = jsdate.getUTCMinutes() * 60;
      var s = jsdate.getUTCSeconds();
      return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3)
    },
    g: function() {
      return f.G() % 12 || 12
    },
    G: function() {
      return jsdate.getHours();
    },
    h: function() {
      return _pad(f.g(), 2)
    },
    H: function() {
      return _pad(f.G(), 2)
    },
    i: function() {
      return _pad(jsdate.getMinutes(), 2)
    },
    s: function() {
      return _pad(jsdate.getSeconds(), 2)
    },
    u: function() {
      return _pad(jsdate.getMilliseconds() * 1000, 6)
    },
    e: function() {
      var msg = 'Not supported (see source code of date() for timezone on how to add support)'
      throw new Error(msg)
    },
    I: function() {
      var a = new Date(f.Y(), 0);
      var c = Date.UTC(f.Y(), 0);
      var b = new Date(f.Y(), 6);
      var d = Date.UTC(f.Y(), 6);
      return ((a - c) !== (b - d)) ? 1 : 0
    },
    O: function() {
      var tzo = jsdate.getTimezoneOffset();
      var a = Math.abs(tzo);
      return (tzo > 0 ? '-' : '+') + _pad(Math.floor(a / 60) * 100 + a % 60, 4)
    },
    P: function() {
      var O = f.O();
      return (O.substr(0, 3) + ':' + O.substr(3, 2))
    },
    T: function() {
      return 'UTC'
    },
    Z: function() {
      return -jsdate.getTimezoneOffset() * 60
    },
    c: function() {
      return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb)
    },
    r: function() {
      return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb)
    },
    U: function() {
      return jsdate / 1000 | 0
    }
  }
  var _date = function(format, timestamp) {
    jsdate = (timestamp === undefined ? new Date() : (timestamp instanceof Date) ? new Date(timestamp) : new Date(timestamp * 1000))
    return format.replace(formatChr, formatChrCb)
  }
  return _date(format, timestamp)
}
(function() {
  if (FormData.prototype.get === undefined) {
    showDialog('Unsupported Browser', `You're using unsupported browser, some feature may be working not correctly,
you can download <a href="https://www.google.com.tw/chrome/browser/desktop/" target="_blank">latest version of Chrome</a> to use this chat room,
if you're using iOS,contact<a href="https://www.facebook.com/en.chingchang?ref=br_rs">En Cheng</a>to get modern Android devices and download Chrome at Google Play.`);
    window._FormData = window.FormData;
    class FD extends window.FormData {
      constructor(form) {
        super(form);
        this._form = form;
        this._set = new Map();
        jQuery(form).serializeArray().forEach(e => {
          this._set.set(e.name, e.value);
        });
      }
      append(key, value) {
        super.append(key, value);
        this._set.set(key, value);
      }
      get(key) {
        if (super.get) return super.get(key);
        return this._set.get(key);
      }
      has(key) {
        if (super.has) return super.has(key);
        return this._set.has(key);
      }
    }
    window.FormData = FD;
  }
})();
firebase.initializeApp({
  apiKey: "AIzaSyDc9mjdX3a-rg22lc6TGkCobZGR5WZa4cs",
  authDomain: "ntutweb-fb9b9.firebaseapp.com",
  databaseURL: "https://ntutweb-fb9b9.firebaseio.com",
  projectId: "ntutweb-fb9b9",
  storageBucket: "ntutweb-fb9b9.appspot.com",
  messagingSenderId: "201637364111"
});

function escapeHtml(unsafe) {
  unsafe = unsafe.toString();
  return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
const DB = firebase.database();
const AUTH = firebase.auth();
let CurUser = null;
class User {
  constructor(auth, newInstance) {
    this._auth = auth;
    if (auth.hasOwnProperty('name') && auth.hasOwnProperty('uid')) {
      this.name = auth.name;
      this.occupation = auth.occupation;
      this.age = auth.age;
      this.descriptions = auth.descriptions;
      this.avatar = auth.avatar;
      this._allowCommit = false;
      return;
    }
    newInstance = !!newInstance;
    this._waitLoading = User.getUserInfoByUid(this.uid).then(d => {
      console.log(d);
      this._allowCommit = true;
      if (newInstance || (!d || !d.uid)) {
        this.name = "";
        this.occupation = "";
        this.age = 0;
        this.descriptions = "";
        this.avatar = "";
        return this.commit();
      } else {
        this.name = d.name;
        this.occupation = d.occupation;
        this.age = d.age * 1;
        this.descriptions = d.descriptions;
        this.avatar = d.avatar;
      }
    });
  }
  get uid() {
    return this._auth.uid;
  }
  get emailVerified() {
    return this._auth.emailVerified;
  }
  get email() {
    return this._auth.email;
  }
  commit() {
    if (!this._allowCommit) {
      return new Promise((a, b) => {
        a();
      })
    }
    let obj = {};
    obj[`/users/${this.uid}`] = {
      uid: this.uid,
      name: this.name,
      occupation: this.occupation,
      age: this.age,
      descriptions: this.descriptions,
      avatar: this.avatar,
    };
    return DB.ref().update(obj);
  }
  updateView() {
    const setVal = (selector, val) => {
      const e = document.querySelector(selector);
      if (e && e.parentNode && e.parentNode.MaterialTextfield) {
        e.parentNode.MaterialTextfield.change(val);
      } else if (e) {
        e.value = val;
      }
    };
    const avatarUrl = this.avatar || 'image/default_avatar.jpg';
    setVal("#name", this.name);
    setVal("#job", this.occupation);
    setVal("#age", this.age);
    $("#avatar").val(this.avatar || '');
    $("#previewCover").attr('src', avatarUrl);
    setVal("#descs", this.descriptions);
    $("#info-avatar").attr('src', avatarUrl);
    $('#my-name').text(this.name);
    let infList = $('#my-info-list').empty();
    const showDataInInf = (icon, title, data) => {
      const HTML = `<div class="mdl-cell mdl-cell--12-col"data-key="${escapeHtml(title)}"><i class="material-icons mdl-color-text--primary ">${icon}</i><div class="info-row"><label>${escapeHtml(title)}</label><span>${escapeHtml(data)}</span></div></div>`;
      const e = $(HTML);
      infList.append(e);
      return e;
    };
    let emailE = showDataInInf('email', 'Email', this.email);
    showDataInInf('work', 'Occupation', this.occupation);
    showDataInInf('date_range', 'Age', this.age);
    showDataInInf('event_note', 'Descriptions', this.descriptions);
    if (!this.emailVerified) {
      emailE.append(`<div id="email-nv"class="icon material-icons">warning</div><div class="mdl-tooltip"data-mdl-for="email-nv">Email address is not verified.<br/>Click to resend email again.</div>`);
      $('#email-nv').click(() => {
        showDialog('Send Email Verification', 'Do you want to verify your email again?', [{
          text: 'Cancel',
        }, {
          text: 'Sure',
          callback: (a, b) => {
            this._auth.sendEmailVerification().then(() => {
              showDialog('Send Email Verification', 'Please check your inbox.', [{
                text: 'OK',
                callback: () => {
                  this.reloadAuth();
                }
              }]);
            });
          }
        }])
      });
      componentHandler.upgradeDom();
    }
  }
  static signUp(email, pwd) {
    return AUTH.createUserWithEmailAndPassword(email, pwd).then(u => {
      return u.sendEmailVerification();
    });
  }
  static onLoginStatusChange(user) {
    if (user) {
      CurUser = new User(user, false);
      CurUser._waitLoading.then(() => {
        CurUser.updateView();
        if (CurUser.emailVerified && CurUser.name !== '') {
          setLayer(3);
        } else if (CurUser.name === '') {
          setLayer(1);
        } else if (!CurUser.emailVerified) {
          setLayer(2);
        }
        window.__ocs = Message.showLast100Message(!!window.__ocs);
      });
    } else {
      user = null;
      setLayer(0);
    }
  }
  static signIn(email, pwd) {
    return AUTH.signInWithEmailAndPassword(email, pwd).then(user => {
      console.log(user);
    }).catch(err => {
      console.error(err);
      CurUser = null;
      throw err;
    })
  }
  static getUserInfoByUid(uid) {
    return DB.ref(`users/${uid}`).once('value').then(x => {
      return x.val();
    });
  }
  reloadAuth() {
    this._auth.reload().then(() => {
      this.updateView();
    });
  }
  logout() {
    return this.commit().then(() => {
      return AUTH.signOut();
    });
  }
  static all() {
    return DB.ref('users').once('value').then(x => {
      return x.val();
    }).then(arr => {
      let us = new Map();
      for (let k in arr) {
        if (arr.hasOwnProperty(k)) {
          us.set(k, new User(arr[k]));
        }
      }
      return us;
    });
  }
}
class Message {
  constructor(uidOrObj, msg) {
    if (typeof uidOrObj === 'string') {
      this.uid = uidOrObj;
      this.msg = msg;
      this.time = firebase.database.ServerValue.TIMESTAMP;
      this._profile = null;
    } else {
      this.uid = uidOrObj.uid;
      this.msg = uidOrObj.msg;
      this.time = uidOrObj.time;
    }
  }
  getProfile() {
    if (this.__us.has(this.uid)) {
      return new Promise((a, b) => {
        this._profile = this.__us.get(this.uid) || {};
        a(this._profile);
      });
    } else {
      Message.updateProfile().then(m => {
        this._profile = m.get(this.uid) || {};
        return this._profile;
      });
    }
  }
  static updateProfile() {
    return User.all().then(m => {
      Message.prototype.__us = m;
      return m;
    });
  }
  commit() {
    if (!CurUser || !CurUser.emailVerified) {
      return new Promise((a, b) => {
        b(new ReferenceError("Permission denied, make sure you're log in and your email is verified, if your email verified, please refresh this page."));
      });
    }
    if (typeof this.time === 'object') {
      let ref = DB.ref('messages');
      let childRef = ref.push();
      return childRef.set({
        uid: this.uid,
        msg: this.msg,
        time: this.time,
      });
    } else {
      return new Promise((a, b) => {
        a();
      });
    }
  }
  static showAllMessage() {
    return Message.updateProfile().then(() => {
      return DB.ref('messages').once('value').then(x => x.val());
    }).then(Message.processMessageObject);
  }
  static showLast100Message(withClean) {
    let obj = {};
    withClean = !!withClean;
    const chatList = $("#chat-list");
    return Message.updateProfile().then(() => {
      if (withClean) {
        chatList.empty();
      }
      return DB.ref('messages').orderByChild('time').limitToLast(100).on('child_added', (s) => {
        Message.processMessageObject(s.val()).then(m => {
          return m[0].getHTML()
        }).then(html => {
          chatList.append(html);
          Message.scrollToLast();
        });
      });
    });
  }
  static scrollToLast() {
    const chatList = document.querySelector("#chat-list");
    chatList.scrollTop = chatList.scrollHeight;
  }
  static processMessageObject(arr) {
    let msgArr = [];
    if (arr.hasOwnProperty('uid')) {
      msgArr.push(new Message(arr));
    } else {
      for (let k in arr) {
        if (arr.hasOwnProperty(k)) {
          msgArr.push(new Message(arr[k]));
        }
      }
    }
    msgArr.sort((a, b) => a.time - b.time);
    return Promise.all(msgArr.map(x => x.getProfile())).then(() => {
      return msgArr;
    });
  }
  getHTML() {
    return this.getProfile().then(() => {
      return `<div class="message ${CurUser.uid === this.uid ? "self" : "others"}"data-uid="${this.uid}"><div class="author"><img class="avatar"src="${this._profile.avatar || 'image/default_avatar.jpg'}"/><span class="name">${escapeHtml(this._profile.name)}</span></div><div class="msg">${escapeHtml(this.msg)}</div><div class="time">${date('F dS, H:i',(this.time/1000)|0)}</div></div>`;
    });
  }
}
AUTH.onAuthStateChanged(User.onLoginStatusChange);
let __layers = $('layer');
__layers._td = false;

function setLayer(i) {
  __layers.removeClass('current');
  if (__layers[i]) {
    __layers[i].classList.add('current');
  } else {
    console.warn(`Layer id=${i}404`);
  }
  switch (i) {
    case 3:
      Message.scrollToLast();
      break;
  }
  if (!__layers._td) {
    setTimeout(() => {
      $("#layer-loading").remove();
    }, 500);
    __layers._td = true;
  }
}

function setAction(obj, action) {
  obj.form.querySelector('input[name="action"][type="hidden"]').value = action;
}

function showDialog(title, content, buttons) {
  let dialog = document.createElement('dialog');
  dialog.classList.add('mdl-dialog');
  dialog.innerHTML = `<h3 class="mdl-dialog__title"></h3><div class="mdl-dialog__content"></div><div class="mdl-dialog__actions mdl-dialog__actions"><button type="button"class="mdl-button">OK</button><button type="button"class="mdl-button close">Disagree</button></div>`;
  $(dialog).find('>h3').text(title);
  $(dialog).find('.mdl-dialog__content').html(content);
  if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
  }
  buttons = buttons || [{
    text: 'OK',
    callback: function(d, val) {},
  }];
  let acts = $(dialog).find('.mdl-dialog__actions').empty();
  buttons.forEach(function(b) {
    let html = b.html ? b.html : `<button type="button"class="mdl-button"data-val="${b.text}">${b.text}</button>`;
    let dom = $(html);
    dom.click(() => {
      if (b.callback) {
        b.callback.apply(dialog, [dialog, b.text]);
      }
      dialog.close();
      dialog.parentNode.removeChild(dialog);
    });
    acts.append(dom);
  });
  document.body.appendChild(dialog);
  dialog.showModal();
  return dialog;
}
$('form:not(.nb)').submit(function(e) {
  e.preventDefault();
  this.classList.add('loading');
  let formData = new FormData(this);
  const action = formData.get('action');
  const RM_LOAD = () => {
    this.classList.remove('loading');
  };
  switch (action) {
    case 'signin':
      {
        User.signIn(formData.get('email'), formData.get('password')).then(x => {
          setLayer(1);
          RM_LOAD();
        }).catch(err => {
          showDialog('ERROR', err.message);
          RM_LOAD();
        });
      }
      break;
    case 'signup':
      {
        User.signUp(formData.get('email'), formData.get('password')).then(x => {
          showDialog('Email Verification', 'Registration is complete, please check email to active your account.');
          setLayer(1);
          RM_LOAD();
        }).catch(err => {
          showDialog('ERROR', err.message);
          RM_LOAD();
        });
      }
      break;
    case 'updateInfo':
      {
        CurUser.name = formData.get('name');
        CurUser.occupation = formData.get('job');
        CurUser.occupation = formData.get('job');
        CurUser.age = (formData.get('age') * 1) || 0;
        CurUser.avatar = formData.get('avatar') || '';
        CurUser.descriptions = formData.get('descs');
        CurUser.commit().then(() => {
          RM_LOAD();
          CurUser.reloadAuth();
        }).catch(err => {
          showDialog('ERROR', err.message);
          RM_LOAD();
        });;
      }
      break;
    case 'sendMsg':
      {
        let msgE = $("#msg");
        let msgText = msgE.text().trim();
        if (msgText !== '') {
          let m = new Message(CurUser.uid, msgText);
          m.commit().catch(err => {
            showDialog('Error', err.message);
          });
          msgE.text('');
        }
      }
      break;
  }
}).prepend('<div class="loading-circle"><div class="mdl-spinner mdl-js-spinner is-active"></div></div>');
$('#avatarFileSelector').change(function() {
  const avatar = $("#avatar");
  if (this.files[0]) {
    new Promise((a, b) => {
      let f = new FileReader();
      f.onload = function() {
        a(this.result);
      };
      f.onerror = function(err) {
        b(err);
      };
      f.readAsDataURL(this.files[0]);
      this.value = '';
    }).then(dataUrl => {
      let img = new Image();
      return new Promise((a, b) => {
        img.onload = function() {
          a(img);
        };
        img.onerror = function(err) {
          b(err);
        };
        img.src = dataUrl;
      });
    }).catch(err => {
      console.error(err);
      showDialog('Error', 'Error when opening your image.');
      avatar.val('');
    }).then(img => {
      let canvas = document.createElement('canvas');
      canvas.width = canvas.height = 240;
      let ctx = canvas.getContext('2d');
      let minSize = Math.min(img.width, img.height);
      let minSizeH = minSize >> 1;
      ctx.drawImage(img, (img.width >> 1) - minSizeH, (img.height >> 1) - minSizeH, minSize, minSize, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/jpeg', .6);
    }).then(url => {
      avatar.val(url);
      $("#previewCover").attr('src', url);
    });
  } else {
    avatar.val('');
  }
});
$('.mdl-navigation__link').click(function() {
  const layout = $(this).parents('.mdl-layout')[0];
  layout.MaterialLayout.toggleDrawer();
});
$('#msg').keydown(function(e) {
  if (e.keyCode === 13) {
    if (!e.shiftKey && !e.ctrlKey) {
      $("#sendMsg").click();
      e.preventDefault();
    } else {
      Message.scrollToLast();
    }
  }
});
