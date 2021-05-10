export default class {
  constructor(val, typeName, type) {
    this.val = val;
    this.typeName = typeName;
    this.type = type;
    this.result = {};
  }
  _cannotEmpty() {
    return new Promise((resolve, reject) => {
      if (!!this.val) {
        resolve(this);
      } else {
        reject({
          success: false,
          message: `${this.typeName}は必須です。`,
          type: this.type
        })
      }
    });
  }
  _errorResult(message) {
    return new Promise((resolve,reject) => {
      if (a) {
        resolve();
      } else {
        reject({
          success: false,
          type: this.type, //'emailなどのタイプ',
          message: 与えられたメッセージ
        })
      }
    });

  }
}