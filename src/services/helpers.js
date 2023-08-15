export function cleanUpFirestoreResponse(responseArray) {
    if(!Array.isArray(responseArray)) return []
    return responseArray.map((response) => {
        const cleanedData = {};

        for (const key in response.fields) {
            cleanedData['id'] = getDocId(response.name)
            if (response.fields.hasOwnProperty(key)) {
                const dataTypeKey = Object.keys(response.fields[key])[0];
                let value = response.fields[key][dataTypeKey];

                // Convert values to numbers if they are valid numbers
                /* if (!isNaN(value)) {
                    value = parseFloat(value);
                } */

                cleanedData[key] = value;
            }
        }
        return cleanedData;
    });
}

export const convertToFirebasePayload = (data) => {
    const convertedData = {};

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            if (typeof data[key] === 'string') {
                convertedData[key] = { stringValue: data[key] };
            } else if (typeof data[key] === 'number') {
                convertedData[key] = { integerValue: data[key] };
            } else if (typeof data[key] === 'boolean') {
                convertedData[key] = { booleanValue: data[key] };
            } else if (data[key] instanceof Date) {
                convertedData[key] = { timestampValue: data[key].toISOString() };
            } else if (data[key] === null) {
                convertedData[key] = { nullValue: null };
            }
            // You can add more type checks for other data types if needed
        }
    }

    return { fields: convertedData };
};

export function getDocId(string) {
    let splitString = string.split('/')
    return splitString[splitString.length - 1] || null
}

export function handleErrorResponse(error) {
    if (error.response) {
        // Server responded with an error status (4xx or 5xx)
        if (error.response.status === 404) {
            throw new Error({ error: true, message: 'Resource not found' });
        } else if (error.response.status === 403) {
            throw new Error({ error: true, message: 'Unauthorized' });
        } else {
            throw new Error({ error: true, message: 'An error occurred on the server' });
        }
    } else if (error.request) {
        // Request was made but no response was received
        throw new Error({ error: true, message: 'No response received from the server' });
    } else {
        // Something else happened while setting up the request
        throw new Error({ error: true, message: 'An error occurred while making the request' });
    }
}

export async function performRequest(requestFunction, ...args) {
    try {
        const response = await requestFunction(...args);
        return {
            status: response.status,
            data: response?.data
        }
    } catch (error) {
        throw new Error({ error: true, message: error.message });
    }
}