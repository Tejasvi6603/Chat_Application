import Talk from 'talkjs';
import { useEffect, useState, useRef } from 'react';

function MyChatComponent() {
  const chatboxEl = useRef();

  // wait for TalkJS to load
  const [talkLoaded, markTalkLoaded] = useState(false);

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));

    if (talkLoaded) {
      const currentUser = new Talk.User({
        id: '1',
        name: 'Henry Mill',
        email: 'henrymill@example.com',
        photoUrl: 'henry.jpeg',
        welcomeMessage: 'Hello!',
        role: 'default',
      });

      const user2 = new Talk.User({
        id: '2',
        name: 'Jessica Wells',
        email: 'jessicawells@example.com',
        photoUrl: 'jessica.jpeg',
        welcomeMessage: 'Hello!',
        role: 'default',
      });

      const user3 = new Talk.User({
        id: '3',
        name: 'John Doe',
        email: 'johndoe@example.com',
        photoUrl: 'john.jpeg',
        welcomeMessage: 'Hello!',
        role: 'default',
      });

      const session = new Talk.Session({
        appId: 'tL2X5Mj7',
        me: currentUser,
      });

      // Create or retrieve the conversation with the group's unique ID
      const conversationId = 'group_chat';
      const conversation = session.getOrCreateConversation(conversationId);

      // Add participants to the conversation
      conversation.setParticipant(currentUser);
      conversation.setParticipant(user2);
      conversation.setParticipant(user3);

      // Create a chatbox for the conversation
      const chatbox = session.createChatbox(conversation);
      chatbox.mount(chatboxEl.current);

      return () => session.destroy();
    }
  }, [talkLoaded]);

  return <div ref={chatboxEl} />;
}

export default MyChatComponent;
