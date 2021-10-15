//import express from 'express'
const express = require('express')
//import { apiClient } from '@liskhq/lisk-client'
const { apiClient } = require('@liskhq/lisk-client')

const app = express()
const port = 3000

let clientCache;

const getClient = async () => {
    if (!clientCache) {
        clientCache = await apiClient.createWSClient('ws://localhost:8080/ws');
    }
    return clientCache;
};

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/hellos', async (req, res) => {
    try {
        const client = await getClient();
        let data = await client.invoke('ciao:quantiSaluti')
        ret_json = JSON.parse(JSON.stringify(data))
        res.json(ret_json.numeroDiSaluti);
    }
    catch (err) {
        res.send(err);
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})