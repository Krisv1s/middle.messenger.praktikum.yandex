type ValidatioinType = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  message: string;
};

const Validatioin = {
  first_name: {
    regex: /^[A-ZА-ЯЁ][A-ZА-ЯЁa-zа-яё-]+$/,
    message:
      'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
  },
  second_name: {
    regex: /^[A-ZА-ЯЁ][A-ZА-ЯЁa-zа-яё-]+$/,
    message:
      'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
  },
  login: {
    regex: /^(?=.{3,20}$)[\d-_]*[a-zA-Z]+[\d-_]*/,
    message:
      'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
  },
  email: {
    regex: /^[\w.-]+@[\w.-]+[A-Za-z0-9]+\.[A-Za-z]{2,4}$/,
    message:
      'Латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы',
  },
  password: {
    regex: /^(?=.*?[A-Z])(?=.*?[0-9]).{8,40}$/,
    message: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
  },
  phone: {
    regex: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,15}(\s*)?$/,
    message: 'От 10 до 15 символов, состоит из цифр, может начинается с плюса',
  },
  message: { regex: /\S+/, message: 'Не должно быть пустым' },
};

export default function isValid(type: string, value: string) {
  if (Validatioin[type as keyof ValidatioinType].regex.test(value)) {
    return { res: true };
  }
  return { res: false, message: Validatioin[type as keyof ValidatioinType].message };
}
