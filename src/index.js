const express = require('express')
const cors = require('cors');
const {serverConfig, logger} = require('./config')
const apiRoutes = require('./routes')

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use("/uploads", express.static("uploads"));

app.use('/api', apiRoutes)

app.listen(serverConfig.PORT, () => {
    console.log("Successfully started the server on PORT : " + serverConfig.PORT )
    logger.info("Success Logger")
})