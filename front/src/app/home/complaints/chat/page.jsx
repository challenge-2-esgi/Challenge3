'use client'

import withRoleGuard from '@/HOC/withRoleGuard';
import ItemConversation from '@/components/Chat/ConversationHistory/ItemConversation';
import ListConversation from '@/components/Chat/ConversationHistory/ListConversation';
import FooterMessage from '@/components/Chat/Messages/FooterMessage';
import HeaderMessage from '@/components/Chat/Messages/HeaderMessage';
import Message from '@/components/Chat/Messages/Message';
import { role } from '@/constants'

const listConversation = [
    {
        avatar: '/assets/user-03-3c4ef32c.png',
        name: 'Henry Dholi',
        lastMessage: 'I cam across your profile and...',
        isActive: true
    },
    {
        avatar: '/assets/user-04-04f11146.png',
        name: 'Mariya Desoja',
        lastMessage: 'I like your confidence 💪',
    },
    {
        avatar: '/assets/user-05-d5425ed5.png',
        name: 'Robert Jhon',
        lastMessage: 'Can you share your offer?',
    },
    {
        avatar: '/assets/user-01-b007ff3f.png',
        name: 'Cody Fisher',
        lastMessage: 'I\'m waiting for you response!',
    },
    {
        avatar: '/assets/user-02-5a304001.png',
        name: 'Jenny Wilson',
        lastMessage: 'I cam across your profile and...',
    }
];

const listMessage = [
    {
        "sender": "Andri Thomas",
        "message": "I want to make an appointment tomorrow from 2:00 to 5:00pm?",
        "time": "1:55pm"
    },
    {
        "sender": "You",
        "message": "Hello, Thomas! I will check the schedule and inform you",
        "time": "1:55pm"
    },
    {
        "sender": "Andri Thomas",
        "message": "Ok, Thanks for your reply.",
        "time": "1:55pm"
    },
    {
        "sender": "You",
        "message": "You are welcome!",
        "time": "1:55pm"
    },
    {
        "sender": "Andri Thomas",
        "message": "I want to make an appointment tomorrow from 2:00 to 5:00pm?",
    },
    {
        "sender": "You",
        "message": "Hello, Thomas! I will check the schedule and inform you",
    },
    {
        "sender": "Andri Thomas",
        "message": "Ok, Thanks for your reply.",
    },
    {
        "sender": "You",
        "message": "You are welcome!",
    }
];

const ComplaintsChatPage = () => {
    return (
        <div className="flex flex-col h-full">
            <div className="h-[calc(100vh-186px)] overflow-hidden sm:h-[calc(100vh-174px)]">
                <div className="h-full rounded-sm border border-stroke bg-white shadow-default xl:flex">
                   <ListConversation>
                        {listConversation.map((item, index) => (
                            <ItemConversation key={index} {...item}/>
                        ))}
                    </ListConversation>
                    <div className="flex h-full flex-col border-l border-stroke xl:w-3/4">
                        <HeaderMessage avatar={"/assets/user-01-b007ff3f.png"} name="Henry Dholi"/>
                        
                        <div className="no-scrollbar max-h-full space-y-3.5 overflow-auto px-6 py-7.5">
                            { listMessage.map((item, index) => (
                                <Message key={index} name={item.sender} message={item.message} time={item.time} isMe={item.sender == "You"} />
                            ))
                            }
                        </div>

                        <FooterMessage/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRoleGuard([role.admin, role.support], ComplaintsChatPage)
