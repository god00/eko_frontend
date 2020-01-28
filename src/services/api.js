import Request from './request';

const request = new Request();

const cachingApiLocal = localStorage.getItem('eko-caching-api');
const cachingApi = cachingApiLocal ? JSON.parse(cachingApiLocal) : {
    id: {},
    cost: {},
    possible: {}
};

class Api {
    addNewRoutes(inputlist) {
        return new Promise((resolve, reject) => {
            const listStr = JSON.stringify(inputlist);
            if (cachingApi.id[listStr] != null) {
                resolve(cachingApi.id[listStr]);
            }
            else {
                request.post('/api/input', { input: inputlist })
                    .then(res => {
                        cachingApi.id[listStr] = res;
                        localStorage.setItem('cachingApi', JSON.stringify(cachingApi));
                        resolve(res)
                    })
                    .catch(err => { reject(err) })
            }
        })

    }

    calculateCost(id, path) {
        if (path != null) {
            path = path.toUpperCase();
        }
        return new Promise((resolve, reject) => {
            if (cachingApi.cost[`${id}:${path}`] != null) {
                resolve(cachingApi.cost[`${id}:${path}`]);
            }
            else {
                request.post(`/api/calculateCost`, { id, path })
                    .then(res => {
                        if (res.cost != null) {
                            cachingApi.cost[`${id}:${path}`] = res.cost;
                            localStorage.setItem('cachingApi', JSON.stringify(cachingApi));
                        }
                        resolve(res.cost)
                    })
                    .catch(err => { reject(err) })
            }
        })
    }

    /* condition {
        allowRouteTwice: boolean;
        maximunStop: number;
        lessThan: number;
    }
    */
    possibleRoute(id, source, destination, condition = { allowRouteTwice: false }) {
        if (source != null && destination != null) {
            source = source.toUpperCase();
            destination = destination.toUpperCase();
        }
        return new Promise((resolve, reject) => {
            const conditionStr = JSON.stringify(condition);
            if (cachingApi.possible[`${id}:${source}${destination}${conditionStr}`] != null) {
                resolve(cachingApi.possible[`${id}:${source}${destination}${conditionStr}`]);
            }
            else {
                request.post(`/api/possibleRoute`, { id, source, destination, condition })
                    .then(res => {
                        if (res.possible != null && res.paths != null) {
                            cachingApi.possible[`${id}:${source}${destination}${conditionStr}`] = { possible: res.possible, paths: res.paths };
                            localStorage.setItem('cachingApi', JSON.stringify(cachingApi));
                        }
                        resolve({ possible: res.possible, paths: res.paths });
                    })
                    .catch(err => { reject(err) })
            }
        })
    }
}

export default new Api();