import React from "react";
import '../../assets/css/chatBox.css';
const ChatBox = ({store, isWithinOperatingHours}) => {
    return (
        <div class="flex flex-col justify-end h-full is-widget-right" style={{ marginTop: '71px', paddingLeft: '20px' }}>
            <div data-v-b7bd3fac="" class="w-full h-full bg-slate-25 dark:bg-slate-800" >
                <div data-v-b7bd3fac="" class="flex flex-col h-full relative">
                    <div
                        data-v-b7bd3fac=""
                        class="header-wrap sticky top-0 z-40 transition-all collapsed custom-header-shadow"
                    >
                        <header
                            data-v-b7bd3fac=""
                            class="flex justify-between p-5_chat w-full bg-white"
                        >
                            <div class="flex items-center">
                                <img
                                    src={store.image}
                                    alt="avatar"
                                    class="h-8 w-8 rounded-full mr-3"
                                />
                                <div>
                                    <div
                                        class="font-medium text-base leading-4 flex items-center text-black-900"
                                    >
                                        <span class="mr-1">{store.name}</span>
                                        <div class={`h-2 w-2 rounded-full ${isWithinOperatingHours ? 'bg-green-500' : 'bg-gray-500'}`}></div>                                      
                                    </div>
                                    <div class="text-xs mt-1 leading-3 text-black-700">
                                        Thường trả lời sau vài phút
                                    </div>
                                </div>
                            </div>
                        </header>
                    </div>
                    <div
                        data-v-b7bd3fac=""
                        class="flex flex-col flex-1 overflow-hidden rounded-b-lg bg-slate-25 dark:bg-slate-800"
                    >
                        <div class="flex flex-1 overflow-auto">
                            <div data-v-dd2501de="" class="conversation--container light-scheme">
                                <div data-v-dd2501de="" class="conversation-wrap">
                                    <div data-v-dd2501de class="messages-wrap">
                                        <div data-v-0619d2c7="" data-v-dd2501de="" class="date--separator text-slate-700">
                                            Hôm nay
                                        </div>
                                        <div
                                            data-v-ecf74328=""
                                            data-v-dd2501de=""
                                            class="user-message-wrap group"
                                            id="cwmsg-36345004"
                                        >
                                            <div class="flex gap-1 user-message">
                                                <div class="message-wrap">
                                                    <div class="flex justify-end gap-1">
                                                        <div class="flex flex-col justify-end">
                                                            {/* <button
                                                                class="p-1 mb-1 rounded-full dark:text-slate-500 dark:bg-slate-900 text-slate-600 bg-slate-100 hover:text-slate-800 transition-opacity delay-75 opacity-0 group-hover:opacity-100 sm:opacity-0"
                                                            >
                                                                <svg
                                                                    width="11"
                                                                    height="11"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    class="flex-shrink-0"
                                                                >
                                                                    <path
                                                                        d="M9.277 16.221a.75.75 0 0 1-1.061 1.06l-4.997-5.003a.75.75 0 0 1 0-1.06L8.217 6.22a.75.75 0 0 1 1.061 1.06L5.557 11h7.842c1.595 0 2.81.242 3.889.764l.246.126a6.203 6.203 0 0 1 2.576 2.576c.61 1.14.89 2.418.89 4.135a.75.75 0 0 1-1.5 0c0-1.484-.228-2.52-.713-3.428a4.702 4.702 0 0 0-1.96-1.96c-.838-.448-1.786-.676-3.094-.709L13.4 12.5H5.562l3.715 3.721Z"
                                                                        fill="currentColor"
                                                                    ></path>
                                                                </svg>
                                                            </button> */}
                                                        </div>
                                                        <div class="will-change-transform" style={{ transform: 'translateX(0px)' }}>
                                                            <div
                                                                data-v-3309eefb=""
                                                                class="chat-bubble user"
                                                                style={{ background: 'rgb(45, 135, 243)', color: 'rgb(255, 255, 255)' }}
                                                            >
                                                                <p>chào bạn</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p class="time_chat_user">10:30 AM</p>
                                                </div>
                                            </div>

                                        </div>

                                        <div
                                            data-v-ecf74328=""
                                            data-v-dd2501de=""
                                            class="agent-message-wrap group"
                                            id="cwmsg-36345036"
                                        >
                                            <div class="agent-message">
                                                <div class="avatar-wrap">
                                                    <div
                                                        data-v-478e95b6=""
                                                        title=""
                                                        class="user-thumbnail-box is-rounded"
                                                        style={{ height: '24px', width: '24px' }}
                                                    >
                                                        <img
                                                            alt=""
                                                            data-v-478e95b6=""
                                                            src={store.image}
                                                            class="avatar-container user-thumbnail thumbnail-rounded"
                                                        />

                                                    </div>
                                                </div>
                                                <div class="message-wrap">
                                                    <div class="flex gap-1">
                                                        <div
                                                            class="will-change-transform space-y-2"
                                                            style={{ transform: 'translateX(0px)' }}
                                                        >
                                                            <div class="chat-bubble-wrap">
                                                                <div class="chat-bubble agent bg-white">
                                                                    <div class="message-content text-slate-900 dark:text-slate-50">
                                                                        <p>
                                                                            Dạ vâng chào bạn, cửa hàng có thể hỗ trợ thông tin gì cho
                                                                            mình ạ?
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="flex flex-col justify-end">
                                                            <button
                                                                class="p-1 mb-1 rounded-full dark:text-slate-500 dark:bg-slate-900 text-slate-600 bg-slate-100 hover:text-slate-800 transition-opacity delay-75 opacity-0 group-hover:opacity-100 sm:opacity-0"
                                                            >
                                                                <svg
                                                                    width="11"
                                                                    height="11"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    class="flex-shrink-0"
                                                                >
                                                                    <path
                                                                        d="M9.277 16.221a.75.75 0 0 1-1.061 1.06l-4.997-5.003a.75.75 0 0 1 0-1.06L8.217 6.22a.75.75 0 0 1 1.061 1.06L5.557 11h7.842c1.595 0 2.81.242 3.889.764l.246.126a6.203 6.203 0 0 1 2.576 2.576c.61 1.14.89 2.418.89 4.135a.75.75 0 0 1-1.5 0c0-1.484-.228-2.52-.713-3.428a4.702 4.702 0 0 0-1.96-1.96c-.838-.448-1.786-.676-3.094-.709L13.4 12.5H5.562l3.715 3.721Z"
                                                                        fill="currentColor"
                                                                    ></path>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <p class="time_chat_agent">10:30 AM</p>
                                                </div>
                                            </div>

                                        </div>

                                        <div
                                            data-v-ecf74328=""
                                            data-v-dd2501de=""
                                            class="user-message-wrap group"
                                            id="cwmsg-36345022"
                                        >
                                            <div class="flex gap-1 user-message">
                                                <div class="message-wrap">
                                                    <div class="flex justify-end gap-1">
                                                        <div class="flex flex-col justify-end">
                                                            <button
                                                                class="p-1 mb-1 rounded-full dark:text-slate-500 dark:bg-slate-900 text-slate-600 bg-slate-100 hover:text-slate-800 transition-opacity delay-75 opacity-0 group-hover:opacity-100 sm:opacity-0"
                                                            >
                                                                <svg
                                                                    width="11"
                                                                    height="11"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    class="flex-shrink-0"
                                                                >
                                                                    <path
                                                                        d="M9.277 16.221a.75.75 0 0 1-1.061 1.06l-4.997-5.003a.75.75 0 0 1 0-1.06L8.217 6.22a.75.75 0 0 1 1.061 1.06L5.557 11h7.842c1.595 0 2.81.242 3.889.764l.246.126a6.203 6.203 0 0 1 2.576 2.576c.61 1.14.89 2.418.89 4.135a.75.75 0 0 1-1.5 0c0-1.484-.228-2.52-.713-3.428a4.702 4.702 0 0 0-1.96-1.96c-.838-.448-1.786-.676-3.094-.709L13.4 12.5H5.562l3.715 3.721Z"
                                                                        fill="currentColor"
                                                                    ></path>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div class="will-change-transform" style={{ transform: 'translateX(0px)' }}>
                                                            <div
                                                                class="chat-bubble has-attachment user"
                                                                style={{ backgroundColor: 'rgb(45, 135, 243)' }}
                                                            >
                                                                <div>
                                                                    <a
                                                                        data-v-674f83bd=""
                                                                        href="https://app.chatwoot.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNHFXaFE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--a4737d494403582599d560108140e3ca2c08d3c3/download%20(3).jpg"
                                                                        target="_blank"
                                                                        rel="noreferrer noopener nofollow"
                                                                        class="image"
                                                                    ><div data-v-674f83bd="" class="wrap">
                                                                            <img
                                                                                data-v-674f83bd=""
                                                                                src="https://app.chatwoot.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNHFXaFE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--a4737d494403582599d560108140e3ca2c08d3c3/download%20(3).jpg"
                                                                                alt="message"
                                                                            />
                                                                            <span data-v-674f83bd="" class="time">10:30 AM</span>
                                                                        </div></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                        <footer data-v-7145e03c="" class="relative z-50 mb-1 px-5_chat rounded-lg">
                            <div
                                data-v-17dc3314=""
                                data-v-7145e03c=""
                                class="chat-message--input is-focused shadow-sm bg-white"
                            >
                                <textarea
                                    data-v-17dc3314=""
                                    placeholder="Gõ tin nhắn của bạn"
                                    rows="1"
                                    id="chat-input"
                                    aria-label="Gõ tin nhắn của bạn"
                                    class="form-input user-message-input is-focused bg-white text-black-900"
                                ></textarea>
                                <div data-v-17dc3314="" class="button-wrap">
                                    <span
                                        data-v-17dc3314=""
                                        class="file-uploads file-uploads-html5 text-black-900"
                                    ><button class="icon-button flex items-center justify-center">
                                            <svg
                                                width="20"
                                                height="20"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M11.772 3.743a6 6 0 0 1 8.66 8.302l-.19.197-8.8 8.798-.036.03a3.723 3.723 0 0 1-5.489-4.973.764.764 0 0 1 .085-.13l.054-.06.086-.088.142-.148.002.003 7.436-7.454a.75.75 0 0 1 .977-.074l.084.073a.75.75 0 0 1 .074.976l-.073.084-7.594 7.613a2.23 2.23 0 0 0 3.174 3.106l8.832-8.83A4.502 4.502 0 0 0 13 4.644l-.168.16-.013.014-9.536 9.536a.75.75 0 0 1-1.133-.977l.072-.084 9.549-9.55h.002Z"
                                                    fill="currentColor"
                                                ></path>
                                            </svg>
                                        </button>
                                        <label for="file"></label>
                                        <input
                                            type="file"
                                            name="file"
                                            id="file"
                                            accept="image/*,audio/*,video/*,.3gpp,text/csv, text/plain, application/json, application/pdf, text/rtf,application/zip, application/x-7z-compressed application/vnd.rar application/x-tar,application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/vnd.oasis.opendocument.text,application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document,"
                                        /></span>
                                    {/* <button
                                        data-v-17dc3314=""
                                        aria-label="Emoji picker"
                                        class="flex items-center justify-center icon-button"
                                    >
                                        <svg
                                            data-v-17dc3314=""
                                            width="20"
                                            height="20"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="text-black-900"
                                        >
                                            <path
                                                d="M12 1.999c5.524 0 10.002 4.478 10.002 10.002 0 5.523-4.478 10.001-10.002 10.001-5.524 0-10.002-4.478-10.002-10.001C1.998 6.477 6.476 1.999 12 1.999Zm0 1.5a8.502 8.502 0 1 0 0 17.003A8.502 8.502 0 0 0 12 3.5ZM8.462 14.784A4.491 4.491 0 0 0 12 16.502a4.492 4.492 0 0 0 3.535-1.714.75.75 0 1 1 1.177.93A5.991 5.991 0 0 1 12 18.002a5.991 5.991 0 0 1-4.716-2.29.75.75 0 0 1 1.178-.928ZM9 8.75a1.25 1.25 0 1 1 0 2.499A1.25 1.25 0 0 1 9 8.75Zm6 0a1.25 1.25 0 1 1 0 2.499 1.25 1.25 0 0 1 0-2.499Z"
                                                fill="currentColor"
                                            ></path>
                                        </svg>
                                    </button> */}
                                </div>
                            </div>
                        </footer>
                    </div>
                    <div data-v-448a7326="" data-v-b7bd3fac="" style={{ padding: "0.75rem" }}></div>
                </div>
            </div>
        </div>
    )
}

export default ChatBox

