/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: appointments
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `appointments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `date_and_time` datetime DEFAULT NULL,
  `notification` int(11) DEFAULT NULL,
  `complete` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: clients
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: findings
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `findings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `system_id` int(11) DEFAULT NULL,
  `system_pet_id` int(11) DEFAULT NULL,
  `system_client_id` int(11) DEFAULT NULL,
  `general_appearance` varchar(500) DEFAULT NULL,
  `teeth_mouth` varchar(500) DEFAULT NULL,
  `eyes` varchar(500) DEFAULT NULL,
  `ears` varchar(500) DEFAULT NULL,
  `skin_coat` varchar(500) DEFAULT NULL,
  `heart_lungs` varchar(500) DEFAULT NULL,
  `digestive` varchar(500) DEFAULT NULL,
  `musculoskeletal` varchar(500) DEFAULT NULL,
  `nervous` varchar(500) DEFAULT NULL,
  `lymph` varchar(500) DEFAULT NULL,
  `urogenitals` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: history
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pet_id` int(11) DEFAULT NULL,
  `pet_client_id` int(11) DEFAULT NULL,
  `complaint` varchar(500) DEFAULT NULL,
  `current_med` varchar(500) DEFAULT NULL,
  `physical_exam` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: laboratory
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `laboratory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `system_id` int(11) DEFAULT NULL,
  `system_pet_id` int(11) DEFAULT NULL,
  `system_pet_client_id` int(11) DEFAULT NULL,
  `heartworm` varchar(255) DEFAULT NULL,
  `skin_scrape` varchar(255) DEFAULT NULL,
  `ear_mites` varchar(255) DEFAULT NULL,
  `cdv` varchar(255) DEFAULT NULL,
  `cpv` varchar(255) DEFAULT NULL,
  `fiv` varchar(255) DEFAULT NULL,
  `vaginal_smear` varchar(500) DEFAULT NULL,
  `urinalysis` varchar(500) DEFAULT NULL,
  `fecalysis` varchar(500) DEFAULT NULL,
  `xray` varchar(500) DEFAULT NULL,
  `differential` varchar(500) DEFAULT NULL,
  `definitive` varchar(500) DEFAULT NULL,
  `treatment` varchar(500) DEFAULT NULL,
  `comments` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: pets
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `pets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `species` varchar(255) DEFAULT NULL,
  `breed` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `altered` varchar(45) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `birthdate` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: systems
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `systems` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pet_id` int(11) DEFAULT NULL,
  `pet_client_id` int(11) DEFAULT NULL,
  `exam_vet` varchar(255) DEFAULT NULL,
  `general_appearance` varchar(45) DEFAULT NULL,
  `teeth_mouth` varchar(45) DEFAULT NULL,
  `eyes` varchar(45) DEFAULT NULL,
  `ears` varchar(45) DEFAULT NULL,
  `skin_coat` varchar(45) DEFAULT NULL,
  `heart_lungs` varchar(45) DEFAULT NULL,
  `digestive` varchar(45) DEFAULT NULL,
  `musculoskeletal` varchar(45) DEFAULT NULL,
  `nervous` varchar(45) DEFAULT NULL,
  `lymph` varchar(45) DEFAULT NULL,
  `urogenitals` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: users
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `user_level` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: vitalsigns
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `vitalsigns` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pet_id` int(11) DEFAULT NULL,
  `pet_client_id` int(11) DEFAULT NULL,
  `weight` varchar(45) DEFAULT NULL,
  `temp` varchar(45) DEFAULT NULL,
  `respiratory_rate` varchar(45) DEFAULT NULL,
  `heart_rate` varchar(45) DEFAULT NULL,
  `crt` varchar(45) DEFAULT NULL,
  `mm` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: appointments
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: clients
# ------------------------------------------------------------

INSERT INTO
  `clients` (
    `id`,
    `first_name`,
    `last_name`,
    `email`,
    `address`,
    `contact`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    'Cj',
    'Cj',
    'supancj18@gmail.com',
    'cj',
    '09352909072',
    '2021-09-07 18:45:50',
    '2021-09-07 18:45:50'
  );
INSERT INTO
  `clients` (
    `id`,
    `first_name`,
    `last_name`,
    `email`,
    `address`,
    `contact`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    2,
    'Manero',
    'Manero',
    'supancj18@gmail.com',
    'manero',
    '09352909072',
    '2021-09-07 18:46:03',
    '2021-09-07 18:46:03'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: findings
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: history
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: laboratory
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: pets
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: systems
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: users
# ------------------------------------------------------------

INSERT INTO
  `users` (
    `id`,
    `username`,
    `password`,
    `first_name`,
    `last_name`,
    `user_level`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    3,
    'admin',
    'admin',
    'admin',
    'admin',
    'Admin',
    NULL,
    NULL
  );
INSERT INTO
  `users` (
    `id`,
    `username`,
    `password`,
    `first_name`,
    `last_name`,
    `user_level`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    8,
    'admin2',
    'admin2',
    'Cedrick John',
    'Supan',
    'Admin',
    '2021-09-08 11:54:39',
    '2021-09-08 11:54:39'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: vitalsigns
# ------------------------------------------------------------


/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
