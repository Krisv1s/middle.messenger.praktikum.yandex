const chatLink = `
li.chat
    img.chat-img(src="https://fakeimg.pl/47x47/?text=png")
    .chat-block
        .chat-block-left
            span.chat-name!=title
            span.chat-message!=Изображение
        .chat-block-right
            span.chat-date 10:49
            if 2 
                span.chat-unread=2
`;

export default chatLink;
