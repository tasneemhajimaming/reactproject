//ติดต่อกับทางข้อมูล / ดำเนินการกับฐานข้อมูล
const slugify = require("slugify")
const blog = require("../models/blog");
const Blogs = require("../models/blog"); // ต้องเป็น path ที่ชี้ไปยังโมเดลที่มีการนิยาม Schema ของบทความ
const { v4: uuidv4 } = require('uuid');

exports.create = (req, res) => {
    const { title, content,author } = req.body;
    let slug = slugify(title)
  if(!slug)slug=uuidv4();
   switch (true) {
        case !title:
            return res.status(400).json({ error: "กรุณาป้อนชื่อบทความ" });
            break;
        case !content:
            return res.status(400).json({ error: "กรุณาป้อนเนื้อบทความ" });
            break;
    }

    //บันทึกข้อมูล
    Blogs.create({ title, content, author, slug })
    .then(blog => {
      res.json(blog);
    })
    .catch(err => {
      res.status(400).json({ error:"บทความนี้ซ้ำกัน"});
    });
    
};
//ดึงข้อมูล
exports.getAllblogs = async (req, res) => {
  try {
    const blogs = await Blogs.find({}).exec(); // ใช้ await เพื่อรอการ resolve ของ Promise
    res.json(blogs);
  } catch (error) {
    // จัดการข้อผิดพลาดที่เกิดขึ้นในส่วนนี้
    res.status(400).json({ error: 'An error occurred while fetching blogs.' });
  }
};

//ดึงบทความที่สนใจอ้างองตาม slug
exports.singleBlog = (req, res) => {
  const { slug } = req.params;
  Blogs.findOne({ slug })
    .exec() // เรียก exec() โดยไม่ระบุ callback
    .then(blog => {
      res.json(blog);
    })
    .catch(error => {
      // จัดการกับข้อผิดพลาด
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching the blog.' });
    });
};

exports.remove = (req, res) => {
  const { slug } = req.params;
  Blogs.findOneAndRemove({ slug }).exec()
    .then(blog => {
      res.json({
        message: "ลบบทความเรียบร้อย"
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        message: "เกิดข้อผิดพลาดในการลบบทความ"
      });
    });
};

exports.update = async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, content, author } = req.body;

    const updatedBlog = await Blogs.findOneAndUpdate(
      { slug },
      { title, content, author },
      { new: true }
    ).exec();

    res.json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating the blog." });
  }
};








