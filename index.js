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
    const client = await getClient();
    try {
        res.json(client.invoke('ciao:quantiSaluti'));
    }
    catch (err) {
        res.send(err);
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})