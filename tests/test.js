const request = require("supertest");
const app = require("../index");
const { author, buku, genre, transaksi, user } = require("../db/models");
let tokenCustomer;

//////////////////////////////////////////////////////////////// User Sign Up / Sign In //////////////////////////////////////////////////////////////////
// Auth test
describe("Auth Test", () => {
  describe("/signup POST", () => {
    it("It should make user and get the token", async () => {
      const res = await request(app).post("/auth/signup").send({
        nama: "Alfian1234",
        email: "alfian1234@gmail.com",
        password: "Alfian_1234",
        confirm_password: "Alfian_1234",
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Berhasil");
    });
  });
  describe("/signup POST", () => {
    it("It should error email has been used", async () => {
      const res = await request(app).post("/auth/signup").send({
        nama: "Alfian1234",
        email: "alfian1234@gmail.com",
        password: "Alfian_1234",
        confirm_password: "Alfian_1234",
      });
      expect(res.statusCode).toEqual(401);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Email sudah terdaftar");
    });
  });

  describe("/signup POST", () => {
    it("It should error confirm password", async () => {
      const res = await request(app).post("/auth/signup").send({
        nama: "Alfian1234",
        email: "alfian1234@gmail.com",
        password: "Alfian_1234",
        confirm_password: "Alfian_12345",
      });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Password tidak sama");
    });
  });
  describe("/signup POST", () => {
    it("It should error email format", async () => {
      const res = await request(app).post("/auth/signup").send({
        nama: "Alfian1234",
        email: "alfian1234com",
        password: "Alfian_1234",
        confirm_password: "Alfian_1234",
      });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Gunakan email yang valid");
    });
  });
  describe("/signup POST", () => {
    it("It should error weak password", async () => {
      const res = await request(app).post("/auth/signup").send({
        nama: "Alfian1234",
        email: "alfian1234@gmail.com",
        password: "1234",
        confirm_password: "1234",
      });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual(
        "Password membutuhkan huruf besar, huruf kecil, angka dan simbol"
      );
    });
  });
  describe("/signin POST", () => {
    it("It should success signin", async () => {
      const res = await request(app).post("/auth/signin").send({
        email: "alfian1234@gmail.com",
        password: "Alfian_1234",
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Berhasil");
    });
  });
  describe("/signin POST", () => {
    it("It should error signin email not found", async () => {
      const res = await request(app).post("/auth/signin").send({
        email: "alfian12345@gmail.com",
        password: "Alfian_1234",
      });
      expect(res.statusCode).toEqual(401);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Email tidak ditemukan");
    });
  });
  describe("/signin POST", () => {
    it("It should error signin wrong password", async () => {
      const res = await request(app).post("/auth/signin").send({
        email: "alfian1234@gmail.com",
        password: "Alfian_12345",
      });
      expect(res.statusCode).toEqual(401);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Password yang digunakan salah");
    });
  });
});

//////////////////////////////////////////////////////////////// CRUD Author /////////////////////////////////////
//Create Author
describe("Create Author Test", () => {
  describe("author/create POST", () => {
    it("It should success", async () => {
      if (user.role == "admin") {
        const res = await request(app)
          .post("/author/create/")
          .send({
            nama: "Harold Kumar",
          })
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("Berhasil");
      }
    });
  });

  describe("author/create POST", () => {
    it("It should error not authorized", async () => {
      if (user.role == "peminjam") {
        const res = await request(app)
          .post("/author/create/")
          .send({
            nama: "Junaidi",
          })
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("You're not authorized");
      }
    });
  });
  describe("author/create POST", () => {
    it("It should error no auth token", async () => {
      if (user.role == "admin") {
        const res = await request(app).post("/author/create/").send({
          nama: "Mahmud",
        });

        expect(res.statusCode).toEqual(403);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("No auth token");
      }
    });
  });
});

//Get All Author
describe("Get Author All Test", () => {
  describe("author/ GET", () => {
    it("It should success", async () => {
      const res = await request(app).get("/author/all");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Berhasil");
    });
  });
});

//Get One Author
describe("Get One Author Test", () => {
  describe("author/:id GET", () => {
    it("It should success", async () => {
      const res = await request(app).get(
        "/author/14288c64-337d-4aac-8cb3-a3a0f9c223d8"
      );

      expect(res.statusCode).toEqual(201);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Berhasil");
    });
  });
  describe("author/:id GET", () => {
    it("It should error author not found", async () => {
      const res = await request(app).get("/author/5");

      expect(res.statusCode).toEqual(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Author tidak ditemukan");
    });
  });
});

//Update Author
describe("Update Author Test", () => {
  describe("author/update/:id PATCH", () => {
    it("It should success", async () => {
      if (user.role == "admin") {
        const res = await request(app)
          .patch("/author/update/14288c64-337d-4aac-8cb3-a3a0f9c223d8")
          .send({
            nama: "Sir Arthur Conan Doyle",
          })
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("Update author berhasil");
      }
    });
  });
  describe("author/update/:id PATCH", () => {
    it("It should error author not found", async () => {
      if (user.role == "admin") {
        const res = await request(app)
          .patch("/author/update/6")
          .send({
            nama: "Solihin",
          })
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("Author tidak ditemukan");
      }
    });
  });

  describe("author/update/:id PATCH", () => {
    it("It should error not authorized", async () => {
      if (user.role == "peminjam") {
        const res = await request(app)
          .patch("/author/update/14288c64-337d-4aac-8cb3-a3a0f9c223d8")
          .send({
            nama: "Michael",
          });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("You're not authorized");
      }
    });
  });
  describe("author/update/:id PATCH", () => {
    it("It should error no auth token", async () => {
      if (user.role == "admin") {
        const res = await request(app)
          .patch("/author/update/14288c64-337d-4aac-8cb3-a3a0f9c223d8")
          .send({
            nama: "Michael",
          });

        expect(res.statusCode).toEqual(403);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("No auth token");
      }
    });
  });
});

//Delete Author
describe("Delete Author Test", () => {
  describe("author/delete/:id DELETE", () => {
    it("It should success", async () => {
      if (user.role == "admin") {
        const res = await request(app)
          .delete("/author/delete/14288c64-337d-4aac-8cb3-a3a0f9c223d8")
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("Delete author berhasil");
      }
    });
  });
  describe("author/delete/:id DELETE", () => {
    it("It should error author not found", async () => {
      if (user.role == "admin") {
        const res = await request(app)
          .delete("/author/delete/6")

          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(404);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("Author tidak ditemukan");
      }
    });
  });

  describe("author/delete/:id DELETE", () => {
    it("It should error not authorized", async () => {
      if (user.role == "peminjam") {
        const res = await request(app)
          .delete("/author/delete/14288c64-337d-4aac-8cb3-a3a0f9c223e5")

          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("You're not authorized");
      }
    });
  });
  describe("author/delete/:id DELETE", () => {
    it("It should error no auth token", async () => {
      if (user.role == "admin") {
        const res = await request(app).delete(
          "/author/delete/14288c64-337d-4aac-8cb3-a3a0f9c223e5"
        );

        expect(res.statusCode).toEqual(403);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("No auth token");
      }
    });
  });
});

//////////////////////////////////////////////////////////////// CRUD Genre /////////////////////////////////////
//Create Genre
describe("Create Genre Test", () => {
  describe("genre/create POST", () => {
    it("It should success", async () => {
      if (user.role == "admin") {
        const res = await request(app)
          .post("/genre/create/")
          .send({
            nama_genre: "Cerita Rakyat",
          })
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("Berhasil");
      }
    });
  });

  describe("genre/create POST", () => {
    it("It should error not authorized", async () => {
      if (user.role == "peminjam") {
        const res = await request(app)
          .post("/genre/create/")
          .send({
            nama_genre: "Cerita Rakyat",
          })
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("You're not authorized");
      }
    });
  });
  describe("genre/create POST", () => {
    it("It should error no auth token", async () => {
      if (user.role == "admin") {
        const res = await request(app).post("/genre/create/").send({
          nama_genre: "Cerita Rakyat",
               });

        expect(res.statusCode).toEqual(403);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("No auth token");
      }
    });
  });
});

//Get All Genre
describe("Get Genre All Test", () => {
  describe("genre/ GET", () => {
    it("It should success", async () => {
      const res = await request(app).get("/genre/all");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Berhasil");
    });
  });
});

//Get One Genre
describe("Get One Genre Test", () => {
  describe("genre/:id GET", () => {
    it("It should success", async () => {
      const res = await request(app).get(
        "/genre/2"
      );

      expect(res.statusCode).toEqual(201);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Berhasil");
    });
  });
  describe("genre/:id GET", () => {
    it("It should error genre not found", async () => {
      const res = await request(app).get("/genre/5555");

      expect(res.statusCode).toEqual(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Genre tidak ditemukan");
    });
  });
});

//Update Genre
describe("Update Genre Test", () => {
  describe("genre/update/:id PATCH", () => {
    it("It should success", async () => {
      if (user.role == "admin") {
        const res = await request(app)
          .patch("/genre/update/9")
          .send({
            nama_genre: "Indonesia Asli",
                      })
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("Update genre berhasil");
      }
    });
  });
  describe("genre/update/:id PATCH", () => {
    it("It should error genre not found", async () => {
      if (user.role == "admin") {
        const res = await request(app)
          .patch("/genre/update/666")
          .send({
            nama_genre: "Cerita Anak",
                    })
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("Genre tidak ditemukan");
      }
    });
  });
  
  describe("genre/update/:id PATCH", () => {
    it("It should error not Authorized", async () => {
      if (user.role == "peminjam") {
        const res = await request(app)
          .patch("/genre/update/2")
          .send({
            nama_genre: "Cerita Anak",
            
          });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("You're not authorized");
      }
    });
  });
  describe("genre/update/:id PATCH", () => {
    it("It should error no auth token", async () => {
      if (user.role == "admin") {
        const res = await request(app)
          .patch("/genre/update/8")
          .send({
            nama_genre: "Cerita Anak",
                      });

        expect(res.statusCode).toEqual(403);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("No auth token");
      }
    });
  });
});

//Delete Genre
describe("Delete Genre Test", () => {
  describe("genre/delete/:id DELETE", () => {
    it("It should success", async () => {
      if (user.role == "admin") {
        const res = await request(app)
          .delete("/genre/delete/9")
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("Delete genre berhasil");
      }
    });
  });
  describe("genre/delete/:id DELETE", () => {
    it("It should error genre not found", async () => {
      if (user.role == "admin") {
        const res = await request(app)
          .delete("/genre/delete/666")

          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(404);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("Genre tidak ditemukan");
      }
    });
  });

  describe("genre/delete/:id DELETE", () => {
    it("It should error not authorized", async () => {
      if (user.role == "peminjam") {
        const res = await request(app)
          .delete("/genre/delete/5")

          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("You're not authorized");
      }
    });
  });
  describe("genre/delete/:id DELETE", () => {
    it("It should error no auth token", async () => {
      if (user.role == "admin") {
        const res = await request(app).delete(
          "/genre/delete/5"
        );

        expect(res.statusCode).toEqual(403);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("No auth token");
      }
    });
  });
});

//////////////////////////////////////////////////////////////// CRUD Buku /////////////////////////////////////
//Create Buku
describe("Create Buku Test", () => {
  describe("buku/create POST", () => {
    it("It should success", async () => {
      if (user.role == "admin") {
        const res = await request(app)
          .post("/buku/create/")
          .send({
            id_author: "14288c64-337d-4aac-8cb3-a3a0f9c223d8",
            judul: "Doraemon",
            edisi: 5,
            tanggal_terbit: "2022/12/05",
            id_genre: "2",
            stok: 10,
          })
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("Berhasil");
      }
    });
  });

  describe("buku/create POST", () => {
    it("It should error not authorized", async () => {
      if (user.role == "peminjam") {
        const res = await request(app)
          .post("/buku/create/")
          .send({
            id_author: "14288c64-337d-4aac-8cb3-a3a0f9c223d8",
            judul: "Doraemon",
            edisi: 5,
            tanggal_terbit: "2022/12/05",
            id_genre: "2",
            stok: 10,
          })
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("You're not authorized");
      }
    });
  });
  describe("buku/create POST", () => {
    it("It should error no auth token", async () => {
      if (user.role == "admin") {
        const res = await request(app).post("/buku/create/").send({
          id_author: "14288c64-337d-4aac-8cb3-a3a0f9c223d8",
          judul: "Doraemon",
          edisi: 5,
          tanggal_terbit: "2022/12/05",
          id_genre: "2",
          stok: 10,
        });

        expect(res.statusCode).toEqual(403);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("No auth token");
      }
    });
  });
  describe("buku/create POST", () => {
    it("It should error author not found", async () => {
      if (user.role == "admin") {
        const res = await request(app).post("/buku/create/").send({
          id_author: "123456",
          judul: "Doraemon",
          edisi: 5,
          tanggal_terbit: "2022/12/05",
          id_genre: "2",
          stok: 10,
        });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("Author tidak ditemukan");
      }
    });
  });
  describe("buku/create POST", () => {
    it("It should error genre not found", async () => {
      if (user.role == "admin") {
        const res = await request(app).post("/buku/create/").send({
          id_author: "14288c64-337d-4aac-8cb3-a3a0f9c223d8",
          judul: "Doraemon",
          edisi: 5,
          tanggal_terbit: "2022/12/05",
          id_genre: "222",
          stok: 10,
        });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("Genre tidak ditemukan");
      }
    });
  });
  describe("buku/create POST", () => {
    it("It should error numeric validator", async () => {
      if (user.role == "admin") {
        const res = await request(app).post("/buku/create/").send({
          id_author: "14288c64-337d-4aac-8cb3-a3a0f9c223d8",
          judul: "Doraemon",
          edisi: 5,
          tanggal_terbit: "2022/12/05",
          id_genre: "2",
          stok: "10asdf",
        });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("Stok harus dalam bentuk angka");
      }
    });
  });
  describe("buku/create POST", () => {
    it("It should error date validator", async () => {
      if (user.role == "admin") {
        const res = await request(app).post("/buku/create/").send({
          id_author: "14288c64-337d-4aac-8cb3-a3a0f9c223d8",
          judul: "Doraemon",
          edisi: 5,
          tanggal_terbit: "1234567",
          id_genre: "2",
          stok: "10",
        });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("Penulisan tanggal terbit harus sesuai (YYYY/MM/DD)");
      }
    });
  });
});

//Get All Buku
describe("Get Buku All Test", () => {
  describe("buku/ GET", () => {
    it("It should success", async () => {
      const res = await request(app).get("/buku/all");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Berhasil");
    });
  });
});

//Get One Buku
describe("Get One Buku Test", () => {
  describe("buku/:id GET", () => {
    it("It should success", async () => {
      const res = await request(app).get("/buku/76f65620-61a2-4999-9bd1-a8f347d3ed83");

      expect(res.statusCode).toEqual(201);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Berhasil");
    });
  });
  describe("buku/:id GET", () => {
    it("It should error buku not found", async () => {
      const res = await request(app).get("/buku/5555");

      expect(res.statusCode).toEqual(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("Buku tidak ditemukan");
    });
  });
});

//Update Buku
describe("Update Buku Test", () => {
  describe("buku/update/:id PATCH", () => {
    it("It should success", async () => {
      if (user.role == "admin") {
        const res = await request(app)
          .patch("/buku/update/9")
          .send({
            id_author: "14288c64-337d-4aac-8cb3-a3a0f9c223d8",
            judul: "One Piece",
            edisi: 5,
            tanggal_terbit: "2022/12/05",
            id_genre: "2",
            stok: "10",
          })
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("Update buku berhasil");
      }
    });
  });
  describe("buku/update/:id PATCH", () => {
    it("It should error buku not found", async () => {
      if (user.role == "admin") {
        const res = await request(app)
          .patch("/buku/update/666")
          .send({
            id_author: "14288c64-337d-4aac-8cb3-a3a0f9c223d8",
            judul: "One Piece",
            edisi: 5,
            tanggal_terbit: "2022/12/05",
            id_genre: "2",
            stok: "10",
          })
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("Buku tidak ditemukan");
      }
    });
  });

  describe("buku/update/:id PATCH", () => {
    it("It should error not Authorized", async () => {
      if (user.role == "peminjam") {
        const res = await request(app).patch("/buku/update/2").send({
          id_author: "14288c64-337d-4aac-8cb3-a3a0f9c223d8",
          judul: "One Piece",
          edisi: 5,
          tanggal_terbit: "2022/12/05",
          id_genre: "2",
          stok: "10",
        });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("You're not authorized");
      }
    });
  });
  describe("buku/update/:id PATCH", () => {
    it("It should error no auth token", async () => {
      if (user.role == "admin") {
        const res = await request(app).patch("/buku/update/8").send({
          id_author: "14288c64-337d-4aac-8cb3-a3a0f9c223d8",
          judul: "One Piece",
          edisi: 5,
          tanggal_terbit: "2022/12/05",
          id_genre: "2",
          stok: "10",
        });

        expect(res.statusCode).toEqual(403);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("No auth token");
      }
    });
  });
});

//Delete Buku
describe("Delete Buku Test", () => {
  describe("buku/delete/:id DELETE", () => {
    it("It should success", async () => {
      if (user.role == "admin") {
        const res = await request(app)
          .delete("/buku/delete/f50a5e0d-ad6c-4924-856e-0973e4ee74b0")
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("Delete buku berhasil");
      }
    });
  });
  describe("buku/delete/:id DELETE", () => {
    it("It should error buku not found", async () => {
      if (user.role == "admin") {
        const res = await request(app)
          .delete("/buku/delete/666")

          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(404);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("Buku tidak ditemukan");
      }
    });
  });

  describe("buku/delete/:id DELETE", () => {
    it("It should error not authorized", async () => {
      if (user.role == "peminjam") {
        const res = await request(app)
          .delete("/buku/delete/f50a5e0d-ad6c-4924-856e-0973e4ee74b0")

          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("You're not authorized");
      }
    });
  });
  describe("buku/delete/:id DELETE", () => {
    it("It should error no auth token", async () => {
      if (user.role == "admin") {
        const res = await request(app).delete("/buku/delete/f50a5e0d-ad6c-4924-856e-0973e4ee74b0");

        expect(res.statusCode).toEqual(403);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("No auth token");
      }
    });
  });
});


//////////////////////////////////////////////////////////////// Transaksi /////////////////////////////////////
//Create Transaksi
describe("Create Transaki Test", () => {
  describe("transaksi/order CREATE", () => {
    it("It should success", async () => {
      if (user.role == "peminjam") {
        const res = await request(app)
          .post("transaksi/order ")
          .send({
            id_buku: "76f65620-61a2-4999-9bd1-a8f347d3ed87",
          })
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("Success");
      }
    });
  });
  describe("transaksi/order CREATE", () => {
    it("It should error author not found", async () => {
      if (user.role == "peminjam") {
        const res = await request(app)
          .post("transaksi/order ")
          .send({
            id_buku: "123456",
          })
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(404);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("Judul buku tidak ditemukan");
      }
    });
  });
  describe("transaksi/order CREATE", () => {
    it("It should error no auth token", async () => {
      if (user.role == "peminjam") {
        const res = await request(app).post("transaksi/order ").send({
          id_buku: "76f65620-61a2-4999-9bd1-a8f347d3ed87",
        });

        expect(res.statusCode).toEqual(404);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("No auth token");
      }
    });
  });
});

//Get All Transaksi
describe("Get Transaksi All Test", () => {
  describe("transaksi/ GET", () => {
    it("It should success", async () => {
      if (user.role == "admin") {
        const res = await request(app)
          .get("/transaksi")
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("Berhasil");
      }
    });
  });
  describe("transaksi/ GET", () => {
    it("It should error no auth token", async () => {
      if (user.role == "admin") {
        const res = await request(app).get("/transaksi");

        expect(res.statusCode).toEqual(403);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("No auth token");
      }
    });
  });
});

//Get One Transaksi
describe("Get One Transaksi Test", () => {
  describe("transaksi/:id GET", () => {
    it("It should success", async () => {
      if (user.role == "admin") {
        const res = await request(app)
          .get("/transaksi/753d1844-d95a-44da-b22f-e12a98e76414")
          .set({
            Authorization: `Bearer ${tokenCustomer}`,
          });

        expect(res.statusCode).toEqual(404);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.message).toEqual("Berhasil");
      }
    });
  });
  describe("author/:id GET", () => {
    describe("transaksi/:id GET", () => {
      it("It should success", async () => {
        if (user.role == "peminjam") {
          const res = await request(app)
            .get("/transaksi/12345")
            .set({
              Authorization: `Bearer ${tokenCustomer}`,
            });

          expect(res.statusCode).toEqual(404);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body.message).toEqual("Transaksi tidak ditemukan");
        }
      });
    });

    describe("author/:id GET", () => {
      it("It should error no auth token", async () => {
        if (user.role == "peminjam") {
          const res = await request(app).get(
            "/author/176eaf7f-a401-46d1-a893-05267cb0c055"
          );

          expect(res.statusCode).toEqual(403);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body.message).toEqual("No auth token");
        }
      });
    });
  });
});
