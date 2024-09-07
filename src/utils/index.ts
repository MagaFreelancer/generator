import { Type } from "../js/types/index.types";

export const stringToEnum = (str: string): Type | undefined => {
    // Преобразуем строку в значение enum, если это возможно
    if (Object.values(Type).includes(str as Type)) {
        return str as Type;
    }
    return undefined; // Возвращаем undefined, если строка не соответствует значению enum
};