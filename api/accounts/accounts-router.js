const router = require('express').Router()
const dbFunctions = require(`./accounts-model`)
const middleware = require("./accounts-middleware")

const checkAccountId = middleware.checkAccountId
const checkAccountNameUnique = middleware.checkAccountNameUnique
const checkAccountPayload = middleware.checkAccountPayload

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  dbFunctions.getAll().then( arr => {
    res.status(200).send(arr)
  })
})

router.get('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  res.status(200).send(req.foundAccount)
})

router.post('/', checkAccountPayload,checkAccountNameUnique, (req, res, next) => {
  // DO YOUR MAGIC
  const validAccount = {...req.body,name:req.body.name.trim()}
  dbFunctions.create(validAccount).then( arr => {
    res.status(201).json(validAccount)
  })
})

router.put('/:id', checkAccountId, checkAccountPayload, (req, res, next) => {
  // DO YOUR MAGIC
  const id = req.params.id
  const validAccount = {...req.body,name:req.body.name.trim()}
  console.log(`${id} is the id, and ${validAccount} is the obj` )
  dbFunctions.updateById(id,validAccount).then( arr => {
    res.status(200).send(validAccount)
  })
});

router.delete('/:id',checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  const id = req.params.id
  dbFunctions.deleteById(id).then(acc => {
    res.status(200).send(req.foundAccount)
  })
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
