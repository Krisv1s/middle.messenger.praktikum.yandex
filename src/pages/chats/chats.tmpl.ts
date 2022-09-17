const chatsTmpl = `
.chats
        .chats-left
            .chats-left-button
                !=buttonProfile
            .chats-left-input
                input(class="input-search" placeholder="Поиск")
            ul.chats-left-list
                li.chat
                    img.chat-img(alt="")
                    .chat-block
                        .chat-block-left
                            span.chat-name New chat
                        .chat-block-right
                            !=buttonNewChat
                !=chatFirst
                !=chatSecond
        .chats-right
            form(class='form' style="position: fixed;display: none;" id="create_chat")
                .form-first
                    h1(class="form-title") Новый чатик
                    !=inputNameChat
                .form-second
                    !=buttonCreateChat
                    !=buttonHide
            form(class='form' style="position: fixed;display: none;" id="add_new_user")
                .form-first
                    h1(class="form-title") Добавить пользователя
                    !=inputUserId
                .form-second
                    !=buttonAddUserSubmit
                    !=buttonHideAddUser
            form(class='form' style="position: fixed;display: none;" id="delete_user")
                .form-first
                    h1(class="form-title") Удалить пользователя
                    !=inputUserIdDelete
                .form-second
                    !=buttonDeleteUserSubmit
                    !=buttonHideDeleteUser
            span.chats-right-text Выберите чат чтобы отправить сообщение
            if currectChat
                .chats-right-block
                    .chats-right-header
                        .chats-right-header-left
                            img.chats-right-header-avatar(src=currectChat.avatar)
                            span.chats-right-header-name=currectChat.title
                        .chats-right-header-right.dropdown
                            <button class="button button-profile-link">
                                <span> 
                                    <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="1.5" cy="2" r="1.5" fill="#1E1E1E"></circle>
                                    <circle cx="1.5" cy="8" r="1.5" fill="#1E1E1E"></circle>
                                    <circle cx="1.5" cy="14" r="1.5" fill="#1E1E1E"></circle>
                                    </svg>
                                </span>
                            </button>
                            <div class="dropdown-content">
                                !=buttonAddUserToChat
                                !=buttonDeleteUserFromChat
                            </div>
                    .chats-right-chat
                    .chats-right-footer
                        .chats-right-footer-left
                            !=inputMessage
                        .chats-right-footer-right
                            !=buttonSendMessage`;

export default chatsTmpl;
