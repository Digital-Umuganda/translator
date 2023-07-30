import axios from "axios";
import { openDatabase } from "./db";

export const translate = async (textToTranslate, sourceLanguage, targetLanguage) => {
    console.log({ textToTranslate, sourceLanguage, targetLanguage })
    const response = await axios.post('https://nmt-api.umuganda.digital/api/v1/translate/', {
        src: sourceLanguage,
        tgt: targetLanguage,
        alt: "",
        use_multi: "multi",
        text: textToTranslate
    })

    console.log({ data: response.data })
    return response;
}