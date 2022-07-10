import React from "react";
import { Button, FlatList, Text, View } from "react-native";
import useWebSocket, { ReadyState } from "react-native-use-websocket";
import { style } from "./WebsocketStyle";

const Websocket = (props) => {
	const [socketUrl] = React.useState("ws://164.92.234.83:6002");
	const messageHistory = React.useRef([]);

	const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

	messageHistory.current = React.useMemo(
		() => messageHistory.current.concat(lastMessage),
		[lastMessage]
	);

	const sendM = () => sendMessage("Hello");

	const handleClickSendMessage = React.useCallback(sendM, [sendM]);

	const connectionStatus = {
		[ReadyState.CONNECTING]: "Connecting",
		[ReadyState.OPEN]: "Open",
		[ReadyState.CLOSING]: "Closing",
		[ReadyState.CLOSED]: "Closed",
		[ReadyState.UNINSTANTIATED]: "Uninstantiated",
	}[readyState];

	return (
		<View style={style.wrapper}>
			<Text>Sockets are funs</Text>

			<Button
				onPress={handleClickSendMessage}
				disabled={readyState !== ReadyState.OPEN}
				title={"Click Me to send 'Hello'"}>
				Hello
			</Button>
			<Text>The WebSocket is currently {connectionStatus}</Text>
			{lastMessage ? <Text>Last message: {lastMessage.data}</Text> : null}
			<FlatList
				keyExtractor={(item, i) => {
					return i.toString();
				}}
				data={messageHistory.current}
				renderItem={({ item }) =>
					item && item.message && <Text>{item.message.data}</Text>
				}
			/>
		</View>
	);
};

export default Websocket;
