import axios from '../utils/axios';
import api from '../utils/api';

class WineService {

    createWine(data) {
        const config = {
            method: 'post',
            url: api.base_url + api.resource + api.methods.post,
            headers: api.headers,
            data : data
        }

        return this.handleRequest(config)
    }

    getWine(id){

        const config = {
            method: 'get',
            url: api.base_url + api.resource + api.methods.get + id,
            headers: api.headers
        }

        return this.handleRequest(config)
    }

    listWine() {

        const config = {
            method: 'get',
            url: api.base_url + api.resource + api.methods.get,
            headers: api.headers
        }

        return this.handleRequest(config)
    }
    updateWine(id, data){

        const config = {
            method: 'put',
            url: api.base_url + api.resource + api.methods.put + id,
            headers: api.headers,
            data: data
        }

        return this.handleRequest(config)
    }

    deleteWine = async (id) =>{
        
        const config = {
            method: 'delete',
            url: api.base_url + api.resource + api.methods.delete + id,
            headers: api.headers
        }

        return await this.handleRequest(config)
    }

    handleRequest = async (config) => {
        try {
            let data = await axios(config)
            .then(({data}) => data);
            return data
        } catch (error) {
            console.log(error)
        }
    }
}

const wineService = new WineService();

export default wineService;