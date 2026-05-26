export default function setLocaleStorage() {
    const storeDataInStorage = (key, data) => {
        localStorage.setItem(
            key,
            JSON.stringify(data)
        );
    }

    const getDataInStorage = (key) => {
        const data = JSON.parse(localStorage.getItem(key));//string => parse
        return data;
    }

    return {
        storeDataInStorage,
        getDataInStorage
    }
}