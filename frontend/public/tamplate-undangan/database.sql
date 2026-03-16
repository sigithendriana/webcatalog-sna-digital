CREATE DATABASE undangan;
USE undangan;

CREATE TABLE guests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invitation_code VARCHAR(10),
    guest_name VARCHAR(100),
    slug VARCHAR(150),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wishes (
id INT AUTO_INCREMENT PRIMARY KEY,
invitation_code VARCHAR(10),
guest_name VARCHAR(100),
message TEXT,
ip VARCHAR(50),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO guests (invitation_code,guest_name,slug)
VALUES
('C0','Nail Dhiyaul Haq','nail'),
('C0','Afif Bayu','afif'),
('C0','Sigit Hendri','sigit');