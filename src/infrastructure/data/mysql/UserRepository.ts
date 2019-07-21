import { Connection } from "mysql";
import { User } from "../../../domain/core";
import { IUserRepository } from "../../../domain/interfaces";

const createQuery = `INSERT INTO users(
    login,
    password_hash
) VALUES (
    ?,
    ?
);`;

const readByLoginQuery = `SELECT * FROM users WHERE login=?;`;

const banUserQuery = `UPDATE users SET banned=true WHERE id=?;`;

export default class UserRepository implements IUserRepository {
    constructor(private connection: Connection) { }

    Create(user: User): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.connection.query(createQuery,
                [
                    user.login,
                    user.passwordHash,
                ],
                (error) => {
                    if (error) {
                        return reject(error);
                    }

                    return resolve();
                });
        });
    }


    ReadByLogin(login: string): Promise<User | undefined> {
        return new Promise<User | undefined>((resolve, reject) => {
            this.connection.query(readByLoginQuery,
                [
                    login,
                ],
                (error, results, fields) => {
                    if (error) {
                        return reject(error);
                    }

                    if (fields != undefined && results != undefined && results[0] != undefined) {
                        const res = results[0];
                        const data: { [key: string]: any; } = {};
                        for (const field of fields) {
                            data[field.name] = res[field.name];
                        }

                        return resolve(new User(data));
                    }

                    resolve(undefined);
                });
        });
    }

    Ban(id: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.connection.query(banUserQuery,
                [
                    id,
                ],
                (error) => {
                    if (error) {
                        return reject(error);
                    }

                    return resolve();
                });
        });
    }
}