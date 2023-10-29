const app = require('./app')
const mongoose = require('mongoose');
const createFolderIfNotExist = require('./utils/createFolderIfNotExist.js');
const path = require('path');

const uploadDir = path.join(process.cwd(), 'tmp');
const storeImage = path.join(process.cwd(), 'public/avatars');



mongoose.connect(process.env.DB_HOST)
    .then(()=> {console.log("Database connection successful")})
    .catch((error)=>{
        console.log(error.message);
        process.exit(1);
    });

app.listen(3000, () => {
  createFolderIfNotExist(uploadDir);
  createFolderIfNotExist(storeImage);

  console.log("Server running. Use our API on port: 3000")
})
