import { Platform } from "react-native";
import * as SQLite from "expo-sqlite";

export const openDatabase = () => {
    if (Platform.OS === "web") {
        return {
            transaction: () => {
                return {
                    executeSql: () => { },
                };
            },
        };
    }

    const db = SQLite.openDatabase("db.db");
    console.log({dbq: db})
    return db;
}

export const deleteTranslation = (translationId, callback) => {
    const db = openDatabase();

    if (translationId === null || Number(translationId) <= 0) {
        return false;
    }

    db.transaction(
        (tx) => {
            tx.executeSql(
                "delete from translations where id = ?",
                [translationId],
                (tx, result) => {
                    console.log({ result, translationId })
                    if (callback !== null) {
                        callback(null);
                    }
                },
                (tx, error) => {
                    console.error({ error: error.message });
                }
            );
        }
    );
}

export const deleteAllTranslations = () => {
    const db = openDatabase();

    db.transaction(
        (tx) => {
            tx.executeSql(
                "delete from translations where 1",
                null,
                (tx, result) => {
                    console.log({ resulti: result })
                },
                (tx, error) => {
                    console.error({ error: error.message });
                }
            );
        }
    );
}

export const createTranslationsTable = () => {
    const db = openDatabase();

    db.transaction((tx) => {
        tx.executeSql(
            "create table if not exists translations (id integer primary key not null, source_language text, source_text text, target_language text, translation text, date date, created_at timestamp default current_timestamp);",
        );
    });

    // console.log({db})
}

export const deleteTranslationsTable = () => {
    const db = openDatabase();

    db.transaction((tx) => {
        tx.executeSql(
            "drop table translations"
        );
    });
}