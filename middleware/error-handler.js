const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  if(err.code === 11000){
    return res.status(StatusCodes.CONFLICT).json({msg: `${Object.keys(err.keyValue)} already exists`})
  }
  if(err.name === "CastError"){
    return res.status(StatusCodes.NOT_FOUND).json({
      msg: 'Job not found, id provided is not an acceptable value',
       id:err.value
      })
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
}

const boomHandlerMiddleware = (err,req,res,next) => {

  if(!err.isBoom) {
    return next(err)
  }
  const {output} = err
  return res.status(output.statusCode).json(output.payload)
}

module.exports = {errorHandlerMiddleware, boomHandlerMiddleware}
