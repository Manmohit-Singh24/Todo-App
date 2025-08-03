function handleError(error) {
    let message = "";
    if (error.code === 401 || error.code === 400) {
        message = "Plaease check your email or password";
    } else if (error.code === 403) {
        message = "Access denied";
    } else if (error.code === 404) {
        message = "Account not found";
    } else if (error.code === 409) {
        message = "User with current email already exists";
    } else if (error.code === 429) {
        message = "Too many requests, try again later";
    } else {
        message = "An unknown error occurred"; // Default message for unknown codes
    }

    return message;
}

export class Bucket {
    BUCKET_URL;

    constructor() {
        this.BUCKET_URL = ""; // process.env._____________
    }

    async uploadFile( file ) {
        console.log( "Bucket Service " , file);
        
        let res = ["Failed to make request", false, " "];
        // UPLOAD FILE TO SERVER
        // RETURN THE URL OF IMAGE
        res = [
            "SuccessFully Uploaded File",
            true,
            "/src/assetes/Icons/Profile-Light.svg",
        ];
        return res;
    }

    async getPreview({ url }) {
        let res = ["Failed to make request", false];
        // FETCH FILE PREVIEW FROM SERVER USING URL
        // RETURN THE IMAGE
        res = [
            "SuccessFully fetched File",
            true,
            "/src/assetes/Icons/Profile-Light.svg",
        ];

        return res;
    }

    async downloadFil({ url }) {
        let res = ["Failed to make request", false];
        // FETCH FILE FROM SERVER USING URL
        // RETURN THE IMAGE
        res = [
            "SuccessFully downloaded File",
            true,
            "/src/assetes/Icons/Profile-Light.svg",
        ];

        return res;
    }
}

const bucketService = new Bucket();
export default bucketService;