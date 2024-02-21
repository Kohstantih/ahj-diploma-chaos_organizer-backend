const Router = require('koa-router');
const path = require('path');
const { v4 } = require('uuid');
const fs = require('fs');

const router = new Router();

router.post('/files', async (ctx) => {
    try {
        const public = path.join(__dirname, '../../public');
        const { file } = ctx.request.files;

        const subfolder = v4();
        const uploadFolder = `${public}/${subfolder}` ;
        fs.mkdirSync(uploadFolder);

        fs.copyFileSync(file.filepath, uploadFolder + '/' + file.originalFilename);

        const link = `/${subfolder}/${file.originalFilename}`;

        ctx.response.body = {
            link,
            fileName: file.originalFilename,
        }
        
    } catch (error) {
        console.log('error: ', error.message);
        ctx.response.status = 500;
        return;
    }

    ctx.response.status = 200;
});

module.exports = router;
