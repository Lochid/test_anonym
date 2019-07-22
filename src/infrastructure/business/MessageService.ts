import {
    injectable,
    inject,
} from 'inversify';
import { Message } from '../../domain/core';
import { IMessageService } from '../../services/interfaces';
import { DATABASE } from '../../constants/identifiers';
import { IRepositoryPool, IMessageRepository } from '../../domain/interfaces';
import { EventEmitter } from 'events';

@injectable()
export default class MessageService implements IMessageService {
    private messageRepository: IMessageRepository;
    private emitter: EventEmitter = new EventEmitter();

    constructor(@inject(DATABASE) repositoryPool: IRepositoryPool) {
        this.messageRepository = repositoryPool.MessageRepository();
    }

    Send(userId: number, conversation: string, text: string): Promise<Message | undefined> {
        const message = this.messageRepository.Create(new Message(0, userId, conversation, text, 0));

        if (message != null) {
            this.emitter.emit("message", message);
        }

        return message;
    }

    ReadConversationList(): Promise<{ [conversation: string]: Message }> {
        return this.messageRepository.ReadConversationList();
    }

    on(event: 'message', listener: (this: IMessageService, message: Message) => void): this;
    on(event: 'message', listener: (this: IMessageService, ...params: any[]) => void): this {
        this.emitter.on(event, listener);
        return this;
    }
}
