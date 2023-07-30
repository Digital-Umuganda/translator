import { Text, TouchableOpacity, View } from "react-native"
import { Svg, Path } from "react-native-svg";
import { useTailwind } from "tailwind-rn"
import { deleteTranslation } from "../db";

export const Favorite = ({ translation, onSuccessCallback }) => {
    const tailwind = useTailwind();

    const removeTranslation = (translation, onSuccessCallback) => {
        deleteTranslation(translation.id);
        if (onSuccessCallback !== null) {
            onSuccessCallback();
        }
    }

    return (
        <View style={[tailwind('mb-10'), { marginBottom: 20, borderBottomColor: '#6B6B6B', borderBottomWidth: 1 }]}>
            <View style={tailwind('flex flex-row justify-between')}>
                <Text style={{ opacity: 0.5 }}>{translation.date}</Text>
                <TouchableOpacity onPress={() => removeTranslation(translation, onSuccessCallback)}>
                    <Svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" style={tailwind("w-5 h-5")}>
                        <Path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </Svg>
                </TouchableOpacity>
            </View>
            <Text style={[tailwind('font-bold'), { paddingTop: 8 }]}>{translation.source_text}</Text>
            <Text style={{ marginBottom: 20, paddingTop: 8 }}>{translation.translation}</Text>
        </View>
    )
}