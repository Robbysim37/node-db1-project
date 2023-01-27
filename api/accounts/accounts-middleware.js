const dbFunctions = require("./accounts-model")

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)

  const {name,budget} = req.body

  if(name === undefined){
    res.status(400).send({ message: "name and budget are required" })
  } else if(budget === undefined){
    res.status(400).send({ message: "name and budget are required" })
  } else if(name.trim().length < 3 || name.trim().length > 100){
    res.status(400).send({ message: "name of account must be between 3 and 100" })
  } else if(!parseInt(budget)){
    res.status(400).send({ message: "budget of account must be a number" })
  } else if(budget < 0 || budget > 1000000){
    res.status(400).send({ message: "budget of account is too large or too small" })
  }else{
    next()
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  dbFunctions.getAll().then( arr => {
    for(i = 0;i < arr.length ;i++){
      if(req.body.name === arr[i].name){
        res.status(400).send({ message: "that name is taken" })
      }
    }
    next()
  })
}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  const id = req.params.id
  dbFunctions.getById(id).then(acc => {
    if(acc){
      req.foundAccount = acc
      next()
    }else{
      res.status(404).send({message: "account not found"})
    }
  })
}
