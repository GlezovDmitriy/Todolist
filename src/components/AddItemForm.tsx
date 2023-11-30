import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormType = {
    addItem: (title:string)=> void
}
export const AddItemForm = (props: AddItemFormType) => {
    let [title, setTitle] = useState('')
    let [inputError, setInputError] = useState(false)

    const addItem = () => {
        const trimmedTitle = title.trim()                      // убираем пробелы
        if (trimmedTitle.length !== 0) {                                      //если что-то осталось в строке - то добавляем ее
            props.addItem(title)
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
    const isAddBtnDisabled = title === '' || title.length >= 15
    return (
        <div>
            <input
                className={inputError ? "input-error" : undefined}
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}

            />
            <button
                onClick={addItem}
                disabled={isAddBtnDisabled}
            >+
            </button>
        </div>
    );
};

