## Test Backend Developer PT. ORDE DIGITAL INTELEKTUAL (Ordent) 
## Studi kasus : Perpustakaan

## Dikerjakan oleh : Alfian Yuandika Putra

## Postman API Documentation : https://documenter.getpostman.com/view/15026364/UVeCNSco

## Gitlab repo: https://gitlab.com/alfianyuandika/ordent-test 

## How Tos : 
1. Clone repo atau extract file zip yang dikirim lewat email
2. Install node js jika belum diinstall 
   note : kodingan ini dikerjakan dengan menggunakan node versi 16.13.2 dan npm versi 8.3.0
3. Install nodemon jika belum diinstall dengan menggunakan command "npm install -g nodemon", tanpa tanda petik
4. cd ke directory 
5. ketikan command "npm i", tanpa tanda petik
6. buka link postman API documentation dan "Run in postman" 
   a. untuk menjalankan API pada development environment ganti "{{URL}}" dengan "localhost:3000", tanpa tanda petik
      a.1. Jika dilakukan di development environment jalankan perintah sebagai berikut:
           1. NODE_ENV=development sequelize db:create => untuk membuat database
           2. NODE_ENV=development sequelize db:migrate => migrasi table
           3. NODE_ENV=development sequelize db:seed:all => mengisi dengan data-data seeders atau data dummy
           4. npm run dev => menjalankan aplikasi

   b. untuk menjalankan API pada production environment ganti "{{URL}}" dengan "http://13.214.185.82", tanpa tanda petik
      b.1. production environment di deploy di AWS EC2
      b.2. jika dilakukan di production environment, untuk menjalankan API silahkan langsung klik "send"


## API Description
1. Authentication
   1.a. Sign Up = untuk sign up user dan mendapatkan token
        note = semua user yang Sign Up secara default mendapatkan role "peminjam". untuk mengganti role dengan "admin" dilakukan 
               manual dengan menggantinya di dbeaver
   1.b. Sign In = untuk sign in user dengan menggunakan email yang sudah terdaftar di sign up

2. Author
   2.a. Create Author = untuk menambah author. Membutuhkan role admin
   2.b. Get All Author = untuk melihat semua author yang sudah terdaftar
   2.c. Get One Author = untuk melihat satu author yang telah terdaftar berdasarkan id author
   2.d. Update Author = untuk merubah data author yang telah terdaftar berdasarkan id author. Membutuhkan role admin
   2.e. Delete Author = untuk menghapus satu author yang telah terdaftar berdasarkan id author. Membutuhkan role admin 

3. Buku
   3.a. Create Buku = untuk menambah buku. Membutuhkan role admin
   3.b. Get All Buku = untuk melihat semua buku yang sudah terdaftar
   3.c. Get One Buku = untuk melihat satu buku yang telah terdaftar berdasarkan id buku
   3.d. Update Buku = untuk merubah data buku yang telah terdaftar berdasarkan id buku. Membutuhkan role admin
   3.e. Delete Buku = untuk menghapus satu buku yang telah terdaftar berdasarkan id buku. Membutuhkan role admin 

4. Genre
   4.a. Create Genre = untuk menambah genre. Membutuhkan role admin
   4.b. Get All Genre = untuk melihat semua genre yang sudah terdaftar
   4.c. Get One Genre = untuk melihat satu genre yang telah terdaftar berdasarkan id genre
   4.d. Update Genre = untuk merubah data genre yang telah terdaftar berdasarkan id genre. Membutuhkan role admin
   4.e. Delete Genre = untuk menghapus satu genre yang telah terdaftar berdasarkan id genre. Membutuhkan role admin 

5. Transaksi
   5.a. Create Transaksi = untuk user melakukan transaksi peminjaman buku. Buku yang dipinjam sesuai dengan id buku yang telah terdaftar
                           menggunakan token user dengan role "peminjam". 
                           Jika transaksi berhasil, stok buku akan berkurang. Jika stok 0, transaksi tidak dapat dilakukan
    5.b. Get All Transaksi = untuk mendapatkan semua data transaksi. Membutuhkan role admin
    5.c. Get One Transaksi = untuk melihat data satu transaksi yang telah dilakukan berdasarkan id transaksi. Membutuhkan role admin
    5.d. Get All Transaksi from one User = untuk melihat semua data transaksi yang telah dilakukan oleh seorang user. Membutuhkan role admin 
    5.e. Get One Own Transaksi = user yang telah melakukan transaksi dapat melihat detail satu transaksi yang telah dilakukan. 
    5.f. Get All Own Transaksi = user dapat melihat semua transaksi yang telah dilakukan 

6. User
   6.a. Get All User = untuk mendapatkan data semua user yang telah terdaftar. Membutuhkan role admin
   6.b. Get One User = untuk mendapatkan data satu user yang telah terdaftar. Membutuhkan role admin

## Unit testing
1. Untuk menjalankan unit testing :
   a. NODE_ENV=test sequelize db:create => untuk membuat database
   b. NODE_ENV=test sequelize db:migrate => migrasi table
   c. NODE_ENV=test sequelize db:seed:all => mengisi dengan data-data seeders atau data dummy
   d. npm run test => menjalankan aplikasi


## Diagram ERD ada di file ERD.png
