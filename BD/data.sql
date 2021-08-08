INSERT INTO USERS (name, last_name) VALUES ("jose","mgb");
INSERT INTO USERS (name, last_name) VALUES ("matias","mgb");
INSERT INTO USERS (name, last_name) VALUES ("hernan","mgb");
INSERT INTO USERS (name, last_name) VALUES ("julio","mgb");
INSERT INTO USERS (name, last_name) VALUES ("carola","mgb");
INSERT INTO USERS (name, last_name) VALUES ("ricoy","mgb");
INSERT INTO USERS (name, last_name) VALUES ("agus","mgb");
INSERT INTO USERS (name, last_name) VALUES ("dalton","mgb");


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


INSERT INTO categorys (info) VALUES ("Procesadores");
INSERT INTO categorys (info) values ("Discos mecanicos");
INSERT INTO categorys (info) values ("Motherboards");
INSERT INTO categorys (info) values ("Monitors");
INSERT INTO categorys (info) values ("SSD");
INSERT INTO categorys (info) values ("Placa de video");
INSERT INTO categorys (info) values ("Memorias ram");
INSERT INTO categorys (info) values ("Perifericos");

INSERT INTO products (name,product_description,category_id,price,quota,short_description,stock,sales,brand_id) VALUES ("Intel I7","Intel core I7 9700k", 1, 3999,12,"Procesador core I7",100,0,1);
INSERT INTO image_products (url,product_id) VALUES ("/images/imgProducts/Micro intel i7 9700k.jpg",1);