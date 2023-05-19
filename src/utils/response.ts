export const sendSuccess = (data, log = false, title?: string): [boolean, string | object] => {
    log && console.log('Success!', title ? title + ': ' : 'Response: ', data);
    return [true, data];
};

export const sendError = (title: string, error): [boolean, string | object] => {
    console.log(title + ': ', error);
    return [false, error];
};
