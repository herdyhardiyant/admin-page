# Shop Admin Page

Aplikasi web sederhana berbasis Node.js, Express, EJS, dan MySQL untuk mengelola produk, stok, dan pembelian.

## Fitur

* Input pembelian produk
* Lihat semua produk dan stok
* Hapus pembelian
* Konfirmasi semua pembelian → update ke stok

## Cara Menjalankan Aplikasi

### 1. Clone Repository

```bash
git clone https://github.com/username/nama-repo.git

cd nama-repo
```
### 2. Install Dependency
```bash
npm install
```

### 3. Buat Database dan Struktur Tabel dengan MySQL
```sql
CREATE DATABASE shopdb;

CREATE TABLE Products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  price DECIMAL(10, 2)
);

CREATE TABLE Stock (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT UNIQUE,
  quantity INT,
  FOREIGN KEY (product_id) REFERENCES Products(id)
);

CREATE TABLE Purchases (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  quantity INT,
  purchase_date DATETIME,
  FOREIGN KEY (product_id) REFERENCES Products(id)
);

```

### 4. Tambahkan Data Awal

```sql
INSERT INTO Products (name, price) VALUES
('Laptop', 10000000),
('Mouse', 150000),
('Keyboard', 250000),
('Monitor', 2000000),
('Printer', 1200000),
('Speaker', 500000),
('Webcam', 300000),
('Flashdisk', 100000),
('Harddisk', 750000),
('RAM 8GB', 600000);
```
### 5. Konfigurasi Koneksi Database 
```js
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'shopdb'
});
```
### 6. Jalankan Aplikasi
```bash
node app.js

# akses di browser
http://localhost:3000/admin

``` 

## Struktur Folder 

```
├── public/           # File statis (CSS, JS, dll.)
├── views/            # File EJS
│   |── components/   # Komponen (navbar, form, dll.)
│   
├── routes/           # Route utama
│         
├── app.js            # Entry point aplikasi
└── README.md
```
