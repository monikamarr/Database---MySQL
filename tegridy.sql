-- phpMyAdmin SQL Dump
-- version 5.2.1-1.el7.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 21, 2023 at 08:11 PM
-- Server version: 10.6.12-MariaDB-log
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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

CREATE TABLE `Customers` (
  `idCustomer` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Customers`
--

INSERT INTO `Customers` (`idCustomer`, `firstName`, `lastName`, `address`) VALUES
(1, 'Luanne', 'Platter', '2125 Prop St., Arlen, TX 77002'),
(2, 'Dale', 'Gribble', '589 Ane Rd., Arlen, TX 77002'),
(3, 'Yogi', 'Victor', '4721 Ulica St., Arlen, TX 77002'),
(4, 'John', 'Redcorn', '568 Costam Cir., Arlen, TX 77002'),
(5, 'Jenny', 'Medina', '9868 Mike Judge Ln. Arlen, TX 77002');

-- --------------------------------------------------------

--
-- Table structure for table `Employees`
--

CREATE TABLE `Employees` (
  `idEmployee` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phoneNumber` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Employees`
--

INSERT INTO `Employees` (`idEmployee`, `firstName`, `lastName`, `email`, `phoneNumber`) VALUES
(1, 'Hank', 'Hill', 'hank.hill.email@com', '5109995000'),
(2, 'Maria', 'Montalvo', 'maria.monta@emailsoski.com', '4155989658'),
(3, 'Buck', 'Strickland', 'buck.strickland@stricklandpropane.com', '9193041960'),
(4, 'Debbie', 'Grund', 'dgrund@stricklandpropane.com', '8288675309'),
(5, 'Joe', 'Jack', 'joejack@stricklandpropane.com', '7779874562');

-- --------------------------------------------------------

--
-- Table structure for table `Products`
--

CREATE TABLE `Products` (
  `idProduct` int(11) NOT NULL,
  `productName` varchar(50) NOT NULL,
  `wholesalePrice` decimal(19,2) NOT NULL,
  `retailPrice` decimal(19,2) NOT NULL,
  `idVendor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Products`
--

INSERT INTO `Products` (`idProduct`, `productName`, `wholesalePrice`, `retailPrice`, `idVendor`) VALUES
(1, 'Liquid Propane', 99.99, 149.99, 4),
(2, 'Grill', 119.99, 169.99, 2),
(3, 'Propane Tank', 109.99, 159.99, 1),
(4, 'Valve', 59.99, 119.99, 3),
(5, 'Hose', 27.99, 69.99, 2),
(6, 'Adapter', 25.99, 59.99, 5);

-- --------------------------------------------------------

--
-- Table structure for table `ProductSales`
--

CREATE TABLE `ProductSales` (
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

CREATE TABLE `SalesInvoices` (
  `idSalesInvoice` int(11) NOT NULL,
  `orderQuantity` int(11) NOT NULL,
  `productPrice` decimal(19,2) NOT NULL,
  `salesDate` date NOT NULL,
  `idCustomer` int(11) NOT NULL,
  `idEmployee` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `SalesInvoices`
--

INSERT INTO `SalesInvoices` (`idSalesInvoice`, `orderQuantity`, `productPrice`, `salesDate`, `idCustomer`, `idEmployee`) VALUES
(1, 3, 2.00, '1874-01-02', 1, 1),
(2, 5, 4.00, '1874-01-03', 1, 1),
(3, 4, 5.00, '1874-01-04', 2, 2),
(4, 3, 6.00, '1874-01-07', 3, 1),
(5, 2, 3.00, '1874-01-07', 4, 2),
(6, 5, 1.00, '1874-01-15', 4, 2),
(7, 1, 4.00, '1874-01-21', 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Vendors`
--

CREATE TABLE `Vendors` (
  `idVendor` int(11) NOT NULL,
  `vendorName` varchar(50) NOT NULL,
  `vendorAddress` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `Vendors`
--

INSERT INTO `Vendors` (`idVendor`, `vendorName`, `vendorAddress`) VALUES
(1, 'Vogner', '666 Cold Ave., Ketchup City, OK 73019'),
(2, 'Char-King', '5678 Razorback Road, Hogsville, AR 72201'),
(3, 'BigPropane', '910 Bourbon St., Jambalaya Junction, LA 70116'),
(4, 'Norman S. Propane', '2468 Enchilada Blvd., Chili Pepper Springs, NM 87105'),
(5, 'GreenPropane', '1357 Sunflower St., Wheatlandia, KS 67202');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Customers`
--
ALTER TABLE `Customers`
  ADD PRIMARY KEY (`idCustomer`);

--
-- Indexes for table `Employees`
--
ALTER TABLE `Employees`
  ADD PRIMARY KEY (`idEmployee`);

--
-- Indexes for table `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`idProduct`),
  ADD KEY `idVendor` (`idVendor`);

--
-- Indexes for table `ProductSales`
--
ALTER TABLE `ProductSales`
  ADD PRIMARY KEY (`idProductSales`),
  ADD KEY `idSalesInvoice` (`idSalesInvoice`),
  ADD KEY `idProduct` (`idProduct`);

--
-- Indexes for table `SalesInvoices`
--
ALTER TABLE `SalesInvoices`
  ADD PRIMARY KEY (`idSalesInvoice`),
  ADD KEY `idCustomer` (`idCustomer`),
  ADD KEY `idEmployee` (`idEmployee`);

--
-- Indexes for table `Vendors`
--
ALTER TABLE `Vendors`
  ADD PRIMARY KEY (`idVendor`);

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
