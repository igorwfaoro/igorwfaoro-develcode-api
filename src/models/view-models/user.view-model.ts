import { DateHelper } from "../../common/helpers/date.helper";
import { User } from "../entities/user";

export class UserViewModel {

    public id: number;
    public code: string;
    public name: string;
    public birthDate: string;
    public profileImage?: string;
    public profileImageUrl?: string;
    public createdAt: string;

    public static fromEntity(u: User): UserViewModel {

        if (!u)
            return null;

        const user = new UserViewModel();

        user.id = u.id;
        user.code = u.code;
        user.name = u.name;
        user.birthDate = DateHelper.toStringViewModel(u.birthDate);
        user.profileImage = u.profileImage;
        user.profileImageUrl = u.getProfileImageUrl();
        user.createdAt = DateHelper.toStringViewModel(u.createdAt);

        return user;
    }
}