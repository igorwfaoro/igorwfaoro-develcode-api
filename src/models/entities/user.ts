import { AllowNull, Column, CreatedAt, Default, Table, Unique, UpdatedAt } from "sequelize-typescript";
import { FileService } from "../../services/file.service";
import { Entity } from "../abstraction/entity";

@Table({
    tableName: 'Users',
    timestamps: true
})
export class User extends Entity<User> {

    public static createModel(input: {
        code: string;
        name: string;
        birthday: Date;
    }): User {
        const user = new User(input as any);

        user.code = input.code;
        user.name = input.name;
        user.birthday = input.birthday;

        return user;
    }

    @AllowNull(false)
    @Unique
    @Column
    public code: string;

    @AllowNull(false)
    @Column
    public name: string;

    @AllowNull(false)
    @Unique
    @Column
    public birthday: Date;

    @Column
    public profileImage?: string;

    @AllowNull(false)
    @Default(true)
    @Column
    public isActive: boolean;

    @AllowNull(false)
    @CreatedAt
    @Column
    public createdAt: Date;

    @AllowNull(false)
    @UpdatedAt
    @Column
    public updatedAt: Date;

    public getProfileImageUrl(): string {
        if (!this.profileImage)
            return this.getAvatarImageNameInitials(this.name || 'user');
        else
            return FileService.getPublicUrl(this.profileImage);
    }

    private getAvatarImageNameInitials(name: string): string {

        const colors = [
            '1abc9c',
            '2ecc71',
            '3498db',
            '34495e',
            '16a085',
            '27ae60',
            '2980b9',
            '2c3e50',
            'e67e22',
            'e74c3c',
            'f39c12',
            'd35400',
            'c0392b',
        ];

        // get random color by user name
        const seed = name.split('').reduce((prev, curr) => prev + curr.charCodeAt(0), 0);
        const index = seed % colors.length;
        const color = colors[index];

        return `https://ui-avatars.com/api/?name=${this.name}&background=${color}&color=fff&bold=true&size=200`;
    }


}