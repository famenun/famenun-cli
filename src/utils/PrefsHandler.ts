import path from "path";
import fs from "fs";

const PREFS_FILE = path.resolve(__dirname, "../../prefs/prefs.json");

export class PrefsHandler {

    public write(data: any): Promise<void> {
        return new Promise((resolve, reject) => {
            fs.writeFile(PREFS_FILE, JSON.stringify(data), (err) => {
                if (!err) {
                    resolve();
                } else {
                    reject(err);
                }
            });
        });
    }

    public read(): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.readFile(PREFS_FILE, { encoding: "utf-8" }, (err, data) => {
                if (!err) {
                    resolve(JSON.parse(data));
                } else {
                    reject(err);
                }
            });
        });
    }

}