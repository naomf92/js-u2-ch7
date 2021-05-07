import BaseValidator from './BaseValidator';

export default class extends BaseValidator {
  constructor(val) {
    super(val, 'パスワード', 'password');
    this._checkLength = this._checkLength.bind(this);
    this._checkCapLetter = this._checkCapLetter.bind(this);
    this._checkSymbol = this._checkSymbol.bind(this);
    this._checkFormat = this._checkFormat.bind(this);
  }
  validate() {
    return super._cannotEmpty()
      .then(this._checkLength)
      .then(this._checkCapLetter)
      .then(this._checkSymbol)
      .then(this._checkFormat)
      .then((res) => {
        return { success: true }; // Promise.resolve({ success: true })と同一
      })
      .catch(err => {
        return err; // Promise.resolve(err)と同一
      });
  }
  _checkLength() {
    if (this.val.length >= 8) {
      return Promise.resolve();
    } else {
      return Promise.reject({
        success: false,
        type: 'password',
        message: 'パスワードが短すぎます。'
      });
    }
  }
  _checkCapLetter() {
    const re = /[A-Z]+/;
    const valid = re.test(this.val);
    if(valid) {
      return Promise.resolve()
    } else {
      return Promise.reject({
        success: false,
        type: this.type,
        message: `${this.typeName}には大文字を1文字以上含めてください。`
      })
    }
  }
  _checkSymbol() {
    const re = /[_\.@\-]+/;
    const valid = re.test(this.val);
    if(valid) {
      return Promise.resolve()
    } else {
      return Promise.reject({
        success: false,
        type: this.type,
        message: `${this.typeName}には_.@-を1文字以上含めてください。`
      })
    }
  }
  _checkFormat() {
    const re = /[a-z0-9]+/;
    const valid = re.test(this.val);
    if(valid) {//フォーマットが正しかったら
      return Promise.resolve()
    } else {//正しくなかったら
      return Promise.reject({
        success: false,
        type: this.type,
        message: `${this.typeName}は半角英数字の小文字と数字を1文字以上含めてください。`
      })
    }
  }

}