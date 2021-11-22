import { UploadedFile } from "express-fileupload";
import { injectable } from "inversify";
import * as fs from 'fs';
import { v4 as uuidV4 } from 'uuid'
import { CONFIG } from "../config";

@injectable()
export class FileService {

    public saveFile(file: UploadedFile): string {
        const fileName = `${Date.now()}_${uuidV4()}.${file.name.split('.').pop()}`;
        file.mv(`${process.cwd()}/${CONFIG.FILES_DIR}/${fileName}`);

        return fileName;
    }

    public deleteFile(fileName: string): void {
        fs.unlinkSync(`${process.cwd()}/${CONFIG.FILES_DIR}/${fileName}`);
    }
    public static getPublicUrl(fileName: string): string {
        return `${CONFIG.PUBLIC_ADDRESS}/${CONFIG.FILES_DIR}/${fileName}`;
    }

    public static getFilePath(fileName: string): string {
        return `${CONFIG.FILES_DIR}/${fileName}`;
    }
}