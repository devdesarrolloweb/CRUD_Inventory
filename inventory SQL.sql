-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-08-2024 a las 19:36:02
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inventory`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL,
  `provider_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `provider_id`, `created_at`, `updated_at`) VALUES
(26, 'Apple iPhone 15 Pro', 1199.00, ' Latest model of Apple\'s flagship smartphone, featuring a high-resolution display, advanced camera system, and powerful A17', 16, '2024-08-08 17:30:46', '2024-08-08 17:33:14'),
(27, 'Samsung Galaxy S24 Ultra', 1399.00, 'High-end Android smartphone with a large AMOLED display, versatile camera setup, and powerful performance.', 17, '2024-08-08 17:31:42', '2024-08-08 17:31:42'),
(28, 'Sony WH-1000XM5', 399.00, ' Noise-cancelling over-ear headphones with exceptional sound quality, long battery life, and comfort.', 18, '2024-08-08 17:32:02', '2024-08-08 17:32:02'),
(29, 'Nike Air Max 270', 150.00, 'Popular athletic shoe featuring a large Air Max cushioning unit for comfort and a modern design.', 19, '2024-08-08 17:33:46', '2024-08-08 17:33:46');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `providers`
--

CREATE TABLE `providers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `providers`
--

INSERT INTO `providers` (`id`, `name`, `address`, `phone`, `description`, `created_at`, `updated_at`) VALUES
(16, 'Apple Inc.', '1 Infinite Loop, Cupertino, CA 95014, USA', '+1 408-996-1010', 'Known for its iPhones, iPads, MacBooks, and other electronic devices.', '2024-08-08 17:27:57', '2024-08-08 17:27:57'),
(17, 'Samsung Electronics', '129 Samsung-ro, Yeongtong-gu, Suwon-si, Gyeonggi-do, South Korea', '+82 2-2255-0114', ' Famous for smartphones, televisions, and home appliances.', '2024-08-08 17:28:34', '2024-08-08 17:28:34'),
(18, 'Sony Corporation', '1-7-1 Konan, Minato-ku, Tokyo 108-0075, Japan', ' +81 3-6748-2111', 'Known for its gaming consoles, cameras, and televisions.', '2024-08-08 17:29:05', '2024-08-08 17:29:05'),
(19, 'Nike, Inc.', 'One Bowerman Drive, Beaverton, OR 97005, USA', '+1 503-671-6453', 'Known for sportswear, athletic shoes, and equipment.', '2024-08-08 17:29:30', '2024-08-08 17:29:30');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `provider_id` (`provider_id`);

--
-- Indices de la tabla `providers`
--
ALTER TABLE `providers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `providers`
--
ALTER TABLE `providers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`provider_id`) REFERENCES `providers` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
