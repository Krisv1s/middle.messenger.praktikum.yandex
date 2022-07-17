const singupTmpl = `
.form-first
    h1(class="form-title") Регистрация
    !=inputEmail
    !=inputLogin
    !=inputFirstName
    !=inputSecondName
    !=inputPhone
    !=inputPassword
    !=inputPasswordReplay
.form-second
    !=buttonSingup
    !=buttonLink
`;

export default singupTmpl;
