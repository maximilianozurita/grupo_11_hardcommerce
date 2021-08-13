CREATE TABLE users(id INT(10) NOT NULL AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30),
	email VARCHAR(35),
	password VARCHAR(100),
	cell INT(10),
    image VARCHAR(60),
    PRIMARY KEY (id));
                     
CREATE TABLE categorys(id INT(10) NOT NULL AUTO_INCREMENT,
	info VARCHAR(30),
    PRIMARY KEY(id));

CREATE TABLE brands(id INT(10) NOT NULL AUTO_INCREMENT,
	name VARCHAR(30),
    PRIMARY KEY(id));

CREATE TABLE products(id INT(10) NOT NULL AUTO_INCREMENT,
	name VARCHAR(30),
    product_description VARCHAR(200),
    category_id INT(10),
    price INT(10),
    quota INT(10),
    short_description VARCHAR(30),
    stock INT(10),
    sales INT(10),
    brand_id INT (30),
    PRIMARY KEY(id),
    FOREIGN KEY(category_id) references categorys(id),
    FOREIGN KEY (brand_id) references brands (id));
    
    CREATE TABLE image_products(id INT(10) NOT NULL AUTO_INCREMENT,
	url VARCHAR(100),
    product_id INT(10),
    PRIMARY KEY(id),
    FOREIGN KEY(product_id) references products(id));
    
CREATE TABLE order_items(id INT(10) NOT NULL AUTO_INCREMENT,
	user_id INT(10),
    product_id INT(10),
    quantity INT(10),
    price INT(10),
    ordered INT(10),
    PRIMARY KEY(id),
    FOREIGN KEY(product_id) references products(id),
    FOREIGN KEY(user_id) references users(id));
    
CREATE TABLE orders(id INT(10) NOT NULL AUTO_INCREMENT,
	user_id INT(10),
    sum INT(10),
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) references users(id));
    

    
