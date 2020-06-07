// import React from 'react';
import axios from 'axios';
import * as CONSTANT from './constants';

/**
 * 
 * @param {string} param 
 * @description Http get call using axios
 */
export const get = async (param) => {
    console.log('Get',CONSTANT.BASE_URL + param)

    try {
        const res = await axios.get(CONSTANT.BASE_URL + param, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        return res;
    } catch (error) {
        return error;
    }
}

/**
 * 
 * @param {string} param 
 * @param {any} data
 * @description Http post call using axios
 */
export const post = async (param, data) => {

    try {
        const res = await axios.post(CONSTANT.BASE_URL + param, JSON.stringify(data), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }

        });
        return res;
    } catch (error) {
        return error;
    }
}