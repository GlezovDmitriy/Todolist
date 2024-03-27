import {ChangeEvent, KeyboardEvent, useState} from "react";

export const useAddItemForm=(
    onItemAdded: (title: string) => void
)=>{
    let [title, setTitle] = useState('')
    let [inputError, setInputError] = useState(false)

    const addItem = () => {
        const trimmedTitle = title.trim()                      // убираем пробелы
        if (trimmedTitle.length !== 0) {                                      //если что-то осталось в строке - то добавляем ее
            onItemAdded(title)
        } else {
            setInputError(true)                                          //если строка пустая - то передаем в локальный стейт, что есть ошибка
        }
        setTitle(title = '')
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => event.key === "Enter" &&
        addItem()

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        inputError && setInputError(false)                                                    //сбрасываем ошибку, если до этого была при вводе пробелов
        setTitle(e.currentTarget.value)                                        // отрисовывает каждый новый символ в инпуте
    }
    return{
        title,
        onChangeHandler,
        onKeyDownHandler,
        addItem,
        inputError


    }
}