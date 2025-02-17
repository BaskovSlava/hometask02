import {SETTINGS} from "../../src/settings";

// готовые данные для переиспользования в тестах

export const codedAuth = fromUTF8ToBase64(SETTINGS.CREDENTIALS.LOGIN && SETTINGS.CREDENTIALS.PASSWORD);