import { Message } from "../../domain/core";

export default interface IMessageService {
    Send(userId: number, conversation: string, text: string): Promise<Message | undefined>;

    on(event: 'message', listener: (this: IMessageService, message: Message) => void): this;
}