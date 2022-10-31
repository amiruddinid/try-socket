import {
    createApi,
    fetchBaseQuery
} from '@reduxjs/toolkit/query/react'
import {
    io
} from 'socket.io-client';

let socket;

function getSocket() {
    if (!socket) {
        socket = io('localhost:8000');
    }
    return socket;
}

export const api = createApi({
    reducerPath: 'chat',
    baseQuery: fetchBaseQuery({
        baseUrl: '/'
    }),
    endpoints: (builder) => ({
        sendMessage: builder.mutation({
            queryFn: (chatMessageContent) => {
                const socket = getSocket();
                return new Promise(resolve => {
                    socket.emit("chat message", chatMessageContent, (message) => {
                        resolve({
                            data: message
                        });
                    });
                })
            },
        }),
        getMessages: builder.query({
            queryFn: () => ({
                data: []
            }),
            async onCacheEntryAdded(
                arg, {
                    cacheDataLoaded,
                    cacheEntryRemoved,
                    updateCachedData
                },
            ) {
                try {
                    await cacheDataLoaded;

                    const socket = getSocket();

                    socket.on("incoming message", (message) => {
                        updateCachedData((draft) => {
                            draft.push(message)
                        })
                    });

                    await cacheEntryRemoved;

                    socket.off("incoming message");
                } catch {
                    // if cacheEntryRemoved resolved before cacheDataLoaded,
                    // cacheDataLoaded throws
                }
            },
        }),
    }),
})

export const {
    useSendMessageMutation,
    useGetMessagesQuery
} = api