export default class Message {
    public id: number;
    public userId: number;
    public conversation: string;
    public text: string;
    public createdAt: number;

    constructor(messageData: { [key: string]: any; });
    constructor(id: number, user_id: number, conversation: string, text: string, createdAt: number);

    constructor(id: number | { [key: string]: any; }, user_id?: number, conversation?: string, text?: string, createdAt?: number) {
        const data: { [key: string]: any; } = {
            id: 0,
            user_id: 0,
            conversation: "",
            text: "",
            created_at: 0,
        }

        if (typeof id == "object") {
            for (const key in data) {
                if (id.hasOwnProperty(key)) {
                    data[key] = id[key];
                }
            }
        } else {
            data.id = id;
            data.user_id = user_id;
            data.conversation = conversation;
            data.text = text;
            data.created_at = createdAt;
        }


        this.id = data.id;
        this.userId = data.user_id;
        this.conversation = data.conversation;
        this.text = data.text;
        this.createdAt = data.created_at;
    }
}