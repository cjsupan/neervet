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
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4;

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
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: findings
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `findings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `system_id` int(11) DEFAULT NULL,
  `system_pet_id` int(11) DEFAULT NULL,
  `system_pet_client_id` int(11) DEFAULT NULL,
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
) ENGINE = InnoDB AUTO_INCREMENT = 13 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: history
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `system_id` int(11) DEFAULT NULL,
  `system_pet_id` int(11) DEFAULT NULL,
  `system_pet_client_id` int(11) DEFAULT NULL,
  `complaint` varchar(500) DEFAULT NULL,
  `current_med` varchar(500) DEFAULT NULL,
  `physical_exam` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 13 DEFAULT CHARSET = utf8mb4;

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
  `diagnosis_procedure` varchar(1000) DEFAULT NULL,
  `differential` varchar(500) DEFAULT NULL,
  `definitive` varchar(1000) DEFAULT NULL,
  `treatment` varchar(1000) DEFAULT NULL,
  `prescribed_med` varchar(1000) DEFAULT NULL,
  `comments` varchar(500) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 13 DEFAULT CHARSET = utf8mb4;

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
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb4;

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
) ENGINE = InnoDB AUTO_INCREMENT = 13 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: users
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `user_level` varchar(45) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 17 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: vitalsigns
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `vitalsigns` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `system_id` int(11) DEFAULT NULL,
  `system_pet_id` int(11) DEFAULT NULL,
  `system_pet_client_id` int(11) DEFAULT NULL,
  `weight` varchar(45) DEFAULT NULL,
  `temp` varchar(45) DEFAULT NULL,
  `respiratory_rate` varchar(45) DEFAULT NULL,
  `heart_rate` varchar(45) DEFAULT NULL,
  `crt` varchar(45) DEFAULT NULL,
  `mm` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 13 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: appointments
# ------------------------------------------------------------

INSERT INTO
  `appointments` (
    `id`,
    `client_id`,
    `title`,
    `date_and_time`,
    `notification`,
    `complete`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    4,
    'Vaccination',
    '2021-10-26 18:41:00',
    0,
    1,
    '2021-10-27 23:43:44',
    '2021-10-26 18:41:32'
  );
INSERT INTO
  `appointments` (
    `id`,
    `client_id`,
    `title`,
    `date_and_time`,
    `notification`,
    `complete`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    2,
    2,
    'Vaccination',
    '2021-11-12 20:30:00',
    0,
    1,
    '2021-09-23 11:58:39',
    '2021-11-12 20:30:31'
  );
INSERT INTO
  `appointments` (
    `id`,
    `client_id`,
    `title`,
    `date_and_time`,
    `notification`,
    `complete`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    3,
    4,
    'Vaccination',
    '2021-11-12 20:31:00',
    0,
    0,
    '2021-11-12 20:31:38',
    '2021-11-12 20:32:02'
  );

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
    'Cedrick john',
    'Supan',
    'supancj18@gmail.com',
    'pantar norte, balaoan la union',
    '09195452872',
    '2021-10-08 12:50:01',
    '2021-10-08 12:50:01'
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
    'Denver blaise',
    'Araboy',
    'denverblaise777@gmail.com',
    'san juan la union',
    '01234567890',
    '2021-10-08 12:50:34',
    '2021-10-08 12:50:34'
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
    3,
    'Adrian kenneth',
    'Fragante',
    'adrianfragante@gmail.com',
    'san fernando la union',
    '01234567890',
    '2021-10-08 12:51:19',
    '2021-10-08 12:51:19'
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
    4,
    'Adrian bryll',
    'hombrebueno',
    'adrianhombrebueno@gmail.com',
    'bauang la union',
    '01234567890',
    '2021-10-08 12:57:33',
    '2021-10-08 12:57:33'
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
    5,
    'Firstname',
    'Lastname',
    'email@gmail.com',
    'asdasd',
    '09352909072',
    '2021-11-12 21:34:25',
    '2021-11-12 21:34:25'
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
    6,
    'Thomas',
    'Austria ',
    'tomdeaustria@slc-sflu.edu.ph',
    'san fernando la union',
    '01231231123',
    '2021-11-13 10:31:27',
    '2021-11-13 10:31:27'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: findings
# ------------------------------------------------------------

INSERT INTO
  `findings` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `general_appearance`,
    `teeth_mouth`,
    `eyes`,
    `ears`,
    `skin_coat`,
    `heart_lungs`,
    `digestive`,
    `musculoskeletal`,
    `nervous`,
    `lymph`,
    `urogenitals`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    1,
    1,
    1,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '2021-10-08 00:00:00',
    '2021-10-08 13:21:48'
  );
INSERT INTO
  `findings` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `general_appearance`,
    `teeth_mouth`,
    `eyes`,
    `ears`,
    `skin_coat`,
    `heart_lungs`,
    `digestive`,
    `musculoskeletal`,
    `nervous`,
    `lymph`,
    `urogenitals`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    2,
    2,
    2,
    1,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '2018-01-08 00:00:00',
    '2021-10-08 13:23:07'
  );
INSERT INTO
  `findings` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `general_appearance`,
    `teeth_mouth`,
    `eyes`,
    `ears`,
    `skin_coat`,
    `heart_lungs`,
    `digestive`,
    `musculoskeletal`,
    `nervous`,
    `lymph`,
    `urogenitals`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    3,
    3,
    3,
    1,
    'something here',
    '',
    '',
    'something here',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '2020-02-08 00:00:00',
    '2021-10-08 13:45:27'
  );
INSERT INTO
  `findings` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `general_appearance`,
    `teeth_mouth`,
    `eyes`,
    `ears`,
    `skin_coat`,
    `heart_lungs`,
    `digestive`,
    `musculoskeletal`,
    `nervous`,
    `lymph`,
    `urogenitals`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    4,
    4,
    4,
    1,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '2021-10-03 00:00:00',
    '2021-10-08 13:47:09'
  );
INSERT INTO
  `findings` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `general_appearance`,
    `teeth_mouth`,
    `eyes`,
    `ears`,
    `skin_coat`,
    `heart_lungs`,
    `digestive`,
    `musculoskeletal`,
    `nervous`,
    `lymph`,
    `urogenitals`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    6,
    6,
    6,
    4,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '2021-10-08 00:00:00',
    '2021-10-08 15:41:13'
  );
INSERT INTO
  `findings` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `general_appearance`,
    `teeth_mouth`,
    `eyes`,
    `ears`,
    `skin_coat`,
    `heart_lungs`,
    `digestive`,
    `musculoskeletal`,
    `nervous`,
    `lymph`,
    `urogenitals`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    7,
    7,
    7,
    4,
    '',
    '',
    'something here',
    '',
    'something here',
    '',
    '',
    '',
    '',
    '',
    '',
    '2021-10-08 00:00:00',
    '2021-10-08 15:44:48'
  );
INSERT INTO
  `findings` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `general_appearance`,
    `teeth_mouth`,
    `eyes`,
    `ears`,
    `skin_coat`,
    `heart_lungs`,
    `digestive`,
    `musculoskeletal`,
    `nervous`,
    `lymph`,
    `urogenitals`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    8,
    8,
    8,
    4,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '2021-10-08 00:00:00',
    '2021-10-08 18:09:46'
  );
INSERT INTO
  `findings` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `general_appearance`,
    `teeth_mouth`,
    `eyes`,
    `ears`,
    `skin_coat`,
    `heart_lungs`,
    `digestive`,
    `musculoskeletal`,
    `nervous`,
    `lymph`,
    `urogenitals`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    9,
    9,
    9,
    4,
    'something here',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '2021-10-06 00:00:00',
    '2021-10-08 18:31:33'
  );
INSERT INTO
  `findings` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `general_appearance`,
    `teeth_mouth`,
    `eyes`,
    `ears`,
    `skin_coat`,
    `heart_lungs`,
    `digestive`,
    `musculoskeletal`,
    `nervous`,
    `lymph`,
    `urogenitals`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    10,
    10,
    10,
    3,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '2021-11-12 00:00:00',
    '2021-11-12 21:38:12'
  );
INSERT INTO
  `findings` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `general_appearance`,
    `teeth_mouth`,
    `eyes`,
    `ears`,
    `skin_coat`,
    `heart_lungs`,
    `digestive`,
    `musculoskeletal`,
    `nervous`,
    `lymph`,
    `urogenitals`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    11,
    11,
    11,
    6,
    'something',
    'something',
    'something',
    'something',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '2021-11-13 00:00:00',
    '2021-11-13 10:34:27'
  );
INSERT INTO
  `findings` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `general_appearance`,
    `teeth_mouth`,
    `eyes`,
    `ears`,
    `skin_coat`,
    `heart_lungs`,
    `digestive`,
    `musculoskeletal`,
    `nervous`,
    `lymph`,
    `urogenitals`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    12,
    12,
    11,
    6,
    'n/a',
    '',
    '',
    '',
    '',
    'n/a',
    '',
    '',
    '',
    '',
    '',
    '2021-11-13 10:44:00',
    '2021-11-13 10:45:51'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: history
# ------------------------------------------------------------

INSERT INTO
  `history` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `complaint`,
    `current_med`,
    `physical_exam`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    1,
    1,
    1,
    'something here',
    'something here',
    'something here',
    '2021-10-08 00:00:00',
    '2021-10-08 13:21:48'
  );
INSERT INTO
  `history` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `complaint`,
    `current_med`,
    `physical_exam`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    2,
    2,
    2,
    1,
    'something here',
    'something here',
    'something here',
    '2018-01-08 00:00:00',
    '2021-10-08 13:23:07'
  );
INSERT INTO
  `history` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `complaint`,
    `current_med`,
    `physical_exam`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    3,
    3,
    3,
    1,
    'something here',
    'something here',
    'something here',
    '2020-02-08 00:00:00',
    '2021-10-08 13:45:27'
  );
INSERT INTO
  `history` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `complaint`,
    `current_med`,
    `physical_exam`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    4,
    4,
    4,
    1,
    'something here',
    'something here',
    'something here',
    '2021-10-03 00:00:00',
    '2021-10-08 13:47:09'
  );
INSERT INTO
  `history` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `complaint`,
    `current_med`,
    `physical_exam`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    6,
    6,
    6,
    4,
    'something here',
    'something here',
    'something here',
    '2021-10-08 00:00:00',
    '2021-10-08 15:41:13'
  );
INSERT INTO
  `history` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `complaint`,
    `current_med`,
    `physical_exam`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    7,
    7,
    7,
    4,
    'something here',
    'something here',
    'something here',
    '2021-10-08 00:00:00',
    '2021-10-08 15:44:48'
  );
INSERT INTO
  `history` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `complaint`,
    `current_med`,
    `physical_exam`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    8,
    8,
    8,
    4,
    'something here',
    'something here',
    'something here',
    '2021-10-08 00:00:00',
    '2021-10-08 18:09:46'
  );
INSERT INTO
  `history` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `complaint`,
    `current_med`,
    `physical_exam`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    9,
    9,
    9,
    4,
    'something here',
    'something here',
    'something here',
    '2021-10-06 00:00:00',
    '2021-10-08 18:31:33'
  );
INSERT INTO
  `history` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `complaint`,
    `current_med`,
    `physical_exam`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    10,
    10,
    10,
    3,
    'something',
    'something',
    'something',
    '2021-11-12 00:00:00',
    '2021-11-12 21:38:12'
  );
INSERT INTO
  `history` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `complaint`,
    `current_med`,
    `physical_exam`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    11,
    11,
    11,
    6,
    'something',
    'something',
    'something',
    '2021-11-13 00:00:00',
    '2021-11-13 10:34:27'
  );
INSERT INTO
  `history` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `complaint`,
    `current_med`,
    `physical_exam`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    12,
    12,
    11,
    6,
    'fever',
    'n/a',
    'n/a',
    '2021-11-13 10:44:00',
    '2021-11-13 10:45:51'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: laboratory
# ------------------------------------------------------------

INSERT INTO
  `laboratory` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `heartworm`,
    `skin_scrape`,
    `ear_mites`,
    `cdv`,
    `cpv`,
    `fiv`,
    `vaginal_smear`,
    `urinalysis`,
    `fecalysis`,
    `xray`,
    `diagnosis_procedure`,
    `differential`,
    `definitive`,
    `treatment`,
    `prescribed_med`,
    `comments`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    1,
    1,
    1,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    NULL,
    '',
    '',
    '',
    NULL,
    '',
    '2021-10-08 13:21:48',
    '2021-10-08 13:21:48'
  );
INSERT INTO
  `laboratory` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `heartworm`,
    `skin_scrape`,
    `ear_mites`,
    `cdv`,
    `cpv`,
    `fiv`,
    `vaginal_smear`,
    `urinalysis`,
    `fecalysis`,
    `xray`,
    `diagnosis_procedure`,
    `differential`,
    `definitive`,
    `treatment`,
    `prescribed_med`,
    `comments`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    2,
    2,
    2,
    1,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    NULL,
    '',
    '',
    '',
    NULL,
    '',
    '2021-10-08 13:23:07',
    '2021-10-08 13:23:07'
  );
INSERT INTO
  `laboratory` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `heartworm`,
    `skin_scrape`,
    `ear_mites`,
    `cdv`,
    `cpv`,
    `fiv`,
    `vaginal_smear`,
    `urinalysis`,
    `fecalysis`,
    `xray`,
    `diagnosis_procedure`,
    `differential`,
    `definitive`,
    `treatment`,
    `prescribed_med`,
    `comments`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    3,
    3,
    3,
    1,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    NULL,
    '',
    '',
    '',
    NULL,
    '',
    '2021-10-08 13:45:27',
    '2021-10-08 13:45:27'
  );
INSERT INTO
  `laboratory` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `heartworm`,
    `skin_scrape`,
    `ear_mites`,
    `cdv`,
    `cpv`,
    `fiv`,
    `vaginal_smear`,
    `urinalysis`,
    `fecalysis`,
    `xray`,
    `diagnosis_procedure`,
    `differential`,
    `definitive`,
    `treatment`,
    `prescribed_med`,
    `comments`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    4,
    4,
    4,
    1,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    NULL,
    '',
    '',
    '',
    NULL,
    '',
    '2021-10-08 13:47:09',
    '2021-10-08 13:47:09'
  );
INSERT INTO
  `laboratory` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `heartworm`,
    `skin_scrape`,
    `ear_mites`,
    `cdv`,
    `cpv`,
    `fiv`,
    `vaginal_smear`,
    `urinalysis`,
    `fecalysis`,
    `xray`,
    `diagnosis_procedure`,
    `differential`,
    `definitive`,
    `treatment`,
    `prescribed_med`,
    `comments`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    6,
    6,
    6,
    4,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    NULL,
    '',
    '',
    '',
    NULL,
    '',
    '2021-10-08 15:41:13',
    '2021-10-08 15:41:13'
  );
INSERT INTO
  `laboratory` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `heartworm`,
    `skin_scrape`,
    `ear_mites`,
    `cdv`,
    `cpv`,
    `fiv`,
    `vaginal_smear`,
    `urinalysis`,
    `fecalysis`,
    `xray`,
    `diagnosis_procedure`,
    `differential`,
    `definitive`,
    `treatment`,
    `prescribed_med`,
    `comments`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    7,
    7,
    7,
    4,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    NULL,
    '',
    '',
    '',
    NULL,
    '',
    '2021-10-08 15:44:48',
    '2021-10-08 15:44:48'
  );
INSERT INTO
  `laboratory` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `heartworm`,
    `skin_scrape`,
    `ear_mites`,
    `cdv`,
    `cpv`,
    `fiv`,
    `vaginal_smear`,
    `urinalysis`,
    `fecalysis`,
    `xray`,
    `diagnosis_procedure`,
    `differential`,
    `definitive`,
    `treatment`,
    `prescribed_med`,
    `comments`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    8,
    8,
    8,
    4,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    NULL,
    '',
    '',
    '',
    NULL,
    '',
    '2021-10-08 18:09:46',
    '2021-10-08 18:09:46'
  );
INSERT INTO
  `laboratory` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `heartworm`,
    `skin_scrape`,
    `ear_mites`,
    `cdv`,
    `cpv`,
    `fiv`,
    `vaginal_smear`,
    `urinalysis`,
    `fecalysis`,
    `xray`,
    `diagnosis_procedure`,
    `differential`,
    `definitive`,
    `treatment`,
    `prescribed_med`,
    `comments`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    9,
    9,
    9,
    4,
    'Positive',
    'sarcoptes',
    'Positive',
    'Negative',
    'Negative',
    'Positive',
    'Ready',
    'Positive',
    'Hookworm',
    'something here',
    'something here',
    'something here',
    'something here',
    'something here',
    'something here',
    'something here',
    '2021-10-08 18:31:33',
    '2021-10-08 18:31:33'
  );
INSERT INTO
  `laboratory` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `heartworm`,
    `skin_scrape`,
    `ear_mites`,
    `cdv`,
    `cpv`,
    `fiv`,
    `vaginal_smear`,
    `urinalysis`,
    `fecalysis`,
    `xray`,
    `diagnosis_procedure`,
    `differential`,
    `definitive`,
    `treatment`,
    `prescribed_med`,
    `comments`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    10,
    10,
    10,
    3,
    'Negative',
    'Negative',
    'Negative',
    'Negative',
    'Negative',
    'Negative',
    'Not Ready',
    'Negative',
    'Negative',
    'something',
    'something',
    'something',
    'something',
    'something',
    'something',
    'something',
    '2021-11-12 21:38:12',
    '2021-11-12 21:38:12'
  );
INSERT INTO
  `laboratory` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `heartworm`,
    `skin_scrape`,
    `ear_mites`,
    `cdv`,
    `cpv`,
    `fiv`,
    `vaginal_smear`,
    `urinalysis`,
    `fecalysis`,
    `xray`,
    `diagnosis_procedure`,
    `differential`,
    `definitive`,
    `treatment`,
    `prescribed_med`,
    `comments`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    11,
    11,
    11,
    6,
    'Positive',
    'Negative',
    'Positive',
    'Negative',
    'Negative',
    'Negative',
    'Ready',
    'Negative',
    'Negative',
    'something',
    'something',
    'something here',
    'something',
    'something',
    'something',
    'something',
    '2021-11-13 10:34:27',
    '2021-11-13 10:34:27'
  );
INSERT INTO
  `laboratory` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `heartworm`,
    `skin_scrape`,
    `ear_mites`,
    `cdv`,
    `cpv`,
    `fiv`,
    `vaginal_smear`,
    `urinalysis`,
    `fecalysis`,
    `xray`,
    `diagnosis_procedure`,
    `differential`,
    `definitive`,
    `treatment`,
    `prescribed_med`,
    `comments`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    12,
    12,
    11,
    6,
    'Negative',
    'Negative',
    'Negative',
    'Negative',
    'Negative',
    'Negative',
    'Not Ready',
    'Negative',
    'Negative',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '2021-11-13 10:45:51',
    '2021-11-13 10:45:51'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: pets
# ------------------------------------------------------------

INSERT INTO
  `pets` (
    `id`,
    `client_id`,
    `name`,
    `species`,
    `breed`,
    `sex`,
    `altered`,
    `color`,
    `birthdate`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    1,
    'Kali',
    'canine',
    'aspin',
    'Male',
    'No',
    'Brown',
    '2017-01-08 00:00:00',
    '2021-10-08 00:00:00',
    '2021-10-08 13:21:48'
  );
INSERT INTO
  `pets` (
    `id`,
    `client_id`,
    `name`,
    `species`,
    `breed`,
    `sex`,
    `altered`,
    `color`,
    `birthdate`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    2,
    1,
    'Cupper',
    'feline',
    'bengal',
    'Male',
    'No',
    'Black',
    '2018-02-08 00:00:00',
    '2018-01-08 00:00:00',
    '2021-10-08 13:23:07'
  );
INSERT INTO
  `pets` (
    `id`,
    `client_id`,
    `name`,
    `species`,
    `breed`,
    `sex`,
    `altered`,
    `color`,
    `birthdate`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    3,
    1,
    'Adonis',
    'canine',
    'shit tzu',
    'Female',
    'No',
    'White',
    '2021-10-06 00:00:00',
    '2020-02-08 00:00:00',
    '2021-10-08 13:45:27'
  );
INSERT INTO
  `pets` (
    `id`,
    `client_id`,
    `name`,
    `species`,
    `breed`,
    `sex`,
    `altered`,
    `color`,
    `birthdate`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    4,
    1,
    'Aloha',
    'canine',
    'poodle',
    'Female',
    'No',
    'Brown',
    '2020-03-08 00:00:00',
    '2021-10-03 00:00:00',
    '2021-10-08 13:47:09'
  );
INSERT INTO
  `pets` (
    `id`,
    `client_id`,
    `name`,
    `species`,
    `breed`,
    `sex`,
    `altered`,
    `color`,
    `birthdate`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    6,
    4,
    'Bach',
    'canine',
    'german shepered',
    'Male',
    'No',
    'Black',
    '2016-02-08 00:00:00',
    '2021-10-08 00:00:00',
    '2021-10-08 15:41:13'
  );
INSERT INTO
  `pets` (
    `id`,
    `client_id`,
    `name`,
    `species`,
    `breed`,
    `sex`,
    `altered`,
    `color`,
    `birthdate`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    7,
    4,
    'Audi',
    'canine',
    'labrador',
    'Male',
    'No',
    'Brown',
    '2020-03-08 00:00:00',
    '2021-10-08 00:00:00',
    '2021-10-08 15:44:48'
  );
INSERT INTO
  `pets` (
    `id`,
    `client_id`,
    `name`,
    `species`,
    `breed`,
    `sex`,
    `altered`,
    `color`,
    `birthdate`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    8,
    4,
    'Bach',
    'canine',
    'rottweiler',
    'Male',
    'No',
    'Black',
    '2018-03-02 00:00:00',
    '2021-10-08 00:00:00',
    '2021-10-08 18:09:46'
  );
INSERT INTO
  `pets` (
    `id`,
    `client_id`,
    `name`,
    `species`,
    `breed`,
    `sex`,
    `altered`,
    `color`,
    `birthdate`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    9,
    4,
    'Blitz',
    'canine',
    'husky',
    'Male',
    'Yes',
    'Black and white',
    '2014-06-08 00:00:00',
    '2021-10-06 00:00:00',
    '2021-10-08 18:31:33'
  );
INSERT INTO
  `pets` (
    `id`,
    `client_id`,
    `name`,
    `species`,
    `breed`,
    `sex`,
    `altered`,
    `color`,
    `birthdate`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    10,
    3,
    'Athena',
    'canine',
    'aspin',
    'Male',
    'No',
    'Brown',
    '2021-09-12 00:00:00',
    '2021-11-12 00:00:00',
    '2021-11-12 21:38:12'
  );
INSERT INTO
  `pets` (
    `id`,
    `client_id`,
    `name`,
    `species`,
    `breed`,
    `sex`,
    `altered`,
    `color`,
    `birthdate`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    11,
    6,
    'Kali',
    'canine',
    'aspin',
    'Male',
    'No',
    'Brown',
    '2018-02-13 00:00:00',
    '2021-11-13 00:00:00',
    '2021-11-13 10:34:27'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: systems
# ------------------------------------------------------------

INSERT INTO
  `systems` (
    `id`,
    `pet_id`,
    `pet_client_id`,
    `exam_vet`,
    `general_appearance`,
    `teeth_mouth`,
    `eyes`,
    `ears`,
    `skin_coat`,
    `heart_lungs`,
    `digestive`,
    `musculoskeletal`,
    `nervous`,
    `lymph`,
    `urogenitals`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    1,
    1,
    'Ken oliver',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    '2021-10-08 00:00:00',
    '2021-10-08 13:21:48'
  );
INSERT INTO
  `systems` (
    `id`,
    `pet_id`,
    `pet_client_id`,
    `exam_vet`,
    `general_appearance`,
    `teeth_mouth`,
    `eyes`,
    `ears`,
    `skin_coat`,
    `heart_lungs`,
    `digestive`,
    `musculoskeletal`,
    `nervous`,
    `lymph`,
    `urogenitals`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    2,
    2,
    1,
    'Ken oliver',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    '2018-01-08 00:00:00',
    '2021-10-08 13:23:07'
  );
INSERT INTO
  `systems` (
    `id`,
    `pet_id`,
    `pet_client_id`,
    `exam_vet`,
    `general_appearance`,
    `teeth_mouth`,
    `eyes`,
    `ears`,
    `skin_coat`,
    `heart_lungs`,
    `digestive`,
    `musculoskeletal`,
    `nervous`,
    `lymph`,
    `urogenitals`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    3,
    3,
    1,
    'Ken oliver',
    'Abnormal',
    'Normal',
    'Normal',
    'Abnormal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    '2020-02-08 00:00:00',
    '2021-10-08 13:45:27'
  );
INSERT INTO
  `systems` (
    `id`,
    `pet_id`,
    `pet_client_id`,
    `exam_vet`,
    `general_appearance`,
    `teeth_mouth`,
    `eyes`,
    `ears`,
    `skin_coat`,
    `heart_lungs`,
    `digestive`,
    `musculoskeletal`,
    `nervous`,
    `lymph`,
    `urogenitals`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    4,
    4,
    1,
    'Ken oliver',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    '2021-10-03 00:00:00',
    '2021-10-08 13:47:09'
  );
INSERT INTO
  `systems` (
    `id`,
    `pet_id`,
    `pet_client_id`,
    `exam_vet`,
    `general_appearance`,
    `teeth_mouth`,
    `eyes`,
    `ears`,
    `skin_coat`,
    `heart_lungs`,
    `digestive`,
    `musculoskeletal`,
    `nervous`,
    `lymph`,
    `urogenitals`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    6,
    6,
    4,
    'Ken oliver',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    '2021-10-08 00:00:00',
    '2021-10-08 15:41:13'
  );
INSERT INTO
  `systems` (
    `id`,
    `pet_id`,
    `pet_client_id`,
    `exam_vet`,
    `general_appearance`,
    `teeth_mouth`,
    `eyes`,
    `ears`,
    `skin_coat`,
    `heart_lungs`,
    `digestive`,
    `musculoskeletal`,
    `nervous`,
    `lymph`,
    `urogenitals`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    7,
    7,
    4,
    'Ken oliver',
    'Normal',
    'Normal',
    'Abnormal',
    'Normal',
    'Abnormal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    '2021-10-08 00:00:00',
    '2021-10-08 15:44:48'
  );
INSERT INTO
  `systems` (
    `id`,
    `pet_id`,
    `pet_client_id`,
    `exam_vet`,
    `general_appearance`,
    `teeth_mouth`,
    `eyes`,
    `ears`,
    `skin_coat`,
    `heart_lungs`,
    `digestive`,
    `musculoskeletal`,
    `nervous`,
    `lymph`,
    `urogenitals`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    8,
    8,
    4,
    'Ken oliver',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    '2021-10-08 00:00:00',
    '2021-10-08 18:09:46'
  );
INSERT INTO
  `systems` (
    `id`,
    `pet_id`,
    `pet_client_id`,
    `exam_vet`,
    `general_appearance`,
    `teeth_mouth`,
    `eyes`,
    `ears`,
    `skin_coat`,
    `heart_lungs`,
    `digestive`,
    `musculoskeletal`,
    `nervous`,
    `lymph`,
    `urogenitals`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    9,
    9,
    4,
    'Ken oliver',
    'Abnormal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    '2021-10-27 02:24:00',
    '2021-10-27 02:24:53'
  );
INSERT INTO
  `systems` (
    `id`,
    `pet_id`,
    `pet_client_id`,
    `exam_vet`,
    `general_appearance`,
    `teeth_mouth`,
    `eyes`,
    `ears`,
    `skin_coat`,
    `heart_lungs`,
    `digestive`,
    `musculoskeletal`,
    `nervous`,
    `lymph`,
    `urogenitals`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    10,
    10,
    3,
    'Ken oliver',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    '2021-11-12 21:58:00',
    '2021-11-12 21:58:56'
  );
INSERT INTO
  `systems` (
    `id`,
    `pet_id`,
    `pet_client_id`,
    `exam_vet`,
    `general_appearance`,
    `teeth_mouth`,
    `eyes`,
    `ears`,
    `skin_coat`,
    `heart_lungs`,
    `digestive`,
    `musculoskeletal`,
    `nervous`,
    `lymph`,
    `urogenitals`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    11,
    11,
    6,
    'Ken oliver',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Abnormal',
    'Normal',
    'Normal',
    'Abnormal',
    'Normal',
    'Normal',
    '2021-11-13 10:40:00',
    '2021-11-13 10:41:09'
  );
INSERT INTO
  `systems` (
    `id`,
    `pet_id`,
    `pet_client_id`,
    `exam_vet`,
    `general_appearance`,
    `teeth_mouth`,
    `eyes`,
    `ears`,
    `skin_coat`,
    `heart_lungs`,
    `digestive`,
    `musculoskeletal`,
    `nervous`,
    `lymph`,
    `urogenitals`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    12,
    11,
    6,
    'Ken oliver',
    'Abnormal',
    'Abnormal',
    'Normal',
    'Normal',
    'Normal',
    'Abnormal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    'Normal',
    '2021-11-13 10:46:00',
    '2021-11-13 10:46:30'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: users
# ------------------------------------------------------------

INSERT INTO
  `users` (
    `id`,
    `first_name`,
    `last_name`,
    `user_level`,
    `username`,
    `password`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    'Admin',
    'Admin',
    'Admin',
    'admin',
    'admin',
    NULL,
    '2021-10-08 19:22:45'
  );
INSERT INTO
  `users` (
    `id`,
    `first_name`,
    `last_name`,
    `user_level`,
    `username`,
    `password`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    2,
    'Marie ann',
    'Fontanilla',
    'Admin',
    'maan',
    'maan',
    '2021-09-21 14:15:23',
    '2021-09-21 14:15:23'
  );
INSERT INTO
  `users` (
    `id`,
    `first_name`,
    `last_name`,
    `user_level`,
    `username`,
    `password`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    10,
    'Staff',
    'Staff',
    'Staff',
    'staff',
    'staff',
    '2021-10-27 22:16:37',
    '2021-11-13 08:42:35'
  );
INSERT INTO
  `users` (
    `id`,
    `first_name`,
    `last_name`,
    `user_level`,
    `username`,
    `password`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    11,
    'Cedrick',
    'Cjsupan',
    'Staff',
    'cjsupan',
    'cjsupan',
    '2021-10-27 23:56:15',
    '2021-11-13 08:32:13'
  );
INSERT INTO
  `users` (
    `id`,
    `first_name`,
    `last_name`,
    `user_level`,
    `username`,
    `password`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    12,
    'Cedrick John',
    'Supan',
    'Admin',
    'asdasd',
    'asdasd',
    '2021-11-13 08:14:07',
    '2021-11-13 08:14:07'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: vitalsigns
# ------------------------------------------------------------

INSERT INTO
  `vitalsigns` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `weight`,
    `temp`,
    `respiratory_rate`,
    `heart_rate`,
    `crt`,
    `mm`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    1,
    1,
    1,
    1,
    '15',
    '38.9',
    '12',
    '5',
    '12',
    'pale',
    '2021-10-08 00:00:00',
    '2021-10-08 13:21:48'
  );
INSERT INTO
  `vitalsigns` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `weight`,
    `temp`,
    `respiratory_rate`,
    `heart_rate`,
    `crt`,
    `mm`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    2,
    2,
    2,
    1,
    '3',
    '1',
    '5',
    '5',
    '4',
    'pale',
    '2018-01-08 00:00:00',
    '2021-10-08 13:23:07'
  );
INSERT INTO
  `vitalsigns` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `weight`,
    `temp`,
    `respiratory_rate`,
    `heart_rate`,
    `crt`,
    `mm`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    3,
    3,
    3,
    1,
    '15',
    '38.9',
    '12',
    '7',
    '12',
    'pale',
    '2020-02-08 00:00:00',
    '2021-10-08 13:45:27'
  );
INSERT INTO
  `vitalsigns` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `weight`,
    `temp`,
    `respiratory_rate`,
    `heart_rate`,
    `crt`,
    `mm`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    4,
    4,
    4,
    1,
    '1',
    '37.8',
    '5',
    '12',
    '4',
    'pale',
    '2021-10-03 00:00:00',
    '2021-10-08 13:47:09'
  );
INSERT INTO
  `vitalsigns` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `weight`,
    `temp`,
    `respiratory_rate`,
    `heart_rate`,
    `crt`,
    `mm`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    6,
    6,
    6,
    4,
    '15',
    '38.9',
    '12',
    '5',
    '12',
    'pale',
    '2021-10-08 00:00:00',
    '2021-10-08 15:41:13'
  );
INSERT INTO
  `vitalsigns` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `weight`,
    `temp`,
    `respiratory_rate`,
    `heart_rate`,
    `crt`,
    `mm`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    7,
    7,
    7,
    4,
    '15',
    '38.9',
    '12',
    '7',
    '12',
    'Not pale',
    '2021-10-08 00:00:00',
    '2021-10-08 15:44:48'
  );
INSERT INTO
  `vitalsigns` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `weight`,
    `temp`,
    `respiratory_rate`,
    `heart_rate`,
    `crt`,
    `mm`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    8,
    8,
    8,
    4,
    '15',
    '39',
    '5',
    '7',
    '4',
    'Pale',
    '2021-10-08 00:00:00',
    '2021-10-08 18:09:46'
  );
INSERT INTO
  `vitalsigns` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `weight`,
    `temp`,
    `respiratory_rate`,
    `heart_rate`,
    `crt`,
    `mm`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    9,
    9,
    9,
    4,
    '15',
    '39',
    '5',
    '7',
    '4',
    'Pale',
    '2021-10-06 00:00:00',
    '2021-10-08 18:31:33'
  );
INSERT INTO
  `vitalsigns` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `weight`,
    `temp`,
    `respiratory_rate`,
    `heart_rate`,
    `crt`,
    `mm`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    10,
    10,
    10,
    3,
    '15',
    '38.9',
    '12',
    '5',
    '12',
    'Pale',
    '2021-11-12 00:00:00',
    '2021-11-12 21:38:12'
  );
INSERT INTO
  `vitalsigns` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `weight`,
    `temp`,
    `respiratory_rate`,
    `heart_rate`,
    `crt`,
    `mm`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    11,
    11,
    11,
    6,
    '15',
    '38.9',
    '12',
    '5',
    '2',
    'Not pale',
    '2021-11-13 00:00:00',
    '2021-11-13 10:34:27'
  );
INSERT INTO
  `vitalsigns` (
    `id`,
    `system_id`,
    `system_pet_id`,
    `system_pet_client_id`,
    `weight`,
    `temp`,
    `respiratory_rate`,
    `heart_rate`,
    `crt`,
    `mm`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    12,
    12,
    11,
    6,
    '15',
    '38.9',
    '5',
    '12',
    '12',
    'Pale',
    '2021-11-13 10:44:00',
    '2021-11-13 10:45:51'
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
