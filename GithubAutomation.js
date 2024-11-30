import axios from "axios";

class GithubAutomation {
    constructor() {
        this.client_id = "Iv23liw3ebU9UgpEnzxj";
        this.client_secret = "377b07b99dcd286d2a905aae52a6cea3fc8864cc";
        this.app_id = "1073758";
        this.access_token = null;
        this.base_url = "https://api.github.com";
    }

    async getAccessToken() { 
        try {
            // Convert client_id:client_secret to base64 for basic auth
            const basicAuth = Buffer.from(`${this.client_id}:${this.client_secret}`).toString('base64');

            const response = await axios.post(
                `${this.base_url}/app/installations/${this.app_id}/access_tokens`,
                {},  // empty body for this endpoint
                {
                    headers: {
                        "Accept": "application/vnd.github+json",
                        "X-GitHub-Api-Version": "2022-11-28",
                        "Authorization": `Basic ${basicAuth}`
                    }
                }
            );

            if (!response.data) {
                throw new Error('No data received from GitHub API');
            }

            this.access_token = response.data.token;
            return this.access_token;
        } catch (error) {
            console.error('Error getting access token:', error.response?.data || error.message);
            throw error;
        }
    }
}

export default GithubAutomation;