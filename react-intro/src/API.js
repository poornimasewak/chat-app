import axios from 'axios';


export default {
    save: function (data) {
        console.log(data);

        return axios.post("/save", { user: data });
    }

};