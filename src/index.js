import MailValidator from './lib/MailValidator';
import PasswordValidator from './lib/PasswordValidator';
import NameValidator from './lib/NameValidator';
import UsernameValidator from './lib/UsernameValidator';
import 'whatwg-fetch'

const endpoint = "http://localhost:3000"

const validate = (params) => {
  const {
    name,
    email,
    password,
    username
  } = params;
  const mailValidator = new MailValidator(email);
  const passwordValidator = new PasswordValidator(password);
  const nameValidator = new NameValidator(name)
  const usernameValidator = new UsernameValidator(username)
  return Promise.all([
    nameValidator.validate(),
    usernameValidator.validate(),
    mailValidator.validate(),
    passwordValidator.validate()]
  )
}

const removeErrors = () => {
  return new Promise((resolve) => {
    document.querySelectorAll('.is-invalid').forEach((el) => {
      el.classList.remove('is-invalid')
    })
    document.querySelectorAll('.invalid-feedback').forEach((el) => {
      el.parentNode.removeChild(el);
    })
    resolve();
  })
}

const addErrorMessage = (type, message) => {
  let input = document.getElementById(type);
  input.classList.add('is-invalid')
  input.insertAdjacentHTML('afterend', `<div class="invalid-feedback">${message}</div>`);
}

const signup = (params) => {
  return fetch(`${endpoint}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json; charset=utf-8',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params)
  })
    .then((res) => {
      const json = res.json();
      if (res.status === 200) { // 登録成功
        return json
      } else { // 登録失敗
        return Promise.reject(new Error('ユーザー登録失敗'))
      }
    })
}

const onSubmit = async () => {
  await removeErrors()
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const username = document.getElementById('username');
  const name = document.getElementById('name');
  const emailVal = email.value;
  const passwordVal = password.value;
  const usernameVal = username.value;
  const nameVal = name.value;

  // const params = {
  //   email: emailVal,//メールアドレスの値
  //   password: passwordVal,//パスワードの値
  //   username: usernameVal,//ユーザー名の値
  //   name: nameVal//名前の値
  // }

  // 👇 分割代入の値をよく見ると、上記のDOM取得の値になっています
  const params = {
    emailVal,
    passwordVal,
    usernameVal,
    nameVal
  }

  const results = await validate(params);
  if (results[0].success && results[1].success && results[2].success && results[3].success) {
    //バリデーション成功時 paramsの中身が要件を満たしていたら
    signup(params)
      .then((json) => {
        alert(json.message);
      })
      .catch((err) => {
        alert(err.message);
      });
  } else {//エラーメッセージを出力 バリテーション失敗 入力情報にミスがあったら
    results.forEach(result => {
      if(!result.success) {
        addErrorMessage(result.type, result.message);
      }
    });
  }
}

{
  const submit = document.getElementById('submit');
  submit.addEventListener('click', onSubmit);
}