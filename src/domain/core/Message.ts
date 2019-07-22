export default class Message {
    public id: number;
    public userId: number;
    public conversation: string;
    public text: string;
    public createdAt: number;

    constructor(messageData: { [key: string]: any; });
    constructor(id: number, user_id: number, conversation: string, text: string, createdAt: number);

    constructor(id: number | { [key: string]: any; }, user_id?: number, conversation?: string, text?: string, createdAt?: number) {
        let data: { [key: string]: any; };

        if (typeof id == "object") {
            data = {
                ...id
            }
        } else {
            data = {
                id,
                user_id,
                conversation,
                text,
                created_at: createdAt
            }
        }

        this.id = data.id;
        this.userId = data.user_id;
        this.conversation = data.conversation;
        this.text = data.text;
        this.createdAt = data.created_at;
    }
}