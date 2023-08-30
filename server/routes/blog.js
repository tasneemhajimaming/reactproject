const express = require("express")
const router = express.Router()
const {create,getAllblogs,singleBlog} =require("../controllers/blogController")
const { remove,update } = require('../controllers/blogController');


router.post('/create',create)

router.get('/blogs',getAllblogs)

router.get('/blog/:slug',singleBlog)
router.delete('/blog/:slug',remove)
router.put('/blog/:slug',update)

module.exports=router