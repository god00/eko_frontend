import appConfig from '../config.json';

const appFetch = (path, config) => {
    return new Promise((resolve, reject) => {
        fetch(`${appConfig.prod}${path}`, config)
            .then(res => res.json())
            .then(result => {
                resolve(result);
            },
                error => {
                    reject(error);
                }
            )
    })
}

export default class Request {
    get(path) {
        const config = {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        }
        return appFetch(path, config)
    }

    post(path, body) {
        const config = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }
        return appFetch(path, config)
    }
}