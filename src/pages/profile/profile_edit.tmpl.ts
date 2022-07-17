const profileEditTmpl = `
.profile-block
            .profile-block-left
                a(class='button-back' href='/') 
                    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="13" y="6.80005" width="11" height="1.6" transform="rotate(-180 13 6.80005)" fill="white"/>
                        <path d="M6 11L2 6L6 1" stroke="white" stroke-width="1.6"/>
                    </svg>
            .profile-block-right
                .profile
                        img.profile-avatar(src="https://fakeimg.pl/130x130/?text=png")
                        h1.profile-name Иван
                        .profile-info
                            -
                                const profileINfo = [{
                                    "name": "Почта",
                                    "value": inputEmail,
                                }, {
                                    "name": "Логин",
                                    "value": inputLogin,
                                }, {
                                    "name": "Имя",
                                    "value": inputFirstName,
                                }, {
                                    "name": "Фамилия",
                                    "value": inputSecondName,
                                }, {
                                    "name": "Имя в чате",
                                    "value": inputChatName,
                                }, {
                                    "name": "Телефон",
                                    "value": inputPhone,
                                }];
                            each val in profileINfo
                                .profile-info-block
                                    .profile-info-block-name= val.name
                                    .profile-info-block-value!= val.value
                        .profile-buttons
                            .profile-buttons-block
                                !=buttonSave
`;

export default profileEditTmpl;
