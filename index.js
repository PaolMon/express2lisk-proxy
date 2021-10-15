//import express from 'express'
const express = require('express')
//import { apiClient } from '@liskhq/lisk-client'
const { apiClient } = require('@liskhq/lisk-client')

const app = express()
const port = 3000

let clientCache;

const getClient = async () => {
    if (!clientCache) {
        clientCache = await apiClient.createWSClient('ws://192.168.1.74:8088/ws');
    }
    return clientCache;
};

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/hellos', (req, res) => {
    const client = getClient();
    res.send(client.invoke('ciao:amountOfHellos'))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})