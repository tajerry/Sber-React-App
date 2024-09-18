const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5002;
const POSTS_DB_PATH = path.join(__dirname, "./db/db.posts.json");

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "my-blog/build")));

// Получить все посты
app.get("/api/posts", (req, res) => {
  fs.readFile(POSTS_DB_PATH, "utf8", (err, data) => {
    if (err) {
      console.error("Ошибка чтения файла:", err);
      res.status(500).send("Ошибка сервера");
      return;
    }
    const posts = JSON.parse(data).posts;
    res.json(posts);
  });
});

// Создать новый пост
app.post("/api/posts", (req, res) => {
  fs.readFile(
    path.join(__dirname, "./db/db.posts.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Ошибка чтения файла:", err);
        res.status(500).send("Ошибка сервера");
        return;
      }
      const posts = JSON.parse(data).posts;
      const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        body: req.body.body,
        rate: req.body.rate,
        url: req.body.url,
      };
      posts.push(newPost);
      fs.writeFile(
        path.join(__dirname, "./db/db.posts.json"),
        JSON.stringify({ posts }),
        "utf8",
        (err) => {
          if (err) {
            console.error("Ошибка записи файла:", err);
            res.status(500).send("Ошибка сервера");
            return;
          }
          res.status(201).json(newPost);
        },
      );
    },
  );
});

//Получение поста по ID
app.get("/api/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  fs.readFile(
    path.join(__dirname, "./db/db.posts.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Ошибка чтения файла:", err);
        res.status(500).send("Ошибка сервера");
        return;
      }
      const posts = JSON.parse(data).posts;
      const post = posts.find((post) => post.id === postId);
      if (!post) {
        res.status(404).send("Пост не найден");
        return;
      }
      res.json(post);
    },
  );
});

//Удалить пост
app.delete("/api/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  fs.readFile(
    path.join(__dirname, "./db/db.posts.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Ошибка чтения файла:", err);
        res.status(500).send("Ошибка сервера");
        return;
      }
      let posts = JSON.parse(data).posts;
      posts = posts.filter((post) => post.id !== postId);
      fs.writeFile(
        path.join(__dirname, "./db/db.posts.json"),
        JSON.stringify({ posts }),
        "utf8",
        (err) => {
          if (err) {
            console.error("Ошибка записи файла:", err);
            res.status(500).send("Ошибка сервера");
            return;
          }
          res.status(204).send();
        },
      );
    },
  );
});
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

//Редактирование поста
app.put("/api/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  fs.readFile(
    path.join(__dirname, "./db/db.posts.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Ошибка чтения файла:", err);
        res.status(500).send("Ошибка сервера");
        return;
      }
      const posts = JSON.parse(data).posts;
      const postIndex = posts.findIndex((post) => post.id === postId);
      if (postIndex === -1) {
        res.status(404).send("Пост не найден");
        return;
      }
      const updatedPost = {
        id: postId,
        title: req.body.title,
        body: req.body.body,
        rate: req.body.rate,
        url: req.body.url,
      };
      posts[postIndex] = updatedPost;
      fs.writeFile(
        path.join(__dirname, "./db/db.posts.json"),
        JSON.stringify({ posts }),
        "utf8",
        (err) => {
          if (err) {
            console.error("Ошибка записи файла:", err);
            res.status(500).send("Ошибка сервера");
            return;
          }
          res.json(updatedPost);
        },
      );
    },
  );
});

// Создать новый комментарий для поста с обработкой ошибок
app.post("/api/posts/:postId/comments", (req, res) => {
  const postId = parseInt(req.params.postId);

  const { title, rate, body } = req.body;

  // Проверка поля rate: должно быть целым числом от 1 до 10
  if (!Number.isInteger(rate) || rate < 1 || rate > 10) {
    return res
      .status(400)
      .json({ error: "Поле rate должно быть целым числом от 1 до 10." });
  }

  // Проверка поля title: длина не более 30 символов
  if (typeof title !== "string" || title.length > 30) {
    return res
      .status(400)
      .json({ error: "Поле title не должно превышать 30 символов." });
  }

  // Проверка поля body: длина не более 500 символов
  if (typeof body !== "string" || body.length > 500) {
    return res
      .status(400)
      .json({ error: "Поле body не должно превышать 500 символов." });
  }

  fs.readFile(
    path.join(__dirname, "./db/db.comments.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Ошибка чтения файла:", err);
        return res.status(500).send("Ошибка сервера");
      }
      const comments = JSON.parse(data).comments;
      // Создаем новый комментарий с уникальным идентификатором
      const newComment = {
        postId: postId,
        id: Date.now() + Math.floor(Math.random() * 1000), // Уникальный идентификатор
        title: title,
        rate: rate,
        body: body,
      };
      comments.push(newComment);

      // Записываем обновленные данные обратно в файл
      fs.writeFile(
        path.join(__dirname, "./db/db.comments.json"),
        JSON.stringify({ comments }),
        "utf8",
        (err) => {
          if (err) {
            console.error("Ошибка записи файла:", err);
            return res.status(500).send("Ошибка сервера");
          }
          res.status(201).json(newComment);
        },
      );
    },
  );
});
// Получить все комментарии
app.get("/api/comments", (req, res) => {
  fs.readFile(
    path.join(__dirname, "./db/db.comments.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Ошибка чтения файла:", err);
        res.status(500).send("Ошибка сервера");
        return;
      }
      const commentList = JSON.parse(data).comments;
      res.json(commentList);
    },
  );
});

