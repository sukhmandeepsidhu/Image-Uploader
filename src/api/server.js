const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const multer = require('multer');
const DIRECTORY_PATH = './src/api/uploads';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIRECTORY_PATH); // The directory where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename
  },
});
const upload = multer({ storage: storage });
const fs = require('fs');
const path = require('path');
const PORT = 5001;
server.use(middlewares);

// Image upload
server.post('/upload', upload.single('image'), (req, res) => {
  const image = {
    id: Date.now(),
    filename: req.file.originalname,
  };
  // router.db.get('images').push(image).write();
  res.json(image);
});

// Image GET
server.get('/images', (req, res) => {
  fs.readdir(DIRECTORY_PATH, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading directory' });
    }
    const imageList = files.map((file) => {
      const filePath = path.join(DIRECTORY_PATH, file);
      const stats = fs.statSync(filePath);
      const imageContent = fs.readFileSync(filePath, { encoding: 'base64' });
      return {
        filename: file,
        size: stats.size, // File size in bytes
        dateUploaded: stats.mtime, // Date of upload
        content: imageContent, // Base64-encoded image content
      };
    });

    res.json(imageList);
  });
});

server.get('/image/:fileToFind', (req, res) => {
  const { fileToFind } = req.params;
  fs.readdir(DIRECTORY_PATH, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading directory' });
    }
    const imageList = files
      .map((file) => {
        const filePath = path.join(DIRECTORY_PATH, file);
        const stats = fs.statSync(filePath);
        const imageContent = fs.readFileSync(filePath, {
          encoding: 'base64',
        });
        return {
          filename: file,
          size: stats.size, // File size in bytes
          dateUploaded: stats.mtime, // Date of upload
          content: imageContent, // Base64-encoded image content
        };
      })
      .filter((image) => {
        return image.filename
          .toLowerCase()
          .includes(fileToFind.toLocaleLowerCase());
      });
    res.json(imageList);
  });
});

// Image Delete
server.delete('/delete/:deleteItemDateUpload', (req, res) => {
  const { deleteItemDateUpload } = req.params;

  fs.readdir(DIRECTORY_PATH, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading directory' });
    }
    let found = null;
    for (const image of files) {
      const filePath = path.join(DIRECTORY_PATH, image);
      const { mtime: dateUploaded } = fs.statSync(filePath);
      if (dateUploaded.toISOString() === deleteItemDateUpload) {
        // We could only upload one picture at a time so every picture will have a different upload time
        found = filePath;
        break;
      }
    }
    if (found) {
      fs.unlinkSync(found);
      return res.json({ message: 'File deleted successfully' });
    }
    res.status(404).json({ error: 'File not found' });
  });
});

server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
