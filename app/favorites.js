import { Link, Stack, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { Svg, Path } from "react-native-svg";
import { createTranslationsTable, deleteAllTranslations, deleteTranslation, deleteTranslationsTable, openDatabase } from "../src/db";
import { Favorite } from "../src/components/Favorite";

export default function Favorites() {
    const [translations, setTranslations] = useState([]);

    const navigation = useNavigation();

    const tailwind = useTailwind();

    const db = openDatabase();

    useEffect(() => {
        loadTranslations();
    }, [])

    const loadTranslations = () => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "select * from translations order by id desc",
                    null,
                    (tx, result) => {
                        const elligibleTranslations = [];
                        for (const key in result.rows) {
                            if (Object.hasOwnProperty.call(result.rows, key)) {
                                const row = result.rows[key];
                                if (Array.isArray(row)) {
                                    elligibleTranslations.push(...row);
                                }
                            }
                        }
                        console.log({ elligibleTranslations })
                        setTranslations(elligibleTranslations);
                    },
                    (tx, error) => {
                        console.error({ error });
                    }
                );
            }
        );
    }

    const clearAllTranslations = () => {
        deleteAllTranslations();
        createTranslationsTable();
        loadTranslations();
    }

    return (
        <View>
            <Stack.Screen />
            <View style={tailwind('flex flex-row p-4 justify-between')}>
                <TouchableOpacity
                    style={tailwind('flex flex-row items-center')}
                    onPress={() => navigation.goBack()}
                >
                    <Svg fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" style={tailwind("w-6 h-6 mr-2")}>
                        <Path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                    </Svg>
                    <Text style={tailwind('font-extrabold text-2xl')}>Saved</Text>
                </TouchableOpacity>
                <Link href="favorites/" asChild>
                    <TouchableOpacity
                        style={tailwind(`flex flex-row justify-between items-center border rounded-3xl p-2 px-4`)}
                        onPress={clearAllTranslations}
                    >
                        <Text>Clear All</Text>
                    </TouchableOpacity>
                </Link>
            </View>
            <ScrollView style={[tailwind('p-4'), { marginBottom: 50 }]}>
                {translations.map((translation) => <Favorite key={translation.id} translation={translation} onSuccessCallback={loadTranslations} />)}
            </ScrollView>
        </View>
    )
}