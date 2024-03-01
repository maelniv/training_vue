import axios from './axios.js'
import { UserType } from '@/types/user/UserType.js';

export default function login(username: string, password: string): Promise<UserType> {
    return new Promise<UserType>((resolve, reject) => {
        const credentials = {
            "name": username,
            "password": password,
            "site": {
                "contentUrl": "Testing"
            }
        }

        axios.post('/auth/signin', {
            credentials
        }).then(function (response: any) {
            const userData = {
                siteId: response.data.credentials.site.id,
                accessToken: response.data.credentials.token,
                isUserConnected: true,
            }
            console.log("userdata", userData)
            resolve(userData);
        }).catch((error: any) => {
            reject(error);
        });
    });
}