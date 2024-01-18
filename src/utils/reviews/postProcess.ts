const convertImages = (text: string) => {
    let newText = text;
    /* eslint-disable no-useless-escape */
    const imageRegex = new RegExp('img(.*?)\\((.*?)\\)', 'gi');
    newText = newText.replaceAll(imageRegex, (match, number: string | number, url) => {
        const markdown = `![${
            typeof number === 'string' ? (number.length > 0 ? number : '123') : number ?? '123'
        }](${url})`;

        return markdown;
    });

    return newText;
};

export const postProcessReviewBody = (body: string) => {
    let newText = body;
    newText = convertImages(newText)
        .replaceAll('<br>', '\n')
        .replaceAll('~~~', '')
        .replaceAll('~!', '`')
        .replaceAll('!~', '`');
    return newText;
};
