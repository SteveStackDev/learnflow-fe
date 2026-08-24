/**
 * Mock data cuộc trò chuyện & nhắn tin cho FySet (mockChat.js)
 */

export const mockChatData = {
  conversations: [
    {
      id: "chat-1",
      name: "AI Mentor",
      role: "Trợ lý AI lập trình",
      avatar: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=150&auto=format&fit=crop&q=80",
      isOnline: true,
      statusText: "Đang trực tuyến",
      unreadCount: 0,
      isGroup: false,
      type: "direct",
      lastMessage: "Đoạn code bạn gửi đã được sửa lỗi key prop!",
      lastTime: "Vừa xong",
      messages: [
        {
          id: "m-1",
          sender: "them",
          time: "09:41",
          text: "Chào bạn! Bạn cần tôi giúp gì với lộ trình học ReactJS hôm nay không?",
        },
        {
          id: "m-2",
          sender: "me",
          time: "09:45",
          text: "Tôi đang gặp lỗi khi sử dụng vòng lặp map trong React. Đoạn code của tôi đây:",
          codeSnippet: `const userList = users.map(user => {\n  return <li>{user.name}</li>;\n});`,
        },
        {
          id: "m-3",
          sender: "them",
          time: "09:46",
          text: "Lỗi này xảy ra vì trong React, mỗi phần tử được render ra từ một mảng cần phải có một thuộc tính key duy nhất. Bạn nên sửa lại như sau:",
          codeSnippet: `const userList = users.map(user => {\n  return <li key={user.id}>{user.name}</li>;\n});`,
        },
        {
          id: "m-4",
          sender: "them",
          time: "09:47",
          text: "Hãy đảm bảo rằng 'user.id' là một giá trị duy nhất cho mỗi user nhé. Nếu có thắc mắc thêm hãy hỏi tôi bất cứ lúc nào!",
        },
      ],
    },
    {
      id: "chat-2",
      name: "Study Group: React Pros",
      role: "Nhóm học tập 12 thành viên",
      avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80",
      isOnline: true,
      statusText: "12 thành viên • 4 online",
      unreadCount: 2,
      isGroup: true,
      type: "group",
      lastMessage: "Ai đó giải thích giúp mình useEffect cleanup với!",
      lastTime: "10:30",
      messages: [
        {
          id: "m2-1",
          sender: "them",
          time: "10:15",
          text: "Mọi người đã làm xong bài tập về Redux Toolkit tuần này chưa?",
        },
        {
          id: "m2-2",
          sender: "me",
          time: "10:20",
          text: "Mình làm xong rồi nhé, đoạn async thunk viết rất mượt!",
        },
        {
          id: "m2-3",
          sender: "them",
          time: "10:30",
          text: "Ai đó giải thích giúp mình useEffect cleanup function hoạt động khi nào với!",
        },
      ],
    },
    {
      id: "chat-3",
      name: "Cộng Đồng Frontend FySet",
      role: "Nhóm trao đổi kinh nghiệm",
      avatar: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=150&auto=format&fit=crop&q=80",
      isOnline: true,
      statusText: "48 thành viên",
      unreadCount: 5,
      isGroup: true,
      type: "group",
      lastMessage: "Sắp có contest Frontend mới tuần này mọi người nhé!",
      lastTime: "11:15",
      messages: [
        {
          id: "m4-1",
          sender: "them",
          time: "11:15",
          text: "Sắp có contest Frontend mới tuần này mọi người nhé!",
        },
      ],
    },
    {
      id: "chat-4",
      name: "Hỗ trợ kỹ thuật",
      role: "Ban Quản Trị FySet",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      isOnline: false,
      statusText: "Hoạt động 1 giờ trước",
      unreadCount: 0,
      isGroup: false,
      type: "direct",
      lastMessage: "Yêu cầu nâng cấp tài khoản Pro của bạn đã hoàn tất.",
      lastTime: "Hôm qua",
      messages: [
        {
          id: "m3-1",
          sender: "them",
          time: "14:20",
          text: "Xin chào! Yêu cầu nâng cấp gói tài khoản Pro của bạn đã hoàn tất thành công. Chúc bạn có trải nghiệm học tập tuyệt vời tại FySet!",
        },
      ],
    },
  ],
};

export default mockChatData;
