CREATE TABLE user(id INT(10) NOT NULL AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL,
	lastName VARCHAR(30),
	email VARCHAR(30),
	password INT(10),
	cell INT(10),
    image VARCHAR(30),
    PRIMARY KEY (id));
                     
CREATE TABLE category(id INT(10) NOT NULL AUTO_INCREMENT,
	info VARCHAR(30),
    PRIMARY KEY(id));
    
CREATE TABLE imageProduct(id INT(10) NOT NULL AUTO_INCREMENT,
	url VARCHAR(30),
    productId INT(10),
    PRIMARY KEY(id));

CREATE TABLE marca(id INT(10) NOT NULL AUTO_INCREMENT,
	name VARCHAR(30),
    PRIMARY KEY(id));

CREATE TABLE product(id INT(10) NOT NULL AUTO_INCREMENT,
	name VARCHAR(30),
    descriptioon VARCHAR(30),
    categoryId INT(10),
    price INT(10),
    cuotas INT(10),
    imageId INT(10),
    descriptionTech VARCHAR(30),
    stock INT(10),
    sales INT(10),
    tradeMarkId INT(10),
    PRIMARY KEY(id),
    FOREIGN KEY(categoryId) references category(id),
    FOREIGN KEY(imageId) references imageProduct(id),
    FOREIGN KEY(tradeMarkId) references marca(id));
    
CREATE TABLE orderItem(id INT(10) NOT NULL AUTO_INCREMENT,
	userId INT(10),
    idProduct INT(10),
    cantidad INT(10),
    price INT(10),
    orderId INT(10),
    PRIMARY KEY(id),
    FOREIGN KEY(idProduct) references product(id),
    FOREIGN KEY(userId) references user(id));
    
CREATE TABLE orderr(id INT(10) NOT NULL AUTO_INCREMENT,
	idUser INT(10),
    sum INT(10),
    PRIMARY KEY(id),
    FOREIGN KEY(idUser) references user(id));
    
INSERT INTO USER (name, lastName, email) VALUES ("jose","mgb");
INSERT INTO USER (name, lastName, email) VALUES ("matias","mgb");
INSERT INTO USER (name, lastName, email ) VALUES ("hernan","mgb");
INSERT INTO USER (name, lastName, email) VALUES ("julio","mgb");
INSERT INTO USER (name, lastName, email) VALUES ("carola","mgb");
INSERT INTO USER (name, lastName, email) VALUES ("ricoy","mgb");
INSERT INTO USER (name, lastName, email) VALUES ("agus","mgb");
INSERT INTO USER (name, lastName, email) VALUES ("dalton","mgb");
