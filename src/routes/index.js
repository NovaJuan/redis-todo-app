const {Router} = require('express');

const router = Router();

const db_client = require('../libs/redis');

const REDIS_KEY = 'super_secret_key';

router.get(('/'),(req,res)=>{
  db_client.hgetall(REDIS_KEY,(err,reply)=>{
    if(err){
      console.log(err);
      process.exit(1);
    }
    if(!reply){ 
      res.render('index',{todos:null});
      return;
    }
    const todos = Object.keys(reply).map(todoID =>{
      return {id:todoID,todo:reply[todoID]}
    });
    res.render('index',{todos});
  });
});

router.post('/add',(req,res)=>{
  const {todo} = req.body;
  db_client.hset(REDIS_KEY,Date.now(),todo);
  res.redirect('/');
});

router.get('/delete/:id',(req,res)=>{
  const {id} = req.params;
  db_client.hdel(REDIS_KEY,id);
  res.redirect('/');
});

module.exports = router;
