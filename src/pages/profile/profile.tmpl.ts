const profileTmpl = `
.profile-block
            form(class='form' style="position: fixed;display: none;" id="password_edit")
                .form-first
                    h1(class="form-title") Смена пароля
                    !=inputPasswordCurrect
                    !=inputPassword
                    !=inputPasswordReplay
                .form-second
                    !=buttonSubmit
                    !=buttonHide
            form(class='form' style="position: fixed;display: none;" id="avatar_edit")
                .form-first
                    h1(class="form-title") Смена аватарки
                    !=inputFile
                .form-second
                    !=buttonSubmitAvatar
                    !=buttonHideAvatar
            .profile-block-left
                !=buttonGoBack
            .profile-block-right
                .profile
                        !=buttonChangeAvatar
                        h1.profile-name!=firstNameLine
                        .profile-info
                            -
                                const profileINfo = [{
                                    "name": "Почта",
                                    "value": emailLine,
                                }, {
                                    "name": "Логин",
                                    "value": loginLine,
                                }, {
                                    "name": "Имя",
                                    "value": firstNameLine2,
                                }, {
                                    "name": "Фамилия",
                                    "value": secondNameLine,
                                }, {
                                    "name": "Имя в чате",
                                    "value": displayNameLine,
                                }, {
                                    "name": "Телефон",
                                    "value": phoneLine,
                                }];
                            each val in profileINfo
                                .profile-info-block
                                    .profile-info-block-name= val.name
                                    .profile-info-block-value!= val.value
                        .profile-buttons
                            .profile-buttons-block
                                !=buttonChangeInfo
                            .profile-buttons-block
                                !=buttonChangePassword
                            .profile-buttons-block
                                !=buttonExit
`;

export default profileTmpl;
