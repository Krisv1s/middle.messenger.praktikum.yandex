const chatLink = `
li.chat
    img.chat-img(src="https://fakeimg.pl/47x47/?text=png")
    .chat-block
        .chat-block-left
            span.chat-name!=title
            span.chat-message!=content
        .chat-block-right
            span.chat-date!=time
            if unread_count 
                span.chat-unread!=unread_count
`;

export default chatLink;
