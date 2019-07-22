import { Connection } from "mysql";
import { Message } from "../../../domain/core";
import { IMessageRepository } from "../../../domain/interfaces";

const createQuery = `INSERT INTO messages(
    user_id,
    conversation,
    text
) VALUES (
    ?,
    ?,
    ?
);
`;

const readConversationListQuery = `SELECT id, user_id, conversation, text, created_at
    FROM messages 
    GROUP BY conversation, user_id, id, text, created_at
    HAVING COUNT(*) = 1;`;

const readMessageByIDQuery = `SELECT *
                    FROM messages 
                    WHERE id=?;`;

export default class MessageRepository implements IMessageRepository {
    constructor(private connection: Connection) { }

    Create(user: Message): Promise<Message | undefined> {
        return new Promise<Message | undefined>((resolve, reject) => {
            this.connection.query(createQuery,
                [
                    user.userId,
                    user.conversation,
                    user.text,
                ],
                async (error, res) => {
                    const lastID = res.insertId;
                    if (error) {
                        return reject(error);
                    }

                    return resolve(await this.ReadMessageByID(lastID));
                });
        });
    }


    ReadConversationList(): Promise<{ [conversation: string]: Message }> {
        return new Promise<{ [conversation: string]: Message }>((resolve, reject) => {
            this.connection.query(readConversationListQuery, [], (error, results, fields) => {
                if (error) {
                    return reject(error);
                }

                if (fields != undefined && results != undefined) {
                    const conversations = {} as { [conversation: string]: Message }
                    for (const res of results) {
                        const data: { [key: string]: any; } = {};
                        for (const field of fields) {
                            data[field.name] = res[field.name];
                        }

                        const conv = new Message(data);
                        conversations[conv.conversation] = conv;
                    }

                    return resolve(conversations);
                }

                resolve({});
            });
        });
    }


    ReadMessageByID(id: string): Promise<Message> {
        return new Promise<Message>((resolve, reject) => {
            this.connection.query(readMessageByIDQuery, [id], (error, results, fields) => {
                if (error) {
                    return reject(error);
                }

                if (fields != undefined && results != undefined && results[0] != undefined) {
                    const res = results[0]
                    const data: { [key: string]: any; } = {};
                    for (const field of fields) {
                        data[field.name] = res[field.name];
                    }

                    const message = new Message(data);

                    return resolve(message);
                }

                resolve(undefined);
            });
        });
    }
}