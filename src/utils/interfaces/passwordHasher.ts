export default interface IPasswordHasher {
    generate(password: string): string;
    verify(password: string, passwordHash: string): boolean;
}