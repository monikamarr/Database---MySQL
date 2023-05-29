-- phpMyAdmin SQL Dump
-- version 5.2.1-1.el7.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 21, 2023 at 08:11 PM
-- Server version: 10.6.12-MariaDB-log
-- PHP Version: 8.2.4

-- SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_marekmo`
--

-- --------------------------------------------------------

--
-- Table structure for table `Customers`
--

CREATE OR REPLACE TABLE `Customers` (
  `idCustomer` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  PRIMARY KEY (idCustomer)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Customers`
--

INSERT INTO `Customers` ( `firstName`, `lastName`, `address`) VALUES
('Luanne', 'Platter', '2125 Prop St., Arlen, TX 77002'),
('Dale', 'Gribble', '589 Ane Rd., Arlen, TX 77002'),
('Yogi', 'Victor', '4721 Ulica St., Arlen, TX 77002'),
('John', 'Redcorn', '568 Costam Cir., Arlen, TX 77002'),
('Jenny', 'Medina', '9868 Mike Judge Ln. Arlen, TX 77002');

-- --------------------------------------------------------

--
-- Table structure for table `Employees`
--

CREATE OR REPLACE TABLE `Employees` (
  `idEmployee` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phoneNumber` varchar(10) NOT NULL,
  PRIMARY KEY(idEmployee)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Employees`
--

INSERT INTO `Employees` ( `firstName`, `lastName`, `email`, `phoneNumber`) VALUES
('Hank', 'Hill', 'hank.hill.email@com', '5109995000'),
('Maria', 'Montalvo', 'maria.monta@emailsoski.com', '4155989658'),
('Buck', 'Strickland', 'buck.strickland@stricklandpropane.com', '9193041960'),
('Debbie', 'Grund', 'dgrund@stricklandpropane.com', '8288675309'),
('Joe', 'Jack', 'joejack@stricklandpropane.com', '7779874562');

-- --------------------------------------------------------

--
-- Table structure for table `Products`
--

CREATE OR REPLACE TABLE `Products` (
  `idProduct` int(11) NOT NULL AUTO_INCREMENT,
  `productName` varchar(50) NOT NULL,
  `wholesalePrice` decimal(19,2) NOT NULL,
  `retailPrice` decimal(19,2) NOT NULL,
  `idVendor` int(11) NOT NULL,
  PRIMARY KEY(idProduct)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Products`
--

INSERT INTO `Products` (`productName`, `wholesalePrice`, `retailPrice`, `idVendor`) VALUES
('Liquid Propane', 99.99, 149.99, 4),
('Grill', 119.99, 169.99, 2),
('Propane Tank', 109.99, 159.99, 1),
('Valve', 59.99, 119.99, 3),
('Hose', 27.99, 69.99, 2),
('Adapter', 25.99, 59.99, 5);

-- --------------------------------------------------------

--
-- Table structure for table `ProductSales`
--

CREATE OR REPLACE TABLE `ProductSales` (
  `idProductSales` int(11) NOT NULL,
  `idSalesInvoice` int(11) NOT NULL,
  `idProduct` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `ProductSales`
--

INSERT INTO `ProductSales` (`idProductSales`, `idSalesInvoice`, `idProduct`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `SalesInvoices`
--

CREATE OR REPLACE TABLE `SalesInvoices` (
  `idSalesInvoice` int(11) NOT NULL AUTO_INCREMENT,
  `orderQuantity` int(11) NOT NULL,
  `productPrice` decimal(19,2) NOT NULL,
  `salesDate` date NOT NULL,
  `idCustomer` int(11) NOT NULL,
  `idEmployee` int(11) NOT NULL,
  PRIMARY KEY(idSalesInvoice)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `SalesInvoices`
--

INSERT INTO `SalesInvoices` ( `orderQuantity`, `productPrice`, `salesDate`, `idCustomer`, `idEmployee`) VALUES
(3, 2.00, '1874-01-02', 1, 1),
(5, 4.00, '1874-01-03', 1, 1),
(4, 5.00, '1874-01-04', 2, 2),
(3, 6.00, '1874-01-07', 3, 1),
(2, 3.00, '1874-01-07', 4, 2),
(5, 1.00, '1874-01-15', 4, 2),
(1, 4.00, '1874-01-21', 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Vendors`
--

CREATE OR REPLACE TABLE `Vendors` (
  `idVendor` int(11) NOT NULL AUTO_INCREMENT,
  `vendorName` varchar(50) NOT NULL,
  `vendorAddress` varchar(100) NOT NULL,
  PRIMARY KEY(idVendor)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Vendors`
--

INSERT INTO `Vendors` ( `vendorName`, `vendorAddress`) VALUES
('Vogner', '666 Cold Ave., Ketchup City, OK 73019'),
('Char-King', '5678 Razorback Road, Hogsville, AR 72201'),
('BigPropane', '910 Bourbon St., Jambalaya Junction, LA 70116'),
('Norman S. Propane', '2468 Enchilada Blvd., Chili Pepper Springs, NM 87105'),
('GreenPropane', '1357 Sunflower St., Wheatlandia, KS 67202');

--
-- Indexes for dumped tables
--


--

--
-- Indexes for table `Products`
--
ALTER TABLE `Products`
  ADD KEY `idVendor` (`idVendor`);

--
-- Indexes for table `ProductSales`
--
ALTER TABLE `ProductSales`
  ADD KEY `idSalesInvoice` (`idSalesInvoice`),
  ADD KEY `idProduct` (`idProduct`);

--
-- Indexes for table `SalesInvoices`
--
ALTER TABLE `SalesInvoices`
  ADD KEY `idCustomer` (`idCustomer`),
  ADD KEY `idEmployee` (`idEmployee`);

--
-- Indexes for table `Vendors`
--


--
-- Constraints for dumped tables
--

--
-- Constraints for table `Products`
--
ALTER TABLE `Products`
  ADD CONSTRAINT `Products_ibfk_1` FOREIGN KEY (`idVendor`) REFERENCES `Vendors` (`idVendor`) ON DELETE CASCADE;

--
-- Constraints for table `ProductSales`
--
ALTER TABLE `ProductSales`
  ADD CONSTRAINT `ProductSales_ibfk_1` FOREIGN KEY (`idSalesInvoice`) REFERENCES `SalesInvoices` (`idSalesInvoice`) ON DELETE CASCADE,
  ADD CONSTRAINT `ProductSales_ibfk_2` FOREIGN KEY (`idProduct`) REFERENCES `Products` (`idProduct`) ON DELETE CASCADE;

--
-- Constraints for table `SalesInvoices`
--
ALTER TABLE `SalesInvoices`
  ADD CONSTRAINT `SalesInvoices_ibfk_1` FOREIGN KEY (`idCustomer`) REFERENCES `Customers` (`idCustomer`) ON DELETE CASCADE,
  ADD CONSTRAINT `SalesInvoices_ibfk_2` FOREIGN KEY (`idEmployee`) REFERENCES `Employees` (`idEmployee`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