// Получить комментарии для конкретного поста
app.get("/api/posts/:postId/comments", (req, res) => {
  const postId = parseInt(req.params.postId);
  fs.readFile(
    path.join(__dirname, "./db/db.comments.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Ошибка чтения файла:", err);
        res.status(500).send("Ошибка сервера");
        return;
      }
      const comments = JSON.parse(data).comments;
      const postComments = comments.filter(
        (comment) => comment.postId === postId,
      );
      res.json(postComments);
    },
  );
});

//Удалить коментарий

app.delete("/api/comments/:id", (req, res) => {
  const commentId = parseInt(req.params.id);
  fs.readFile(
    path.join(__dirname, "./db/db.comments.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Ошибка чтения файла:", err);
        res.status(500).send("Ошибка сервера");
        return;
      }
      let comments = JSON.parse(data).comments;
      comments = comments.filter((comment) => comment.id !== commentId);
      fs.writeFile(
        path.join(__dirname, "./db/db.comments.json"),
        JSON.stringify({ comments }),
        "utf8",
        (err) => {
          if (err) {
            console.error("Ошибка записи файла:", err);
            res.status(500).send("Ошибка сервера");
            return;
          }
          res.status(204).send();
        },
      );
    },
  );
});

//Получить все фотографии
const photosFilePath = path.join(__dirname, "./db/db.photos.json");
app.get("/api/photos", (req, res) => {
  fs.readFile(photosFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Ошибка чтения файла:", err);
      res.status(500).send("Ошибка сервера");
      return;
    }
    const photos = JSON.parse(data).photos;
    res.json(photos);
  });
});

//Получение фото по ID

app.get("/api/photos/:id", (req, res) => {
  const photoId = parseInt(req.params.id);
  fs.readFile(
    path.join(__dirname, "./db/db.photos.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Ошибка чтения файла:", err);
        res.status(500).send("Ошибка сервера");
        return;
      }
      const photos = JSON.parse(data).photos;
      const photo = photos.find((photo) => photo.id === photoId);
      if (!photo) {
        res.status(404).send("Пост не найден");
        return;
      }
      res.json(photo);
    },
  );
});

//Удалить фото по ID

app.delete("/api/photos/:id", (req, res) => {
  const photoId = parseInt(req.params.id);
  fs.readFile(photosFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Ошибка чтения файла:", err);
      res.status(500).send("Ошибка сервера");
      return;
    }
    let photos = JSON.parse(data).photos;
    photos = photos.filter((photo) => photo.id !== photoId);
    fs.writeFile(photosFilePath, JSON.stringify({ photos }), "utf8", (err) => {
      if (err) {
        console.error("Ошибка записи файла:", err);
        res.status(500).send("Ошибка сервера");
        return;
      }
      res.status(204).send();
    });
  });
});

//Добавить нового пользователя
const usersFilePath = path.join(__dirname, "./db/db.users.json");
app.post("/api/users", (req, res) => {
  fs.readFile(
    path.join(__dirname, "./db/db.users.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Ошибка чтения файла:", err);
        res.status(500).send("Ошибка сервера");
        return;
      }
      const users = JSON.parse(data).users;
      const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
      };
      users.push(newUser);
      fs.writeFile(
        path.join(__dirname, "./db/db.users.json"),
        JSON.stringify({ users }),
        "utf8",
        (err) => {
          if (err) {
            console.error("Ошибка записи файла:", err);
            res.status(500).send("Ошибка сервера");
            return;
          }
          res.status(201).json(newUser);
        },
      );
    },
  );
});

//Получить пользователя

app.post("/api/user", (req, res) => {
  const userEmail = req.body.email;
  fs.readFile(
    path.join(__dirname, "./db/db.users.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Ошибка чтения файла:", err);
        res.status(500).send("Ошибка сервера");
        return;
      }
      const users = JSON.parse(data).users;
      const user = users.find((user) => user.email === userEmail);
      res.json(user);
    },
  );
});
//Удалить пользователя

app.delete("/api/photos/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  fs.readFile(
    path.join(__dirname, "./db/db.users.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Ошибка чтения файла:", err);
        res.status(500).send("Ошибка сервера");
        return;
      }
      let users = JSON.parse(data).users;
      users = users.filter((user) => user.id !== userId);
      fs.writeFile(
        path.join(__dirname, "./db/db.users.json"),
        JSON.stringify({ users }),
        "utf8",
        (err) => {
          if (err) {
            console.error("Ошибка записи файла:", err);
            res.status(500).send("Ошибка сервера");
            return;
          }
          res.status(204).send();
        },
      );
    },
  );
});
