const singinTmpl = `
.form-first
    h1(class="form-title") Вход
    !=inputLogin
    !=inputPassword
.form-second
    !=buttonSingin
    !=buttonLink
    if msg
        span.error_message!=msg
`;

export default singinTmpl;
