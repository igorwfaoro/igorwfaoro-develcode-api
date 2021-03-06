import { injectable } from "inversify";
import { UserViewModel } from "../models/view-models/user.view-model";
import { NotFoundException } from "../common/exceptions/not-fount.exception";
import { User } from "../models/entities/user";
import { Op } from "sequelize";
import { UserFilter } from "../models/input-models/filter/user.filter";
import { UserInputModel } from "../models/input-models/user.input-model";
import * as moment from 'moment-timezone';
import { inject } from "inversify";
import { FileService } from "./file.service";
import { AlreadyExistsException } from "../common/exceptions/already-exists.exception";

@injectable()
export class UserService {

    constructor(
        @inject(FileService) private _fileService: FileService
    ) { }

    public async getAll(filter: UserFilter): Promise<UserViewModel[]> {

        const limit = Number(filter.limit || 20);
        const offset = Number((filter.index || 0) * limit);

        const whereAnd = []

        if (filter.q) {
            whereAnd.push({
                [Op.or]: [
                    { code: filter.q },
                    { name: { [Op.like]: `%${filter.q}%` } }
                ]
            });
        }

        const users: User[] = await User.findAll({
            where: {
                [Op.and]: whereAnd
            },
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });

        return users.map(UserViewModel.fromEntity);
    }

    public async getById(id: number): Promise<UserViewModel> {

        const user = await User.findOne({
            where: { id }
        });

        if (!user)
            throw new NotFoundException('User not found');

        return UserViewModel.fromEntity(user);
    }

    public async create(input: UserInputModel, profileImageFile?: any): Promise<UserViewModel> {

        if ((await this.codeExists(input.code)).exists)
            throw new AlreadyExistsException('Code already exists');

        const user = User.createModel({
            code: input.code.toUpperCase(),
            name: input.name,
            birthDate: moment.utc(input.birthDate).toDate(),
        });

        if (profileImageFile) {
            const fileName = this._fileService.saveFile(profileImageFile);
            user.profileImage = fileName;
        }

        await user.save();

        return UserViewModel.fromEntity(user);
    }

    public async update(input: UserInputModel, profileImageFile?: any): Promise<UserViewModel> {

        const user = await User.findOne({
            where: {
                id: input.id
            }
        });

        if (!user)
            throw new NotFoundException('User not found');

        if ((await this.codeExists(input.code, input.id)).exists)
            throw new AlreadyExistsException('Code already exists');

        user.code = input.code.toUpperCase();
        user.name = input.name;
        user.birthDate = moment.utc(input.birthDate).toDate();

        if (profileImageFile) {

            if (user.profileImage)
                this._fileService.deleteFile(user.profileImage);

            const fileName = this._fileService.saveFile(profileImageFile);
            user.profileImage = fileName;
        }

        if (input.removeProfileImage && user.profileImage) {
            this._fileService.deleteFile(user.profileImage);
            user.profileImage = null;
        }

        await user.save();

        return UserViewModel.fromEntity(user);
    }

    public async delete(id: number): Promise<void> {

        await User.destroy({
            where: { id }
        });
    }

    public async codeExists(code: string, userId?: number): Promise<{ exists: boolean }> {

        const user = await User.findOne({
            where: {
                code: { [Op.like]: code }
            }
        });

        if (!user)
            return { exists: false };

        if (userId && user.id == userId)
            return { exists: false };

        return { exists: !!user };
    }
}