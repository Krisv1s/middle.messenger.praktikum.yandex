const profileTmpl = `
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
                                    "value": "pochta@yandex.ru",
                                }, {
                                    "name": "Логин",
                                    "value": "ivanivanov",
                                }, {
                                    "name": "Имя",
                                    "value": "Иван",
                                }, {
                                    "name": "Фамилия",
                                    "value": "Иванов",
                                }, {
                                    "name": "Имя в чате",
                                    "value": "Иван",
                                }, {
                                    "name": "Телефон",
                                    "value": "+7 (909) 967 30 30",
                                }];
                            each val in profileINfo
                                .profile-info-block
                                    .profile-info-block-name= val.name
                                    .profile-info-block-value= val.value
                        .profile-buttons
                            .profile-buttons-block
                                !=buttonChangeInfo
                            .profile-buttons-block
                                !=buttonChangePassword
                            .profile-buttons-block
                                !=buttonExit
`;

export default profileTmpl;
