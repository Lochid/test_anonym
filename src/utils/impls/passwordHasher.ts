import {
    generate,
    verify,
} from "password-hash"
import {
    injectable,
} from 'inversify';

@injectable()
export default class PasswordHasher {
    constructor() { }

    generate(password: string): string {
        return generate(password);
    }
    verify(password: string, passwordHash: string): boolean {
        return verify(password, passwordHash);
    }
}