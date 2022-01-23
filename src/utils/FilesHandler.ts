import {join} from "path";
import {statSync, readdirSync} from "fs";

const isDirectory = (path: any) => statSync(path).isDirectory();
const getDirectories = (path: string) =>
    readdirSync(path).map((name: string) => join(path, name)).filter(isDirectory);

const isFile = (path: any) => statSync(path).isFile();  
const getFiles = (path: string): any =>
    readdirSync(path).map((name: string) => join(path, name)).filter(isFile);

export const getFilesRecursively = (path: any): any => {
    let dirs = getDirectories(path);
    let files = dirs
        .map((dir: any) => getFilesRecursively(dir)) // go through each directory
        .reduce((a: string | any[],b: any) => a.concat(b), []);    // map returns a 2d array (array of file arrays) so flatten
    return files.concat(getFiles(path));
};