const useFormInit = (formItem) => {
    const mapFormKey: any = {}

    for (const item of formItem) {
        mapFormKey[item.field] = ''
    }
    return mapFormKey
}
