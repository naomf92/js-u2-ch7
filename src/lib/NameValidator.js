import BaseValidator from './BaseValidator';

export default class extends BaseValidator {
  constructor(val) {
    super(val, '名前', 'name');
    this._checkFormat = this._checkFormat.bind(this);
  }
  validate() {
    return super._cannotEmpty()
      .then(this._checkFormat)
      .then((res) => {
        return { success: true };
      })
      .catch(err => {
        return err;
      });
  }
  _checkFormat() {
    const re = /^([a-zA-Z]*)+\s+([a-zA-Z]*)$/;
    const valid = re.test(this.val);
    if(valid) {
      return Promise.resolve()
    } else {
      return Promise.reject({
        success: false,
        type: this.type,
        message: `${this.typeName}には半角英数字のみ利用可能です。また名字と名前をスペースで書く必要があります。`
      })
    }
  }

}