export type WdTaggerInput = {
    data: [
        string, // represents image data as base64 string of 'Input' Image component
        string, // represents selected choice of 'Model' Radio component
        number, // represents selected value of 'General Tags Threshold' Slider component
        number, // represents selected value of 'Character Tags Threshold' Slider component
    ];
};

export type WdTaggerOutput = {
    data: [
        string, // represents text string of 'Output (string)' Textbox component
        string, // represents text string of 'Output (raw string)' Textbox component
        { label: string; confidences?: Array<{ label: string; confidence: number }> }, // represents output label and optional set of confidences per label of 'Rating' Label component
        { label: string; confidences?: Array<{ label: string; confidence: number }> }, // represents output label and optional set of confidences per label of 'Output (characters)' Label component
        { label: string; confidences?: Array<{ label: string; confidence: number }> }, // represents output label and optional set of confidences per label of 'Output (tags)' Label component
        string, // represents HTML output of 'output 5' Html component
    ];
    duration: number; // number of seconds to run function call
};
