INSERT INTO brands (name) VALUES ("Intel");
INSERT INTO brands (name) VALUES ("AMD");
INSERT INTO brands (name) VALUES ("asus");
INSERT INTO brands (name) VALUES ("Nvidia");
INSERT INTO brands (name) VALUES ("Evga");
INSERT INTO brands (name) VALUES ("msi");
INSERT INTO brands (name) VALUES ("gigabyte");
INSERT INTO brands (name) VALUES ("asrock");
INSERT INTO brands (name) VALUES ("LG");
INSERT INTO brands (name) VALUES ("Sony");
INSERT INTO brands (name) VALUES ("Samsung");
INSERT INTO brands (name) VALUES ("Benq");
INSERT INTO brands (name) VALUES ("Dell");
INSERT INTO brands (name) VALUES ("logitech");
INSERT INTO brands (name) VALUES ("Razer");
INSERT INTO brands (name) VALUES ("Thermaltake");
INSERT INTO brands (name) VALUES ("Steelseries");
INSERT INTO brands (name) VALUES ("HyperX");
INSERT INTO brands (name) VALUES ("Crucial");
INSERT INTO brands (name) VALUES ("WesterDigital");
INSERT INTO brands (name) VALUES ("Zotac");
INSERT INTO brands (name) VALUES ("Saphire");
INSERT INTO brands (name) VALUES ("HP");
INSERT INTO brands (name) VALUES ("Lenovo");
INSERT INTO brands (name) VALUES ("Kingston");


INSERT INTO categories (info) VALUES ("Procesadores");
INSERT INTO categories (info) values ("Discos mecanicos");
INSERT INTO categories (info) values ("Motherboards");
INSERT INTO categories (info) values ("Monitors");
INSERT INTO categories (info) values ("SSD");
INSERT INTO categories (info) values ("Placa de video");
INSERT INTO categories (info) values ("Memorias ram");
INSERT INTO categories (info) values ("Perifericos");

INSERT INTO products (name,product_description,category_id,price,quota,short_description,stock,sales,brand_id) VALUES ("Disco Solido","Producto usado", 2, 3999,12,"ultima generación",100,0,19);
INSERT INTO image_products (url,product_id) VALUES ("/images/imgProducts/discosolido1.png",1);

INSERT INTO products (name,product_description,category_id,price,quota,short_description,stock,sales,brand_id) VALUES ("Monitor LG","Producto usado", 4, 5000,12,"producto en oferta",100,0,12);
INSERT INTO image_products (url,product_id) VALUES ("/images/imgProducts/monitor1.png",2);

INSERT INTO products (name,product_description,category_id,price,quota,short_description,stock,sales,brand_id) VALUES ("Teclado","Producto usado", 8, 8000,12,"producto en oferta",100,0,12);
INSERT INTO image_products (url,product_id) VALUES ("/images/imgProducts/teclado1.png",3);
INSERT INTO image_products (url,product_id) VALUES ("/images/imgProducts/teclado2.png",3);
INSERT INTO image_products (url,product_id) VALUES ("/images/imgProducts/teclado3.png",3);

INSERT INTO products (name,product_description,category_id,price,quota,short_description,stock,sales,brand_id) VALUES ("ryzen","Producto usado", 1, 8000,12,"producto en oferta",100,0,12);
INSERT INTO image_products (url,product_id) VALUES ("/images/imgProducts/ryzen.jpg",4);

INSERT INTO products (name,product_description,category_id,price,quota,short_description,stock,sales,brand_id) VALUES ("i7","Producto usado", 1, 8000,12,"producto en oferta",100,0,12);
INSERT INTO image_products (url,product_id) VALUES ("/images/imgProducts/i7.jpg",5);

INSERT INTO products (name,product_description,category_id,price,quota,short_description,stock,sales,brand_id) VALUES ("Rtx","Producto usado", 6, 8000,12,"producto en oferta",100,0,12);
INSERT INTO image_products (url,product_id) VALUES ("/images/imgProducts/rtx.jpg",6);
INSERT INTO image_products (url,product_id) VALUES ("/images/imgProducts/rtx2.jpg",6);

INSERT INTO products (name,product_description,category_id,price,quota,short_description,stock,sales,brand_id) VALUES ("Mouse Logitech","Producto usado", 8, 8000,12,"producto en oferta",100,0,12);
INSERT INTO image_products (url,product_id) VALUES ("/images/imgProducts/mouse1.png",7);
INSERT INTO image_products (url,product_id) VALUES ("/images/imgProducts/mouse2.png",7);
INSERT INTO image_products (url,product_id) VALUES ("/images/imgProducts/mouse3.png",7);