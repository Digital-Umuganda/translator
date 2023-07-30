import axios from "axios";
import { Link, Stack, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Image, Text, TextInput, View, TouchableOpacity, SafeAreaView } from "react-native";
import { Svg, Path } from "react-native-svg";
import { useTailwind } from "tailwind-rn";
import { translate } from "../src/translator";
import { createTranslationsTable, deleteTranslation, openDatabase } from "../src/db";

export default function Index() {
    const [heartIconColor, setHeartIconColor] = useState('none');
    const [isFavorite, setIsFavorite] = useState(false);
    const [savedButtonColor, setSavedButtonColor] = useState('bg-transparent');
    const [textToTranslate, setTextToTranslate] = useState('');
    const [translation, setTranslation] = useState('');
    const [localTranslationId, setLocalTranslationId] = useState(null);
    const [translatedViewDimensions, setTranslatedViewDimensions] = useState({
        width: 0,
        height: 0,
        x: 0,
        y: 0
    });
    const [sourceLanguage, setSourceLanguage] = useState({
        code: 'en',
        name: 'English'
    })
    const [targetLanguage, setTargetLanguage] = useState({
        code: 'rw',
        name: 'Kinyarwanda'
    })
    const [translating, setTranslating] = useState(false);
    const [lastTranslatedText, setLastTranslatedText] = useState('');
    const [ellapsedMs, setEllapsedMs] = useState(0);

    const tailwind = useTailwind();

    const navigation = useNavigation();

    const db = openDatabase();

    const sourceLanguages = [{
        code: 'en',
        name: "English"
    }]

    const targetLanguages = [{
        code: 'rw',
        name: "Kinyarwanda"
    }];

    useEffect(() => {
        createTranslationsTable()
    }, []);

    const toggleIconColor = () => {
        if (heartIconColor == "none") {
            setHeartIconColor('black');
        } else {
            setHeartIconColor('none');
        }
    }

    const resetIconColor = () => {
        if (heartIconColor == "none") {
            setHeartIconColor('black');
        } else {
            setHeartIconColor('none');
        }
    }

    const toggleFavoriteStatus = (ev) => {
        ev && ev.stopPropagation();
        if (isFavorite) {
            setHeartIconColor('none');
            setIsFavorite(false);
            ev && localTranslationId && deleteTranslation(localTranslationId, setLocalTranslationId);
        } else {
            setHeartIconColor('black');
            setIsFavorite(true);
            saveTranslation()
        }
    }

    const toggleSavedButtonColor = () => {
        if (savedButtonColor == 'bg-transparent') {
            setSavedButtonColor('bg-black');
        } else {
            setSavedButtonColor('bg-transparent');
        }
    }

    const getTranslation = async () => {
        try {
            console.log({ textToTranslate1: textToTranslate })
            setLocalTranslationId(null);
            isFavorite && toggleFavoriteStatus(null);
            setTranslating(true);
            const translatedText = await translate(textToTranslate, sourceLanguage.code, targetLanguage.code);
            // console.log({ translatedText })
            if (translatedText.data?.translation) {
                setTranslation(translatedText.data.translation);
                console.log({ 'ii': JSON.parse(translatedText.config.data)?.text })
                setLastTranslatedText(JSON.parse(translatedText.config.data)?.text)
            }
            setTranslating(false);
        } catch (error) {
            console.log({ error })
        }
    }

    const saveTranslation = () => {
        const result = createTranslation({ textToTranslate, translation })
        console.log({ result })
    };

    const createTranslation = ({ textToTranslate, translation }) => {
        // is text empty?
        if ((textToTranslate === null || textToTranslate === "") || (translation === null || translation === "")) {
            return false;
        }

        console.log({ textToTranslate2: textToTranslate })

        const db = openDatabase();

        // createTranslationsTable();

        console.log({ textToTranslate3: textToTranslate })

        db.transaction(
            (tx) => {
                tx.executeSql(
                    "insert into translations (source_language, source_text, target_language, translation, date) values ('en', ?, 'rw', ?, ?)",
                    [textToTranslate, translation, Date()],
                    (tx, result) => {
                        console.log({ insertId: result.insertId })
                        setLocalTranslationId(result.insertId);
                    },
                    (tx, error) => {
                        console.error({ error });
                    }
                );
            }
        );
    };

    const reverseTranslationLanguages = () => {
        const trans = translation;
        if (sourceLanguage.code == 'en') {
            setSourceLanguage({
                code: 'rw',
                name: 'Kinyarwanda'
            })

            setTargetLanguage({
                code: 'en',
                name: 'English'
            })
        } else {
            setTargetLanguage({
                code: 'rw',
                name: 'Kinyarwanda'
            })

            setSourceLanguage({
                code: 'en',
                name: 'English'
            })
        }
        setTranslation(textToTranslate);
        setTextToTranslate(trans);
    }

    return (
        <SafeAreaView style={[tailwind('flex'), {
            minHeight: 550
        }]}>
            <Stack.Screen />
            <View style={tailwind('flex flex-row p-4 justify-between items-center')}>
                <Text style={tailwind('text-3xl font-bold')}>Translate</Text>
                <Link href="favorites/" asChild>
                    <TouchableOpacity
                        style={tailwind(`flex flex-row justify-between items-center border rounded-3xl p-2 ${savedButtonColor}`)}
                        onPointerEnter={toggleSavedButtonColor}
                        onPointerLeave={toggleSavedButtonColor}
                        onFocus={toggleSavedButtonColor}
                    >
                        <Text>Saved</Text>
                        <Image source={require('../assets/arrow-right.png')} style={tailwind('ml-2')} />
                    </TouchableOpacity>
                </Link>
            </View>
            <View style={tailwind('flex border-gray-400 border-2 m-4 rounded-lg md:flex-row md:justify-stretch flex-1')}>
                <View style={tailwind('p-4 md:border-r-2 border-gray-400 flex-1')}>
                    <View style={tailwind('flex flex-row')}>
                        <View style={tailwind('flex flex-row items-center')}>
                            <Image source={require('../assets/globe.png')} />
                            <Text style={tailwind('ml-2 font-bold text-lg')}>{sourceLanguage.name}</Text>
                        </View>
                    </View>
                    <View>
                        <TextInput
                            onChangeText={setTextToTranslate}
                            value={textToTranslate}
                            style={[tailwind('border border-gray-400 my-4 rounded-lg mb-10 h-2/3'), { textAlignVertical: 'top', padding: 10 }]}
                            returnKeyType="search"
                            returnKeyLabel="Translate"
                            onSubmitEditing={getTranslation}
                            textAlignVertical="top"
                        />
                    </View>
                </View>
                <View
                    style={tailwind('p-4 flex-1 bg-gray-200 rounded-b-lg md:rounded-r-lg border-t-2 md:border-t-0 border-gray-400')}
                    onLayout={(ev) => {
                        setTranslatedViewDimensions({
                            width: ev.width,
                            height: ev.height,
                            x: ev.x,
                            y: ev.y,
                        })
                    }}
                >
                    <TouchableOpacity
                        style={[
                            tailwind('absolute flex z-10'),
                            { top: -25, left: '50%' }
                        ]}
                        onPress={reverseTranslationLanguages}
                    >
                        <Image source={require('../assets/Group23.png')} />
                    </TouchableOpacity>
                    <View style={tailwind('flex flex-row justify-between')}>
                        <View style={tailwind('flex flex-row items-center')}>
                            <Image source={require('../assets/globe.png')} />
                            <Text style={tailwind('ml-2 font-bold text-lg')}>{targetLanguage.name}</Text>
                        </View>
                        <TouchableOpacity
                            onPointerEnter={!isFavorite && toggleIconColor}
                            onPointerLeave={!isFavorite && resetIconColor}
                            onPress={toggleFavoriteStatus}
                        >
                            <Svg
                                fill={heartIconColor}
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="gray"
                                style={tailwind("w-5 h-5")}
                            >
                                <Path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </Svg>
                        </TouchableOpacity>
                    </View>
                    <Text style={tailwind('my-4')}>{translation}</Text>
                </View>
            </View>
            <StatusBar style="light" />
        </SafeAreaView>
    );
}