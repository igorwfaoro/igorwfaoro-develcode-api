import { DateHelper } from "../../common/helpers/date.helper";
import { User } from "../entities/user";

export class UserViewModel {

    public id: number;
    public code: string;
    public name: string;
    public birthday: string;
    public profileImage?: string;
    public isActive: boolean;
    public createdAt: string;

    public static fromEntity(u: User): UserViewModel {

        if (!u)
            return null;

        const user = new UserViewModel();

        user.id = u.id;
        user.code = u.code;
        user.name = u.name;
        user.birthday = DateHelper.toStringViewModel(u.birthday);
        user.profileImage = u.getProfileImageUrl();
        user.isActive = u.isActive;
        user.createdAt = DateHelper.toStringViewModel(u.createdAt);

        return user;
    }
}