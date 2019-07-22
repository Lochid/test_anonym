import { Message } from "../core";

export default interface IMessageRepository {
    Create(message: Message): Promise<Message | undefined>;
    ReadConversationList(): Promise<{ [conversation: string]: Message }>
}